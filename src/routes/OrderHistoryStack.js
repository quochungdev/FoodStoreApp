import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import HomeScreen from '../screens/HomeScreen';
import MemberScreen from '../screens/MemberScreen';
import Login from '../components/User/Login';
import Register from '../components/User/Register';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import OrderDetailHistory from '../components/OrderHistory/OrderDetailHistory';


const Stack = createStackNavigator();

export default function OrderHistoryStack() {
  return (
    <Stack.Navigator
    >
        <Stack.Screen 
        name='OrderHistoryScreen' 
        component={OrderHistoryScreen}
        options={{
          headerMode: 'screen',
          headerShown: false,
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#2BC2BC' }
          }}/>
        <Stack.Screen 
        name='OrderDetailHistory' 
        component={OrderDetailHistory}
        options={{
          headerTitle: 'Chi tiết đơn hàng',
          headerShown: true,
          headerStyle: { backgroundColor: '#2BC2BC' }

        }}/>
    </Stack.Navigator>
  )
}
