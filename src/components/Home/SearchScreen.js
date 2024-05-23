import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import Apis, { endpoints } from '../../../Apis';
import { useNavigation } from '@react-navigation/native';
import cartEmpty from '../../assets/images/sad.png'

const SearchScreen = ({route}) => {
  const data = route.params;
  const navigation = useNavigation()

  const handleNavigateToRestaurantDetail = (item) => {
    navigation.navigate('RestaurantDetail',
    { 
        restaurantDetail: item
    });
  }
  
  return (
    <View style={styles.container}>
      <View className='flex flex-row'>
        <Text style={{fontWeight: 'bold', fontSize: 20, marginVertical: 13}}>Kết quả tìm kiếm:  </Text>
        <Text style={{fontWeight: 'bold', fontSize: 20, color: '#2BC2BC', marginVertical: 13}}>{data.query}</Text>
      </View>
      {data.results ? data.results.map((item) => (
        <TouchableOpacity key={item.id} onPress={() => handleNavigateToRestaurantDetail(item)} >
            <View style={styles.shopContainer}>
                <Image source={{ uri: item.image }} style={styles.restaurantImage} />
                <View>
                    <Text style={styles.shopName}>{item.name} - {item.address}</Text>
                    <Text style= {{color: '#9C9B9E', fontWeight: 'bold', marginTop: 5}} >{item.category?.name}</Text>
                    <Text style= {{color: '#9C9B9E', fontWeight: 'bold', marginTop: 9}} >1.1km</Text>
                </View>
            </View>
            <View style={styles.separator} />
        </TouchableOpacity>
      )) : (
        <View style={styles.Emptycontainer}>
            <Image source={cartEmpty} style={styles.checkmark} />
            <Text style={styles.successText}>Chúng tôi không tìm thấy từ khóa phù hợp</Text>
            <Text className='-mt-2' style={styles.successText}>Vui lòng nhập đúng tên nhà hàng bạn muốn nhé</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 16,
  },
  separator: {
    borderBottomColor: '#9C9B9E',
    borderBottomWidth: 0.5,
    marginVertical: 10, // Khoảng cách giữa các phần tử
  },
  shopContainer: {
      flexDirection: 'row',
      padding: 10,
  },
  restaurantImage: {
      width: 90,
      height: 90,
      borderRadius: 10,
      marginRight: 10,
  },
  shopName: {
      fontSize: 15,
      fontWeight: 'bold',
      flexWrap: 'wrap',
      width: 300,
  },
  error: {
    color: 'red',
    marginVertical: 8,
  },

  Emptycontainer: {
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
    fontSize: 17,
    textAlign: 'center',
    marginBottom: 15,
    color: 'gray'
  },
});

export default SearchScreen;