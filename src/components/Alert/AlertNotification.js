import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, Alert} from 'react-native'
import { Ionicons } from '@expo/vector-icons';

const AlertNotification = () =>{

useEffect(() => {
    Alert.alert('Your alert msg here!')
},[])

 return (
  <View style={{
    backgroundColor: '#f1f1f1',justifyContent: 'center', alignItems: 'center',}}>
    <Ionicons color="black" name="tv" size={100}/>
    <Text>Hello World </Text>
</View>

);}
export default AlertNotification;