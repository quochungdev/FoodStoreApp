import React, { useContext, useState } from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import searchIcon from '../assets/images/search.png'
import CategoryList from '../components/Home/CategoryList'
import CarouselList from '../components/Home/CarouselList'
import Manuser from '../assets/images/manUser.png'
import MyContext from '../../MyContext'
import { useNavigation } from '@react-navigation/native'
import { RadioButton } from 'react-native-paper'
import Apis, { endpoints } from '../../Apis'
import AdBanner from '../components/Home/AdBanner'
import pizza from '../assets/images/pizza.jpg'
import SectionComp from '../components/Home/SectionComp'
import AlertNotification from '../components/Alert/AlertNotification'
import ChatScreen from '../components/Chat/ChatScreen'

export default function HomeScreen() {
  const navigation = useNavigation()
  const [user] = useContext(MyContext);
  const [searchType, setSearchType] = useState('restaurant');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const handleSearch = async () => {
    try {
      let response;
      let modifiedData;

      if (searchType === 'restaurant') {
        searchEndpoint = endpoints['search_restaurants'];
        response = await Apis.get(searchEndpoint, {
          params: {
            restaurant_name: query,
          },
        });
        modifiedData = response.data.map(item => ({ ...item, type: 'restaurant' }));
      } else if (searchType === 'dish') {
        searchEndpoint = endpoints['search_dishes'];
        response = await Apis.get(searchEndpoint, {
          params: {
            dish_name: query,
          },
        });
        modifiedData = response.data.map(item => ({ ...item, type: 'dish' }));
      }

      const searchData = [...modifiedData];
      if (searchData.length === 0) {
        navigation.navigate('SearchScreen', { nodata: true, query: query });
      } else {
        setResults(searchData);
        navigation.navigate('SearchScreen', { results: searchData, query: query });
      }

    } catch (err) {
      console.error('Đã xảy ra lỗi:', err);
    }
  };

    return (
    <ScrollView className="m-3 mt-10" >
        <View className='flex-row justify-between m-3'>
          <View>
            <Text style={{fontFamily: 'BaeminFont'}} className="text-2xl">Welcome Back!</Text>
            <Text style=
            {{color: '#9C9B9E', fontFamily: 'BaeminFont'}} 
            className="text-xl">{user ? user.fullName : <Text>Guest</Text>}</Text>
          </View>
          <Image source={Manuser}/>
        </View>

        {/* Carousel List */}
        <CarouselList />
          <View className='bg-white p-3 flex-row rad rounded-full m-3'>
            <Image source={searchIcon}/>
            <TextInput value={query} onChangeText={setQuery} onSubmitEditing={handleSearch} 
            style={{color: 'black', width: 200, height: 35, marginLeft: 3, fontFamily: 'BaeminFont', fontSize: 14}} placeholder='What would you like to eat?' />  
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20, marginTop: -10 }}>
            <Text style={{fontWeight: 'bold'}}>Tìm kiếm theo: </Text>
              <RadioButton
                color='#2BC2BC'
                value="restaurant"
                status={searchType === 'restaurant' ? 'checked' : 'unchecked'}
                onPress={() => setSearchType('restaurant')}
              />
              <Text style={{ marginRight: 10 }}>Nhà hàng</Text>
              <RadioButton
                value="dish"
                status={searchType === 'dish' ? 'checked' : 'unchecked'}
                onPress={() => setSearchType('dish')}
              />
              <Text>Món ăn</Text>
          </View>
          <CategoryList />

      <SectionComp/>

      <AdBanner />
      <View style={styles.flashSale}>
        <Text style={styles.flashSaleText}>Ưu đãi chớp nhoáng!</Text>
        <Text style={styles.flashSaleTime}>14:37</Text>
      </View>
      <View style={styles.deals}>
        <View style={styles.dealItem}>
          <Image style={styles.dealImage} source={{ uri: 'https://www.tasteofhome.com/wp-content/uploads/2023/09/The-Best-Fast-Food-Fried-Chicken-Ranked_Kristina-Va%CC%88nni-for-Taste-of-Home_Fried-Chicken-Group-Hero-Shot_FT.jpg?fit=700%2C700' }} />
          <Text style={styles.dealText}>The Best Fast Food Fried Chicken</Text>
          <Text style={styles.dealPrice}>Giảm 10.000đ</Text>
        </View>
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  section: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  sectionItem: {
    width: '45%',
    backgroundColor: '#E0E0E0',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  sectionText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  sectionSubText: {
    fontSize: 12,
    color: '#757575',
  },
  adBanner: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#E8F5E9',
  },
  bannerImage: {
    width: '100%',
    height: 150,
  },
  bannerText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  bannerSubText: {
    fontSize: 14,
    color: '#757575',
  },
  flashSale: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#FFF3E0',
    marginTop: 20,
  },
  flashSaleText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  flashSaleTime: {
    fontSize: 14,
    color: '#FF7043',
  },
  deals: {
    padding: 10,
  },
  dealItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  dealImage: {
    width: 100,
    height: 100,
  },
  dealText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  dealPrice: {
    fontSize: 12,
    color: '#757575',
    marginLeft: 10,
  },
})