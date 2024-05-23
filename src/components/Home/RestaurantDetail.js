import React, { useContext, useEffect, useState } from 'react'
import { Button, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Apis, { endpoints } from '../../../Apis';
import { useNavigation } from '@react-navigation/native';
import Verifed from '../../assets/images/verified.png'
import MyContext from '../../../MyContext';

export default function RestaurantDetail({route}) {
    const [user] = useContext(MyContext)
    const navigation = useNavigation()
    const [headerTitle, setHeaderTitle] = useState(route.params.restaurantDetail.name)
    const [dishes, setDishes] = useState([]);

    function parseAmount(text) {
      // Xóa ký tự ',' trong chuỗi số nếu có
      text = text.replace(',', '');
    
      // Chuyển đổi thành số float
      let amount = parseFloat(text);
    
      // Định dạng lại số với 2 số thập phân
      let formattedAmount = amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    
      // Tách phần nguyên và phần thập phân
      let [integerPart, decimalPart] = formattedAmount.split('.');
    
      // Xử lý phần nguyên
      if (integerPart.length > 3) {
        // Nếu phần nguyên dài hơn 3 chữ số, thêm dấu chấm phân cách
        formattedAmount = amount.toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&.');
      }
    
      return formattedAmount;
    }

    useEffect(() => {
      const loadDishes = async () => {
        try {
            let res = route.params.restaurantDetail.id ? await Apis.get(endpoints['dish'](route.params.restaurantDetail.id)) : null
            setDishes(res.data)
        } catch (error) {
            console.error(error);
        }
      }
      loadDishes()
    },[route.params.restaurantDetail.id])

    useEffect(() => {
        navigation.setOptions({
            headerTitle: headerTitle,

        });
    }, [route.params.restaurantDetail.id, navigation])

    useEffect(() => {
        const fetchName = () => {
            setHeaderTitle(headerTitle);
        };
        
        fetchName();
      }, [route.params.restaurantDetail.id]);

    const handleNavigateToDishDetail = (id, name) => {
      navigation.navigate("DishDetail", {
        dishId: id,
        dishName: name,
        restaurantDetail: route.params.restaurantDetail
      });

    }

    const handleGoogleMapScreen = (item) => {
      navigation.navigate("GoogleMapScreen",{
        restaurantDetail: item
      })
    }
    
  return (
    <ScrollView style={styles.container}>
        {/* Phần trên là background */}
        <View style={styles.backgroundContainer}>
            <Image style={{width: 450, height: 450}} source={{ uri: route.params.restaurantDetail.image }} />
            <View style={styles.overlay}>
            </View>
        </View>

        <View style={styles.formContainer}>
          <View style={{backgroundColor: '#F7F7F7', opacity: 50,
            shadowColor: 'red',
            shadowOffset: { width: 20, height: 21 },
            shadowOpacity: 0.8,
            shadowRadius: 2,  
            elevation: 5,
            padding: 10,
          }}>
            <View className='flex flex-row justify-between items-center'>
              <View className='flex flex-row items-center justify-center'>
                <Text className='text-xl font-bold'>{route.params.restaurantDetail.name}</Text>
                <Image style={{width: 20, height: 20, marginLeft: 3, marginTop: 3}} source={Verifed}/>
              </View>
              <Image style={{borderRadius: 10}} width={80} height={60} source={{uri: route.params.restaurantDetail.image}}/>
            </View>

            <View className='flex flex-row items-center mt-5'>
              <View style={{backgroundColor: '#E41220', width: 150, padding: 5, marginTop: 5, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 13}} className='text-white font-bold text-current'>🍚BaeminFood Partner</Text>
              </View>
              <Text style={{color: 'gray', fontSize: 13}} className='ml-3'>Nóng Hổi Xì Xụp, Ngon Chuẩn Việt</Text>
            </View>
          </View>

          <View className='flex flex-row'>
            <TouchableOpacity className='w-2/4 mt-2 mr-1' onPress={() => handleGoogleMapScreen(route.params.restaurantDetail)} >
                  <View style={{backgroundColor: 'black',  width: 200, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>Theo dõi ngay</Text>
                  </View>
            </TouchableOpacity>
            {user && <TouchableOpacity className='w-2/4 mt-2 mr-1' onPress={() => navigation.navigate("ChatScreen")} >
                <View style={{backgroundColor: '#2BC2BC',  width: 200, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>Chat</Text>
                </View>
            </TouchableOpacity>}
          </View>

            <View className='flex flex-row  mt-10 mb-5'>
              <Text className='text-2xl font-bold'>Dành cho bạn</Text>  
              <TouchableOpacity onPress={() => handleGoogleMapScreen(route.params.restaurantDetail)} >
                <View style={{backgroundColor: '#2BC2BC', marginLeft: 15, width: 170, height: 35, borderRadius: 30, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize: 18, fontFamily: 'BaeminFont', color: 'white'}}>Google Map</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View>
            
            </View>
            <ScrollView contentContainerStyle={styles.dishContainer}>
              {dishes.map((item) => (
                <TouchableOpacity key={item.id} onPress={() => handleNavigateToDishDetail(item.id, item.name)}>
                  <View style={styles.itemContainer}>
                    <Image source={{uri: item.image}} style={styles.image} />
                    <Text style={styles.text}>{item.name}</Text>
                    <Text className='font-bold' style={styles.text}>{parseAmount(item.price)}</Text>
                    <TouchableOpacity style={styles.addButton}>
                      <Text style={styles.plus}>+</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>      
    </View>
  </ScrollView>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2BC2BC',
        position: 'relative',
        margin: 0
      },
      backgroundContainer: {
        flex: 1,
      },
      formContainer: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        padding: 27,
        marginLeft: -10,
      },
      input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
      },      

      overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        alignItems: 'center',
        
    },
    restaurantName: {
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold',
    },
    restaurantNameBackground: {
        backgroundColor: 'white',
        borderRadius: 10, // Độ cong của viền
        padding: 20,
        shadowColor: 'red',
        shadowOffset: { width: 20, height: 21 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,

        position: 'absolute',
        top: 30,
    },

    //Dish
    dishContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    itemContainer: {
      width: '100%',
      padding: 5,
    },
    image: {
      width: 180,
      height: 180,
      borderRadius: 10,
      position: 'relative'

    },
    text: {
      marginTop: 5,
      textAlign: 'left',
      fontSize: 15,
      width: 180,
    },
    
    addButton: {
      backgroundColor: '#1db3ac',
      borderRadius: 15,
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      right: 18,
      top: 150,
    },
    plus: {
      color: 'white',
      fontSize: 20,
    },
    });