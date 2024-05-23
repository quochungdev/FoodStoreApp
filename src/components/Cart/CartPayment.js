import React, { useContext, useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import addressIcon from '../../assets/images/location.png'
import shipIcon from '../../assets/images/shipped.png'
import noteIcon from '../../assets/images/pencil.png'
import { RadioButton } from 'react-native-paper'
import { parseAmount } from '../../../App'
import Apis, { authApi, endpoints } from '../../../Apis'
import MyContext from '../../../MyContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import PayPalPayment from './PayPalPayment'

export default function CartPayment({route}) {
    const navigation = useNavigation()
    const [user] = useContext(MyContext)
    const [checked, setChecked] = useState('first');
    const [address, setAddress] = useState('');
    const [note, setNote] = useState('');
    const [paymentTypes, setPaymentTypes] = useState();
    const [shippingOption, setShippingOption] = useState(null);
    const [shippingFee, setShippingFee] = useState(0);
    const cartKey = `cartItems_${user.id}`

    const shippingOptions = [
        { id: 'priority', label: 'Ưu tiên ➤ 10 phút', fee: 43000 },
        { id: 'fast', label: 'Nhanh ➤ 25 phút', fee: 35000 },
        { id: 'economical', label: 'Tiết kiệm ➤ 35 phút', fee: 20000 },
    ];
    let subtotal = 0;
    const calculateSubtotal = () => {
        route.params.cartJson.forEach(item => {
          subtotal += item.quantity * item.dishDetail.price;
        });
        return parseAmount(subtotal.toString());
    }

    const createOrder = async () => {
        if (checked === null) {
            alert('Vui lòng chọn "Phương thức thanh toán"');
            return;
        }
        if (shippingFee === 0) {
            alert('Vui lòng chọn "Tùy chọn giao"');
            return;
        }
        const restaurantId = route.params.cartJson[0].restaurantDetail.id;
        try {
            const accessToken = await AsyncStorage.getItem('token-access');
            const res = await authApi(accessToken).post(endpoints['create_order'], {
                "address": address,
                "shipping_fee": shippingFee,
                "note": note,
                "user_id": user.id,
                "restaurant_id": restaurantId,
                "total_amount": subtotal + shippingFee,
                "paymentType_id": checked,
            });
            if (res.status === 200) {
                await createOrderDetail(res.data.id);
                await AsyncStorage.removeItem(cartKey);
                navigation.navigate('CartPaymentSuccess')
            } else {
                alert('Failed to place order', res.data.message);
            }

          } catch (error) {
            alert(error)
          }
    }

    const createOrderDetail = async (orderId) => {
        const accessToken = await AsyncStorage.getItem('token-access');
        const dishIds = route.params.cartJson.map(item => item.dishDetail.id);
        const quantities = route.params.cartJson.map(item => item.quantity);
        const restaurantId = route.params.cartJson[0].restaurantDetail.id;
        
        try {
            const response = await authApi(accessToken).post(endpoints['create_orderdetail'](orderId), {
                "order_id": orderId,
                "dish_id": dishIds,
                "quantity": quantities,
                "restaurant_id": restaurantId,
                "total": subtotal,
                "user_id": user.id,
            });
            console.log(response.status);
            console.log(response.data);

            if (response.status !== 200) {
                alert('Failed to create order detail', response.data.message);
            }
        } catch (error) {
            alert('Error', error.message);
        }
    };

    const handleShippingOptionPress = (option) => {
        setShippingOption(option.id);
        setShippingFee(option.fee);
    };

    useEffect(() => {
        const loadPaymentTypes = async () => {
            try {
                let res = await Apis.get(endpoints['paymentTypes'])
                setPaymentTypes(res.data)
            } catch (error) {
                console.error(error);
            }
        }
        loadPaymentTypes()
    }, []);

    function _createOrder(data, actions) {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: "1",
              },
            },
          ],
        });
      }
      async function _onApprove(data, actions) {
        let order = await actions.order.capture();
        console.log(order);
        window.ReactNativeWebView &&
          window.ReactNativeWebView.postMessage(JSON.stringify(order));
        return order;
      }
      function _onError(err) {
        console.log(err);
        let errObj = {
          err: err,
          status: "FAILED",
        };
        window.ReactNativeWebView &&
          window.ReactNativeWebView.postMessage(JSON.stringify(errObj));
      }
    
  return (
    <View className='flex flex-col' style={{backgroundColor: 'white', flex: 1}}>
     <ScrollView>
        {/* Địa chỉ */}
        <View className='flex flex-row p-3' style={{backgroundColor: 'white', borderBottomWidth: 0.3, borderColor: 'gray'}} >
            <Image 
            style={{width: 30, height: 30}} 
            source={addressIcon} />
            <View className='ml-3'>
                <Text>Địa chỉ</Text>
                <TextInput 
                placeholder='Thêm địa chỉ nhận hàng của bạn'
                value={address}
                onChangeText={setAddress}
                />
            </View>
        </View>

        {/* Tùy chọn giao */}
        <View className='flex flex-row p-3' style={{backgroundColor: 'white', borderBottomWidth: 0.3, borderColor: 'gray'}} >
            <Image 
            style={{width: 30, height: 30}} 
            source={shipIcon} />
            <View className='ml-3  w-96'>
                <Text style={{fontWeight: 'bold', fontSize: 17, marginBottom: 10}}>Tùy chọn giao</Text>
                {shippingOptions.map(option => (
                    <TouchableOpacity
                        key={option.id}
                        className='flex flex-row justify-between'
                        style={[
                            styles.shippingOption,
                            shippingOption === option.id && styles.shippingOptionSelected
                        ]}
                        onPress={() => handleShippingOptionPress(option)}
                    >
                        <View className='flex flex-row'>
                            <Text className='font-bold'>{option.label} </Text>
                        </View>
                        <Text>{parseAmount(option.fee.toString())}đ</Text>
                    </TouchableOpacity>
                ))}

            </View>
        </View>

        {/* Tóm tắt đơn hàng */}
        <View style={{backgroundColor: 'white', borderBottomWidth: 0.3, borderColor: 'gray'}}>
            <Text style={{fontWeight: 'bold', fontSize: 17, padding: 10}}>Tóm tắt đơn hàng</Text>
             {route.params.cartJson.map((item, index) => {
                return(
                    <View key={index} className='flex flex-row justify-between p-3'  style={{marginBottom: 5}}>
                        <View>
                            <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.dishDetail.name}</Text>
                            <Text>{item.quantity} phần</Text>
                        </View>
                        <View>
                            <Text>{parseAmount(item.dishDetail.price)}</Text>
                        </View>
                    </View>
                )
             })}           
        </View>

        <View className='flex flex-row justify-between p-3' style={{backgroundColor: 'white', borderBottomWidth: 0.3, borderColor: 'gray'}}>
            <Text>Tổng tạm tính: </Text>
            <Text>{calculateSubtotal()}đ</Text>
        </View>

        {/* Note */}
        <View className='flex flex-row p-3' style={{backgroundColor: 'white', borderBottomWidth: 0.3, borderColor: 'gray'}} >
            <Image 
            style={{width: 30, height: 30}} 
            source={noteIcon} />
            <View className='ml-3'>
                <Text>Ghi chú</Text>
                <TextInput 
                placeholder='Thêm ghi chú cho đơn hàng của bạn'
                value={note}
                onChangeText={setNote}
                />
            </View>
        </View>

        {/* Phương thức thanh toán */}
        <View style={{backgroundColor: 'white', borderBottomWidth: 0.3, borderColor: 'gray'}}>
            <Text style={{fontWeight: 'bold', fontSize: 17, padding: 10}}>Phương thức thanh toán</Text>
            <View className='p-3'>
                {paymentTypes && paymentTypes.map((item) => {
                    return (
                    <View key={item.id} className="flex flex-row items-center">
                    <RadioButton
                            color='#2BC2BC'
                            value={item.id}
                            status={checked === item.id ? 'checked' : 'unchecked'}
                            onPress={() => setChecked(item.id)}
                            />
                    <Text>{item.name_paymentType}</Text>
                </View>
                )})}
            <PayPalPayment />
            </View>
        </View>
     </ScrollView>
        <View style={{backgroundColor: 'white', borderTopWidth: 0.3, borderColor: 'gray'}}>
            <View className='flex flex-row justify-between p-3' style={{backgroundColor: 'white'}}>
                <Text style={{fontWeight: 'bold', fontSize: 16}}>Thành tiền: </Text>
                <Text style={{fontWeight: 'bold', fontSize: 16}}>{parseAmount((subtotal + shippingFee).toString())}đ</Text>
            </View>
            <TouchableOpacity onPress={createOrder} style={[styles.buttonContainer]}>
                <Text style={styles.buttonText}>Đặt đơn</Text> 
            </TouchableOpacity>
        </View>
    </View>
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