import React, { useContext, useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import addressIcon from '../../assets/images/location.png'
import shipIcon from '../../assets/images/shipped.png'
import noteIcon from '../../assets/images/pencil.png'
import { RadioButton } from 'react-native-paper'
import { parseAmount } from '../../../App'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { authApi, endpoints } from '../../../Apis'
import MyContext from '../../../MyContext'
export default function OrderDetailHistory({route}) {

  const [user] = useContext(MyContext)
  const [namePaymentType, setNamePaymentType] = useState('');

  const order = route.params

  useEffect(() => {
    if (order.paymentType.length > 0 && order.paymentType[0].name_paymentType) {
      setNamePaymentType(order.paymentType[0].name_paymentType);
    }
  }, [order]);

  let subtotal = 0;
  const calculateSubtotal = () => {
    order.order_details.forEach(item => {
      subtotal += item.quantity * item.dish_info.price;
    });
    return parseAmount(subtotal.toString());
}
  return (
  <ScrollView>
        {/* Địa chỉ */}
        <View className='flex flex-row p-3' style={{backgroundColor: 'white', borderBottomWidth: 0.3, borderColor: 'gray'}} >
            <Image 
            style={{width: 30, height: 30}} 
            source={addressIcon} />
            <View className='ml-3'>
                <Text>Địa chỉ</Text>
                <Text className='text-gray-400'>{order.address}</Text>
            </View>
        </View>

        {/* Tùy chọn giao */}
        <View className='flex flex-row p-3' style={{backgroundColor: 'white', borderBottomWidth: 0.3, borderColor: 'gray'}} >
            <Image 
            style={{width: 30, height: 30}} 
            source={shipIcon} />
            <View className='ml-3  w-96'>
                <Text style={{fontWeight: 'bold', fontSize: 17, marginBottom: 10}}>Phí giao hàng</Text>
                <Text>Thành tiền: {parseAmount(order.shipping_fee.toString())}đ</Text>
            </View>
        </View>

        {/* Tóm tắt đơn hàng */}
        <View style={{backgroundColor: 'white', borderBottomWidth: 0.3, borderColor: 'gray'}}>
            <Text style={{fontWeight: 'bold', fontSize: 17, padding: 10}}>Tóm tắt đơn hàng</Text>
            {order.order_details.map(item => (
                <View key={item.id} className='flex flex-row justify-between p-3'  style={{marginBottom: 5}}>
                    <View>
                        <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.dish_info.name}</Text>
                        <Text>{item.quantity} phần</Text>
                    </View>
                    <View>
                        <Text>{parseAmount(item.dish_info.price.toString())}đ</Text>
                    </View>
                </View>   
            ))}      
        </View>

        <View className='flex flex-row justify-between p-3' style={{backgroundColor: 'white', borderBottomWidth: 0.3, borderColor: 'gray'}}>
            <Text>Tổng tạm tính: </Text>
            <Text>{calculateSubtotal()}đ</Text>
        </View>
        <View className='flex flex-row justify-between p-3' style={{backgroundColor: 'white', borderBottomWidth: 0.3, borderColor: 'gray'}}>
            <Text className='font-bold'>Thành tiền: </Text>
            <Text className='font-bold'>{parseAmount((subtotal + order.shipping_fee).toString())}đ</Text>
        </View>

        {/* Note */}
        <View className='flex flex-row p-3' style={{backgroundColor: 'white', borderBottomWidth: 0.3, borderColor: 'gray'}} >
            <Image 
            style={{width: 30, height: 30}} 
            source={noteIcon} />
            <View className='ml-3'>
                <Text>Ghi chú</Text>
                <Text className='text-gray-400'>{order.note}</Text>
            </View>
        </View>

        {/* Phương thức thanh toán */}
        <View style={{backgroundColor: 'white', borderBottomWidth: 0.3, borderColor: 'gray'}}>
            <Text style={{fontWeight: 'bold', fontSize: 17, padding: 10}}>Phương thức thanh toán</Text>
            <View className='p-3 -mt-3'>
              <Text>{namePaymentType}</Text>
            </View>
        </View>
     </ScrollView>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
      backgroundColor: '#2BC2BC',
      paddingVertical: 10,
      borderRadius: 5,
      alignItems: 'center',
      margin: 10,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 17,
    },
    shippingOption: {
      borderRadius: 5,
      borderWidth: 1,
      padding: 10,
      borderColor: 'gray',
      marginVertical: 5,
  },
  shippingOptionSelected: {
      borderColor: '#2BC2BC',
      borderWidth: 4,
  },
})