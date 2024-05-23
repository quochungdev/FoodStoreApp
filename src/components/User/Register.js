import React, { useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Apis, { endpoints } from '../../../Apis';
import styles from './Styles';
import BackGroundMember from '../../assets/images/background_member.jpg';
import * as ImagePicker from 'expo-image-picker';
import { append } from "domutils";

export default function Register() {

  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState();

  const handleRegister = async () => {
    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('username', username);
    formData.append('password', password);
    formData.append('email', email);
    formData.append('role_id', 1);
    if (avatar) {
      const fileUri = avatar.uri;
      const fileName = fileUri.split('/').pop(); // Get the filename from the uri
      const fileType = fileUri.split('.').pop(); // Get the file type from the uri
      formData.append('avatar', {
        uri: fileUri,
        name: fileName,
        type: `image/${fileType}`
      });
    }
    setLoading(true);

    try {
      let res = await Apis.post(endpoints['register'], formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.info(res.data);
      navigation.navigate("MemberScreen");
    } catch (error) {
      alert("Vui lòng nhập đầy đủ thông tin")
      setLoading(false);
    }
  };


  const picker = async () => {
    const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if(status!=="granted"){
        alert("Permission denied!");
    }else{
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

        if(!res.canceled){
            setAvatar(res.assets[0])
        }
    }
}

  return (
    <ScrollView style={styles.container}>
      {/* Phần trên là background */}
      <View style={styles.backgroundContainer}>
        <Image source={BackGroundMember} />
      </View>

      <View style={styles.formContainer}>
        {/* Các trường thông tin đăng ký */}
       <TextInput
          style={styles.input}
          placeholder="Tài khoản"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Họ"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Tên"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />

        {/* Chọn ảnh đại diện */}
        <TouchableOpacity style={[styles.buttonContainer, { backgroundColor: 'black' }]} onPress={picker}>
            <Text style={styles.buttonText}>Chọn avatar....</Text>
        </TouchableOpacity>
        {avatar && <Image className='m-2' width={200} height={200} source={{ uri: avatar.uri }} />}

        {/* Đường gạch ngang hoặc Text "hoặc" */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Hoặc</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Nút đăng ký */}
        {loading===true?<ActivityIndicator/>:<>
        <TouchableOpacity style={styles.buttonContainer} onPress={handleRegister}>
          <Text style={styles.buttonText}>Đăng ký</Text>
        </TouchableOpacity>
         </>}

      </View>
    </ScrollView>
  );
}
