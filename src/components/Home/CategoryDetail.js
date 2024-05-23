import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Apis, { endpoints } from '../../../Apis';
import RestaurantDetail from './RestaurantDetail';
import { createStackNavigator } from '@react-navigation/stack';

export default function CategoryDetail( {route} ) {
    const navigation = useNavigation()
    const [headerTitle, setHeaderTitle] = useState(route.params.name)
    const [restaurants, setRestaurants] = useState({});

    const handleNavigateToRestaurantDetail = (item) => {
        navigation.navigate('RestaurantDetail',
        { 
            restaurantDetail: item
        });
    }


    useEffect(() => {
      const loadRestaurants = async () => {
        try {
            let res = route.params.categoryId ? await Apis.get(endpoints['restaurantDetail'](route.params.categoryId)) : null
            setRestaurants(res.data)
        } catch (error) {
            console.error(error);
        }
      }
      loadRestaurants()
    },[])

    useEffect(() => {
        const fetchCategoryName = () => {
            setHeaderTitle(headerTitle);
        };
        
        fetchCategoryName();
      }, [route.params.categoryId]);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: headerTitle,

        });
    }, [route.params.categoryId, navigation])


     const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleNavigateToRestaurantDetail(item)}>
            <View style={styles.shopContainer}>
                <Image source={{ uri: item.image }} style={styles.restaurantImage} />
                <View>
                    <Text style={styles.shopName}>{item.name} - {item.address}</Text>
                    <Text style= {{color: '#9C9B9E', fontWeight: 'bold', marginTop: 5}} >{route.params.name}</Text>
                    <Text style= {{color: '#9C9B9E', fontWeight: 'bold', marginTop: 9}} >1.1km</Text>
                </View>
            </View>
            <View style={styles.separator} />
        </TouchableOpacity>
  );

    
  return (
    <View style={styles.container}>
           <Text style={{fontFamily: 'BaeminFont'}} className='text-2xl pt-4 pl-1'>RESTAURANT</Text>
            <FlatList
                data={restaurants}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                horizontal={false}
            />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 10,
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
});