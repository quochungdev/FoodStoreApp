import React, { useContext } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Button } from 'react-native';
import Login from '../components/User/Login';
import UserImage from '../assets/images/user.png'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import { Header, HeaderBackButton } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import MyContext from '../../MyContext';

export default function MemberScreen () {
  const [user, dispatch] = useContext(MyContext)

  const navigation = useNavigation();
  const handleSignInSignOut = () => {
    user ? null : navigation.navigate('Login');
  }

  const logOut = () => {
    dispatch({
        'type': 'logout'
    })
    navigation.navigate("Login")
}

  const handleNavigateRegisterShop = () => {
    navigation.navigate('ShopRegisterScreen')
  }

  return (
      <View>
        <TouchableOpacity onPress={handleSignInSignOut}>
          <View style={styles.topView} className='flex-row p-6'>
            <Image className='bg-slate-100' source={UserImage}/>
            {user ? 
            <Text style={{fontFamily: 'BaeminFont'}} className='ml-3 mr-3 text-xl'>{user.fullName}</Text> : 
            <Text style={{fontFamily: 'BaeminFont'}} className='ml-3 mr-3 text-xl'>Sign In / Sign Up</Text>}
          </View>
        </TouchableOpacity>

        {user && <TouchableOpacity className='bg-white p-3' style={styles.button}>
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>Thông tin tài khoản</Text>
            <Text style={styles.arrow}>▶️</Text>
          </View>
        </TouchableOpacity>}
        {user && <TouchableOpacity onPress={handleNavigateRegisterShop} className='bg-white p-3' style={styles.button}>
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>Trở thành người bán</Text>
            <Text style={styles.arrow}>▶️</Text>
          </View>
        </TouchableOpacity>}
        {<TouchableOpacity className='bg-white p-3' style={styles.button}>
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>Điều khoản dịch vụ</Text>
            <Text style={styles.arrow}>▶️</Text>
          </View>
        </TouchableOpacity>}
        {user && <TouchableOpacity className='bg-white p-3' style={styles.button}>
          <TouchableOpacity onPress={() => logOut()} style={styles.buttonContent}>
            <Text style={styles.buttonText}>Log Out</Text>
            <Text style={styles.arrow}>▶️</Text>
          </TouchableOpacity>
        </TouchableOpacity>}
      </View>
    )
  };
  const styles = StyleSheet.create({
    topView: {
      backgroundColor: '#F0F0F0',
    },
    button: {
      borderColor: '#F9F9F9',
      borderTopWidth: 2,
      borderBottomWidth: 2,
    },
    buttonContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
    },
    buttonText: {
      color: 'black',
      fontSize: 16,
      fontWeight: '600',
    },
    arrow: {
      color: 'white',
      fontSize: 16,
    },
  });
  

  // <Stack.Navigator
  //   screenOptions={{
  //     header: (props) => (
  //       <Header {...props} // Thanh điều hướng
  //         headerTitle={() => <Text style={{ fontSize: 18 }}>Member</Text>} // Chữ ở đầu
  //         headerRight={() => ( // Mũi tên ở cuối
  //           <HeaderBackButton 
  //             {...props} 
  //             onPress={() => props.navigation.goBack()} 
  //           />
  //         )}
  //       />
  //     ),
  //   }}
  // >
  //   <Stack.Screen name="Profile" component={HomeScreen} />
  // </Stack.Navigator>