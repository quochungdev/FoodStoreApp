import React, { useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Apis, { endpoints } from '../../../Apis';
import hamburger from '../../assets/images/hamburger.png'
import { useNavigation } from '@react-navigation/native';
export default function CategoryList() {
    const [categories, setCategories] = useState(null);
    useEffect(() => {
        const loadCategories = async () => {
            const res = await Apis.get(endpoints['categories']);
            setCategories(res.data)
        }
        loadCategories();
    },[])

    const navigation = useNavigation();
    const navigateToCategoryDetail = (categoryId, categoryName) => {
      navigation.navigate('CategoryDetail',
       { categoryId: categoryId, name: categoryName });
    }

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToCategoryDetail(item.id, item.name)} style={styles.itemContainer}>
      <View style={styles.item}>
        <Image width={30} height={30} source={{uri: item.image}} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
  

  return (
    <View style={styles.container}>
        <Text style={{fontFamily: 'BaeminFont'}} className='text-2xl pt-4 pl-1 mb-3'>Categories</Text>
            <FlatList
            data={categories}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            numColumns={4} 
            />
    </View>
  )
}

const styles = StyleSheet.create({
    item: {
      backgroundColor: 'white',
      alignItems: 'center',
      marginRight: 0,
      borderWidth: 0.3,
      borderColor: 'gray',
      paddingVertical: 15,
    },
    image: {
      borderRadius: 10,
    },
    name: {
      marginTop: 5,
      textAlign: 'center',
    },

    itemContainer: {
      flex: 1,
      margin: 0, 
      maxWidth: '25%', 
  },
  });
