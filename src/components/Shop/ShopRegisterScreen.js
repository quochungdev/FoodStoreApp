import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import cartEmpty from '../../assets/images/store.png'
import { useNavigation } from '@react-navigation/native'

export default function ShopRegisterScreen() {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Image source={cartEmpty} style={styles.checkmark} />
      <Text style={styles.successText}>Chào mừng đến với trang dành cho người bán</Text>
      <Text className='-mt-2' style={{textAlign: 'center', fontSize: 15, color: 'gray'}}>Để đăng ký bán hàng trên BaeHung,</Text>
      <Text className='-mt-2' style={{textAlign: 'center', fontSize: 15, color: 'gray', marginTop: 3, marginBottom: 5}}>bạn cần cung cấp một số thông tin cơ bản</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ShopRegisterInformation')}
      >
        <Text style={styles.buttonText}>Tiếp tục</Text>
      </TouchableOpacity>
    </View>
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
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: 'bold'
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
})
