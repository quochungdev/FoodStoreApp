import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

export default function ShopRegisterInformation() {
  return (
    <View>
        <View style={styles.formContainer}>
        {/* Các trường thông tin đăng ký */}
       <TextInput
          style={styles.input}
          placeholder="Tên shop"
        />
        <TextInput
          style={styles.input}
          placeholder="Địa chỉ lấy hàng"
        />
        <TextInput
          style={styles.input}
          placeholder="Mô tả về shop"
        />

        {/* Chọn ảnh đại diện */}
        <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Chọn ảnh đại diện</Text>
        </TouchableOpacity>
        
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <View style={styles.dividerLine} />
        </View>

        {/* Nút đăng ký */}
        <TouchableOpacity style={[styles.buttonContainer, { backgroundColor: 'black' }]}>
            <Text style={styles.buttonText}>Đăng ký</Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
      formContainer: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: '#fff', 
        padding: 25,
        marginLeft: 5,
        marginRight: 5,
      },
      input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
      },
      buttonContainer: {
        backgroundColor: '#2BC2BC',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
      },
      buttonText: {
        color: '#fff',
        fontWeight: 'bold',
      },
      dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
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
