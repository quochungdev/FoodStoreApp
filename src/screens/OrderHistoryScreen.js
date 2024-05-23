import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { authApi, endpoints } from '../../Apis'
import MyContext from '../../MyContext'
import { format, parseISO } from 'date-fns'
import cartEmpty from '../assets/images/cart_empty.png'

export default function OrderHistoryScreen() {
    const navigation = useNavigation()
    const [user] = useContext(MyContext)
    const [orders, setOrders] = useState([]);
    const parseDate = (dateString) => {
      const date = parseISO(dateString);
      return format(date, 'yyyy-MM-dd HH:mm:ss');
    };

    const fetchOrders = async () => {
      try {
          const accessToken = await AsyncStorage.getItem('token-access');
          const res = await authApi(accessToken).get(endpoints['get_order_by_userId'](user.id));
          setOrders(res.data);
          console.log(res.data);
      } catch (error) {
          console.error('Error fetching orders:', error);
      }
  };

    useEffect(() => {
        fetchOrders();
    }, []);

    useFocusEffect(
      React.useCallback(() => {
        fetchOrders();
      }, [user.id])
    );

    const handleOrderDetailScreen = (item) => {
      navigation.navigate("OrderDetailHistory", {
        address: item.address,
        shipping_fee: item.shipping_fee,
        paymentType: item.paymentType,
        note: item.note,
        order_details: item.order_details,
      })
    }

  return (
    <ScrollView className='mt-7'>
        <Text style={{margin: 15, fontSize: 20, fontWeight: 'bold'}}>Đơn hàng của tôi</Text>
        {orders.length > 0 ? orders.map(o => (
          <TouchableOpacity key={o.id} onPress={() => handleOrderDetailScreen(o)} className='p-3' style={styles.button}>
            <TouchableOpacity style={styles.buttonContent}>
              <Text style={styles.buttonText}>Order ID: {o.id}</Text>
              <Text style={styles.buttonText}>Order Date: {parseDate(o.order_date)}</Text>
              <Text style={styles.buttonText}>Trạng thái: Thành công</Text>
            </TouchableOpacity>
         </TouchableOpacity>
        )): (
          <View style={styles.container}>
            <Image source={cartEmpty} style={styles.checkmark} />
            <Text style={styles.successText}>Lịch sử đơn hàng của bạn đang trống</Text>
            <Text className='-mt-2' style={styles.successText}>Hãy đặt hàng ngay để tận hưởng ưu đãi !</Text>
          </View>
        )}
    </ScrollView>
  )
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
    color: 'gray'
  },
    button: {
        borderColor: 'black',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        backgroundColor: '#2BC2BC',
        marginBottom: 7,
      },
      buttonContent: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 5,
      },
      buttonText: {
        fontSize: 14,
      },
      arrow: {
        color: 'black',
        fontSize: 16,
      },
})
