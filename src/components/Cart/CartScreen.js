import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MyContext from '../../../MyContext';
import cartEmpty from '../../assets/images/cart_empty.png'

export default function CartScreen() {
  const navigation = useNavigation()
  const [cartItems, setCartItems] = useState([]);
  const [user] = useContext(MyContext)
  useEffect(() => {
    if (user && user.id) {
    const cartKey = `cartItems_${user.id}`
    const fetchCartItems = async () => {
      try {
        const storedCartItems = await AsyncStorage.getItem(cartKey);

        // Chuyển đổi chuỗi JSON thành mảng các món ăn
        const parsedCartItems = storedCartItems ? JSON.parse(storedCartItems) : [];

        setCartItems(parsedCartItems);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu giỏ hàng:', error);
      }
    };

    fetchCartItems();
}}, []);

  const restaurantItems = {};

  // Tính tổng số lượng món ăn từng cửa hàng
  cartItems.forEach(item => {
    const restaurantId = item.restaurantDetail.id;
    if (!restaurantItems[restaurantId]) {
      restaurantItems[restaurantId] = {
        restaurant: item.restaurantDetail,
        countDish: 0,
        username: item.username
      };
    }
    if (item.dishDetail) {
      restaurantItems[restaurantId].countDish++;
    }
  });


  const removeItem = async (itemToRemove) => {

    const updatedCartItems = cartItems.filter(item => 
      item.restaurantDetail.id !== itemToRemove
    );
    setCartItems(updatedCartItems);
    const cartKey = `cartItems_${user.id}`;
    try {
      await AsyncStorage.setItem(cartKey, JSON.stringify(updatedCartItems));
    } catch (error) {
      console.error('Lỗi khi cập nhật giỏ hàng:', error);
    }
  };
  

  const handlePress = (restaurantId) => {
    const filteredItems = cartItems.filter(item => item.restaurantDetail.id === restaurantId);
    console.log('Các món ăn của cửa hàng được chọn:', filteredItems);  
    navigation.navigate('CartPayment', {
      cartJson: filteredItems
    })
  };


  return (
    <View>
      {/* Hiển thị dữ liệu giỏ hàng */}
      {user && Object.keys(restaurantItems).length > 0  ? Object.values(restaurantItems).map((restaurantItem, index) => {
          if(restaurantItem.username == user.username) {
            return (
        <View key={index}>
          <TouchableOpacity 
                      style={{backgroundColor: '#F7F7F7', 
                      padding: 10,
                      opacity: 50,
                      shadowColor: 'red',
                      shadowOffset: { width: 20, height: 21 },
                      shadowOpacity: 0.8,
                      shadowRadius: 2,  
                      elevation: 5,
                      marginLeft: 0,
                      marginRight: 0,
                      marginTop: 0,
                      marginBottom: 0,
          }}
          className="flex flex-row justify-between m-4" key={index} onPress={() => handlePress(restaurantItem.restaurant.id)}>
            <View>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>{restaurantItem.restaurant.name}</Text>
              <Text>{restaurantItem.countDish} món</Text>
            </View>

            <View>
              <Image style={{width: 100, height: 50}} source={{uri: restaurantItem.restaurant.image}}/>
              <TouchableOpacity style={styles.removeButton} onPress={() => removeItem(restaurantItem.restaurant.id)}>
                    <Text style={styles.removeItem}>X</Text>
              </TouchableOpacity>
            </View>       
          </TouchableOpacity>
          </View>
          )} 
          else{
            return(
              <View style={styles.container}>
                <Image source={cartEmpty} style={styles.checkmark} />
                <Text style={styles.successText}>Giỏ hàng của bạn đang trống</Text>
                <Text className='-mt-2' style={styles.successText}>Quay lại trang chủ nhé !</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate('Home')}
                >
                  <Text style={styles.buttonText}>Về trang chủ</Text>
                </TouchableOpacity>
              </View>
            )
          }
      }) : (
        <View style={styles.container}>
          <Image source={cartEmpty} style={styles.checkmark} />
          <Text style={styles.successText}>Giỏ hàng của bạn đang trống</Text>
          <Text className='-mt-2' style={styles.successText}>Quay lại trang chủ nhé !</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.buttonText}>Về trang chủ</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  successText: {
    fontSize: 17,
    textAlign: 'center',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#2BC2BC',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',

    fontSize: 17,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    margin: 4,
  },
  restaurantImage: {
    width: 100,
    height: 50,
    position: 'relative', // Để sử dụng position: 'absolute' cho nút xóa
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    margin: 4,
  },
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Độ mờ
    borderRadius: 15, // Bo tròn
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeItem: {
    color: 'black',
    fontWeight: 'bold',
  }

})

  // const removeItemFromAsyncStorage = async (key) => {
  //   try {
  //     await AsyncStorage.removeItem(key);
  //     console.log(`Đã xóa mục ${key} thành công từ AsyncStorage.`);
  //   } catch (error) {
  //     console.error('Lỗi khi xóa mục từ AsyncStorage:', error);
  //   }
  // };
  
  // removeItemFromAsyncStorage('cartItems'); // Ví dụ xóa mục 'cartItems'