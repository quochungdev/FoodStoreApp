import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import HomeScreen from '../screens/HomeScreen';
import MemberScreen from '../screens/MemberScreen';
import Login from '../components/User/Login';
import Register from '../components/User/Register';
import ShopRegisterScreen from '../components/Shop/ShopRegisterScreen';
import ShopRegisterInformation from '../components/Shop/ShopRegisterInformation';


const Stack = createStackNavigator();

export default function MemberStack() {
  return (
    <Stack.Navigator
    >
        <Stack.Screen 
        name='MemberScreen' 
        component={MemberScreen}
        options={{
          headerMode: 'screen',
          headerShown: true,
          headerTintColor: 'white',
          headerTitle: 'Member',
          headerStyle: { backgroundColor: '#2BC2BC' }
          }}/>
        <Stack.Screen 
        name='Login' 
        component={Login}
        options={{
          headerTitle: 'Đăng nhập',
          headerShown: true,
        }}/>
        <Stack.Screen 
        name='Register' 
        component={Register}
        options={{
          headerTitle: 'Đăng ký',
        }}/>
         <Stack.Screen 
        name='ShopRegisterScreen' 
        component={ShopRegisterScreen}
        options={{
          headerShown: true,
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#2BC2BC' },
          headerTitle: 'Đăng kí trở thành người bán',
        }}/>
        <Stack.Screen 
        name='ShopRegisterInformation' 
        component={ShopRegisterInformation}
        options={{
          headerShown: true,
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#2BC2BC' },
          headerTitle: 'Đăng kí trở thành người bán',
        }}/>
    </Stack.Navigator>
  )
}
