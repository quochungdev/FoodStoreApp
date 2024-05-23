import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react'
import HomeScreen from '../screens/HomeScreen';
import CategoryDetail from '../components/Home/CategoryDetail';
import RestaurantDetail from '../components/Home/RestaurantDetail';
import DishDetail from '../components/Home/DishDetail';
import GoogleMapScreen from '../components/Home/GoogleMapScreen';
import CartScreen from '../components/Cart/CartScreen';
import CartPayment from '../components/Cart/CartPayment';
import CartPaymentSuccess from '../components/Cart/CartPaymentSuccess';
import SearchScreen from '../components/Home/SearchScreen';
import ChatScreen from '../components/Chat/ChatScreen';
import CartButton from '../components/Cart/CartButton';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function HomeStack() {
  const [showCartButton, setShowCartButton] = useState(true);

  return (
  <>
    <Stack.Navigator
    >
        <Stack.Screen 
        name='Home' 
        component={HomeScreen}
        options={{
          headerShown: false,
        }}/>
        <Stack.Screen 
        name='CategoryDetail' 
        component={CategoryDetail}
        options={{
          headerMode: 'screen',
          headerShown: true,
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#2BC2BC' }
          }}/>
        <Stack.Screen 
        name='RestaurantDetail' 
        component={RestaurantDetail}
        options={{
          headerMode: 'screen',
          headerShown: true,
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#2BC2BC' }
          }}/>
        <Stack.Screen 
        name='DishDetail' 
        component={DishDetail}
        options={{
          headerMode: 'screen',
          headerShown: true,
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#2BC2BC' }
          }}/>
          <Stack.Screen 
          name='GoogleMapScreen' 
          component={GoogleMapScreen}
          options={{
          headerMode: 'screen',
          headerShown: true,
          headerTintColor: 'white',
          headerTitle: 'Google Map',
          headerStyle: { backgroundColor: '#2BC2BC' }
          }}/>
           <Stack.Screen 
          name='CartScreen' 
          component={CartScreen}
          options={{
            headerMode: 'screen',
            headerShown: true,
            headerTitle: 'Giỏ hàng',
            headerTintColor: 'white',
            headerStyle: { backgroundColor: '#2BC2BC' }
          }}/>

          <Stack.Screen 
          name='CartPayment' 
          component={CartPayment}
          options={{
            headerMode: 'screen',
            headerShown: true,
            headerTitle: 'Thanh toán',
            headerTintColor: 'white',
            headerStyle: { backgroundColor: '#2BC2BC' }
          }}/>
          <Stack.Screen 
          name='CartPaymentSuccess' 
          component={CartPaymentSuccess}
          options={{
            headerMode: 'screen',
            headerShown: false,
            headerTitle: 'Thanh toán',
            headerTintColor: 'white',
            headerStyle: { backgroundColor: '#2BC2BC' }
          }}/>
          <Stack.Screen 
          name='SearchScreen' 
          component={SearchScreen}
          options={{
            headerMode: 'screen',
            headerShown: true,
            headerTitle: 'Tìm kiếm',
            headerTintColor: 'white',
            headerStyle: { backgroundColor: '#2BC2BC' }
          }}/>
          <Stack.Screen 
          name='ChatScreen' 
          component={ChatScreen}
          options={{
            headerMode: 'screen',
            headerShown: true,
            headerTitle: 'Chat Screen',
            headerTintColor: 'white',
            headerStyle: { backgroundColor: '#2BC2BC' }
          }}/>
    </Stack.Navigator>
  </>
  )
}
