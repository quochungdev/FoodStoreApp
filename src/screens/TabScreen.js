import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useContext } from 'react';
import { Image, Text } from 'react-native';
import HomeScreen from './HomeScreen';
import MemberStack from '../routes/MemberStack';
import HomeStack from '../routes/HomeStack';
import OrderHistoryStack from '../routes/OrderHistoryStack';
import MyContext from '../../MyContext';
import orderIcon from '../assets/images/order-now.png'
import homeIcon from '../assets/images/homeIcon.png'
import userIcon from '../assets/images/user.png'

const Tab = createBottomTabNavigator();

export default TabScreen = () => {
  const [user] = useContext(MyContext)
  return (
      <Tab.Navigator
        screenOptions={{
        headerStyle: {
          backgroundColor: '#2BC2BC',
        },
        headerTintColor: 'white'
      }}>
        <Tab.Screen name="MÓN CHÍNH"
         options={{ tabBarIcon: () =><Image width={30} height={30} source={homeIcon}/>,
          tabBarLabel: 'Home', 
          headerShown: false} } 
         component={HomeStack}/>

        {user && <Tab.Screen name="Đơn hàng"
         options={{ tabBarIcon: () => <Image source={orderIcon}/>,
          tabBarLabel: 'Đơn hàng', 
          headerShown: false} } 
         component={OrderHistoryStack}/>}
         
        <Tab.Screen name="Member"
        options={{
           tabBarIcon: () => <Image source={userIcon}/>,
           headerShown: false
          }} 
        component={MemberStack}/>
      </Tab.Navigator>
  );
}

