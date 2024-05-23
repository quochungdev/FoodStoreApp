import React, { useContext, useEffect, useState } from 'react'
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Apis, { authApi, endpoints } from '../../../Apis';
import WebView from 'react-native-webview';
import RenderHTML from 'react-native-render-html';
import { useNavigation } from '@react-navigation/native';
import Manuser from '../../assets/images/manUser.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Rating } from 'react-native-ratings';
import MyContext from '../../../MyContext';
import { parseAmount } from '../../../App';
import { format, parseISO } from 'date-fns';
import ChatScreen from '../Chat/ChatScreen';

export default function DishDetail({route}) {
    const navigation = useNavigation();
    const [dishDetail, setDishDetail] = useState({});
    const [headerTitle, setHeaderTitle] = useState(route.params.dishName)
    const [ratings, setRatings] = useState([]); 
    const [rate, setRate] = useState(0);
    const [comments, setComment] = useState(null);
    const [content, setContent] = useState("");
    const [user] = useContext(MyContext)

    const parseDate = (dateString) => {
      const date = parseISO(dateString);
      return format(date, 'yyyy-MM-dd HH:mm:ss');
    };
    

    // const handleRating = (rated) => {
    //     if (rated === rating) {
    //         // Nếu người dùng click vào ngôi sao đã được chọn trước đó, hủy rating
    //         setRating(0);
    //         alert("Rating đã được hủy");
    //     } else {
    //         // Nếu người dùng click vào một ngôi sao khác, cập nhật rating mới
    //         setRating(rated);
    //         alert("Rating thành công: " + rated);
    //     }
    // };

    const createComment = async () => {
      if(user == null){
        alert("Vui lòng đăng nhập")
        return;
      }

      try {
        const accessToken = await AsyncStorage.getItem('token-access');
        const res = await authApi(accessToken).post(endpoints['create_comment'](route.params.dishId), {
          'content': content,
        })
        setComment(current => [res.data, ...current]);
        setContent("")
        alert("Bình luận của bạn đã được gửi!")
      } catch (error) {
        alert(error)
      }
    }

    const createRating = async (rate) => {
      try {
        const accessToken = await AsyncStorage.getItem('token-access');
        const res = await authApi(accessToken).post(endpoints['create_rating'](route.params.dishId), {
          'rate': rate,
        })
        setRatings(current => [res.data, ...current.filter(r => r.user.id !== res.data.user.id)]); 
        alert("Rating của bạn đã được gửi!")
      } catch (error) {
        alert(error)
      }
    }

    useEffect(() => {
      const loadDishes = async () => {
        try {
            let res = route.params.dishId ? await Apis.get(endpoints['dishDetail'](route.params.dishId)) : null
            setDishDetail(res.data)
        } catch (error) {
            console.error(error);
        }
      }

      const loadComments = async ()=>{
            let res = await Apis.get(endpoints['comments'](route.params.dishId));
            setComment(res.data);
        }
      const loadRatings = async ()=>{
          let res = await Apis.get(endpoints['ratings'](route.params.dishId));
          setRatings(res.data);
      }
      loadComments()
      loadDishes()
      loadRatings()
    },[route.params.dishId])

    useEffect(() => {
      navigation.setOptions({
          headerTitle: headerTitle,

      });
  }, [route.params.dishId, navigation])

  useEffect(() => {
      const fetchName = () => {
          setHeaderTitle(headerTitle);
      };
      
      fetchName();
    }, [route.params.dishId]);


    const addToCart = async () => {
      if(user !== null)
      {
        try {
          // Lấy danh sách món ăn đã được lưu trữ trong giỏ hàng (nếu có)
          const cartKey = `cartItems_${user.id}`
          const existingCartItems = await AsyncStorage.getItem(cartKey);
      
          // Chuyển đổi chuỗi JSON thành mảng các món ăn
          const cartItemsArray = existingCartItems ? JSON.parse(existingCartItems) : [];

          const newCartItem = {
            username: user.username,
            dishDetail: dishDetail,
            quantity: 1,
            restaurantDetail: route.params.restaurantDetail,
          };

          // Tìm xem món đã có trong giỏ hàng chưa
          const existingItemIndex = cartItemsArray.findIndex(item => item.dishDetail.id === dishDetail.id);
          if (existingItemIndex !== -1) {
            // Nếu món đã có trong giỏ hàng, cập nhật số lượng
            cartItemsArray[existingItemIndex].quantity += 1;
            // Lưu danh sách món ăn mới vào AsyncStorage
            await AsyncStorage.setItem(cartKey, JSON.stringify(cartItemsArray));
            // Thông báo cho người dùng biết số lượng món đã được cập nhật
            alert('Số lượng món đã được cập nhật trong giỏ hàng!');
          } else {
            // Nếu món chưa có trong giỏ hàng, thêm món mới
            cartItemsArray.push(newCartItem);
            // Lưu danh sách món ăn mới vào AsyncStorage
            await AsyncStorage.setItem(cartKey, JSON.stringify(cartItemsArray));
            // Thông báo cho người dùng biết món ăn đã được thêm vào giỏ hàng thành công
            alert('Món ăn đã được thêm vào giỏ hàng thành công!');
          }
        } catch (error) {
          // Xử lý lỗi nếu có
          console.error('Lỗi khi thêm món ăn vào giỏ hàng:', error);
          alert('Đã xảy ra lỗi. Vui lòng thử lại sau!');
        }
      } else {
        alert("Vui lòng đăng nhập")
      }
    };

    return (
        <View style={styles.container}>
          <ScrollView>
            {/* Phần trên là background */}
            <View style={styles.backgroundContainer}>
                <Image style={{width: 450, height: 450}} source={{ uri: dishDetail.image }} />
                <View style={styles.overlay}></View>
            </View>

            <View style={{margin: 15}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{dishDetail.name}</Text>
                <Text style={{fontSize: 17, fontWeight: 'bold'}}>{parseAmount(dishDetail.price)}</Text>
            </View>
            <View style={{margin: 15}}>
                <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10,}}>Thành phần</Text>
                <RenderHTML contentWidth={100} source={{ html: dishDetail.description || '' }} />
            </View>

            {/* Đường gạch ngang hoặc Text "hoặc" */}
            <View style={styles.dividerContainer}>
                    <View style={styles.dividerLine} />
                    {/* <Text style={styles.dividerText}>Hoặc</Text> */}
                    <View style={styles.dividerLine} />
            </View>

            <View style={{marginTop: 20, marginBottom: 50}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10, marginLeft: 15}}>Bình luận</Text>
              <View className='flex flex-row items-center m-2'>
                <Image style={{width: 40, height: 40}} source={Manuser} />
                <TextInput value={content} onChangeText={t=>setContent(t)}
                  style={{
                    height: 40,
                    borderColor: '#ccc',
                    borderWidth: 1,
                    borderRadius: 5,
                    marginLeft: 10,
                    paddingHorizontal: 10,
                    }}
                    placeholder='Bạn cảm thấy món ăn này thế nào ?'/>
                <TouchableOpacity onPress={createComment} style={{marginHorizontal: 10, backgroundColor: 'black', borderRadius: 10, padding: 10, paddingHorizontal: 15}}>
                  <Text className='text-white'>Gửi</Text>
                </TouchableOpacity>
              </View>
              
             { user &&  <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: 20}}>
              <Rating
                  type='star'
                  ratingCount={5}
                  startingValue={rate}
                  imageSize={25}
                  ratingColor='#22863A'
                  ratingBackgroundColor='#22863A'
                  style={{ paddingVertical: 5 }}
                  onFinishRating={(rate) => createRating(rate)}
              />
             </View>}

              {/* List Comments */}
              {comments == null ? "" : comments.map((item) => {
                const userRating = ratings.find(r => r.user.id === item.user.id);
              return(
                <View key={item.id} style={{backgroundColor: '#F7F7F7', opacity: 50,
                    shadowColor: 'red',
                    shadowOffset: { width: 20, height: 21 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,  
                    elevation: 5,
                    marginLeft: 15,
                    marginRight: 15,
                    marginTop: 20,
                  }}>
                <View className='flex flex-row m-4 ml-5'>
                  <Image style={{width: 40, height: 40}} source={Manuser} />
                  <View className=' w-5/6 ml-3'>
                    <Text style={{fontWeight: 'bold', fontSize: 15}}>{item.user ? `${item.user.first_name} ${item.user.last_name}` : ""}</Text>
                    <Text style={{color: 'gray'}}>{parseDate(item.created_date)}</Text>
                    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems:'flex-start' }}>
                    <Rating
                      type='star'
                      ratingCount={5}
                      startingValue={userRating ? userRating.rate : 0}
                      imageSize={12}
                      ratingColor='#ffff'
                      ratingBackgroundColor='blue'
                      readonly
                    />
                    </View>
                    <Text style={{marginTop: 10}}>
                      {item.content}
                    </Text>
                  </View>
                </View>

              </View>
              )})}
            </View>
          </ScrollView>

         

          <TouchableOpacity onPress={addToCart} style={[styles.buttonContainer, { backgroundColor: 'black'}]}>
              <Text style={styles.buttonText}>Thêm vào giỏ hàng</Text> 
          </TouchableOpacity>
        </View>
      )
    }
    
    
    const styles = StyleSheet.create({
          container: {
            flex: 1,
            backgroundColor: 'white'
          },
          
          backgroundContainer: {
          },
          formContainer: {
            flex: 1,
            backgroundColor: 'white',
            padding: 25,
          },
          overlay: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            alignItems: 'center',           
        },

        buttonContainer: {
          backgroundColor: '#2BC2BC',
          paddingVertical: 15,
          borderRadius: 5,
          alignItems: 'center',
          margin: 10,
        },
        buttonText: {
          color: '#fff',
          fontWeight: 'bold',
        },

        dividerContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
          marginHorizontal: 25,
        },
        dividerLine: {
          flex: 1,
          height: 1,
          backgroundColor: '#ccc',
        },
        dividerText: {
          marginHorizontal: 10,
          color: '#ccc',
        },
       
   });

