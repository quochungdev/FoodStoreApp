import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import checkIcon from '../../assets/images/checked.png'

export default function CartPaymentSuccess() {
    const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Image source={checkIcon} style={styles.checkmark} />
      <Text style={styles.successText}>Đơn hàng đã được xử lý thành công!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Về trang chủ</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    checkmark: {
      width: 100,
      height: 100,
      marginBottom: 20,
    },
    successText: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
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
      fontSize: 17,
    },
  });