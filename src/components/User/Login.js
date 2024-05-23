import React, { useContext, useState } from 'react'
import styles from './Styles'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import BackGroundMember from '../../assets/images/background_member.jpg'
import { useNavigation } from '@react-navigation/native';
import Apis, { authApi, endpoints } from '../../../Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyContext from '../../../MyContext';

export default function Login() {
  const navigation = useNavigation();
  const [user, dispatch] = useContext(MyContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
      if(username == '' || password == '' ){
        alert("Vui lòng nhập đầy đủ thông tin")
        return
      }
      try {
        let res = await Apis.post(endpoints['login'], {
          'client_id': 'q5WbDE2JeZNIqWH4Hn246vnb9FzXI1ntE6BrSMah',
          'client_secret': 'z6nXm91juotRwAxBTN7z4sjM3O2rWhxgEf41QxM4XhfDpVYxfvk5M0fkus9Uea8Mt74AdPrd6hoFKJSMJDIaeyxPetPp4zt7i5BL92bbdjoCqVbbmn2iJmhGxj6G8sdK',
          'username': username,
          'password': password,
          'grant_type': 'password'
      })
        console.info(res.data)
        await AsyncStorage.setItem('token-access', res.data.access_token)
        let user = await authApi(res.data.access_token).get(endpoints['current_user']);
        console.info("User data",user.data)
        dispatch({
                    'type': 'login',
                    'payload': {
                      'id': user.data.id,
                      'username': user.data.username,
                      'avatar': user.data.avatar,
                      'firstName': user.data.first_name,
                      'lastName': user.data.last_name,
                      'fullName': user.data.first_name + " " + user.data.last_name,
                      'email': user.data.email,
                      'role': user.data.role_id
                    }
                })
        navigation.navigate("MemberScreen");
      } catch (error) {
        setError('Đã xảy ra lỗi khi kết nối đến máy chủ');
        alert("Tài khoản hoặc mật khẩu không đúng")
      }
  }

  const handleSignUp = () => {
    navigation.navigate('Register');
  }
  return (
    <View style={styles.container}>
        {/* Phần trên là background */}
        <View style={styles.backgroundContainer}>
          <Image source={BackGroundMember}/>
        </View>
        
        <View style={styles.formContainer}>
          {/* Các trường thông tin đăng nhập */}
          <TextInput alue={username} onChangeText={t=>setUsername(t)} style={styles.input} placeholder="Username" />
          <TextInput secureTextEntry={true} value={password} onChangeText={t=>setPassword(t)} style={styles.input} placeholder="Password" />
          
          {/* Nút đăng nhập */}
          <TouchableOpacity onPress={() => handleLogin()} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Đăng nhập</Text>
          </TouchableOpacity>
          
          {/* Đường gạch ngang hoặc Text "hoặc" */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Hoặc</Text>
            <View style={styles.dividerLine} />
          </View>
          
          {/* Nút đăng ký */}
          <TouchableOpacity onPress={() => handleSignUp()} style={[styles.buttonContainer, { backgroundColor: 'black' }]}>
            <Text style={styles.buttonText}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>
  )
}
