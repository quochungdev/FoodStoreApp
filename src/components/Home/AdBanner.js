import React from 'react'
import Carousel from 'react-native-reanimated-carousel'
import Carousel1 from '../../assets/images/carousel1.jpg'
import Carousel2 from '../../assets/images/carousel2.png'
import Carousel3 from '../../assets/images/carousel3.jpg'
import Carousel4 from '../../assets/images/carousel4.jpg'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'

export default function AdBanner() {


    const imageUrls = [
       { uri:  'https://i.pinimg.com/564x/e0/20/a5/e020a5685f8832e7e95a120fb4f79af6.jpg' },
       { uri:  'https://img.freepik.com/premium-psd/food-menu-restaurant-facebook-cover-template_120329-755.jpg?w=996' },
       { uri:  'https://img.freepik.com/premium-psd/restaurant-banner-template_23-2148466832.jpg?w=1380' },
       { uri:  'https://cdn.dribbble.com/users/9535992/screenshots/16732179/media/b292e3e9f1084999386da464aa1e557b.jpg' },
      ];
        const width = Dimensions.get('window').width

    return (
        <>
        <Text style={{paddingVertical: 10, fontSize: 20, fontFamily: 'BaeminFont'}}>ORDER NOW</Text>
        <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay
        data={imageUrls}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-around', marginBottom: 20}}>
            <Image source={item} style={{ width: width / 1.06, height: width / 2.7, borderRadius: 20 }} />
            <View style={styles.adBanner}>
                <Text style={styles.bannerText}>Thưởng đủ món chay</Text>
                <Text style={styles.bannerSubText}>Ưu đãi lên đến 50.000đ</Text>
            </View>
        </View>
        )}
         />
        </>
  )
}

const styles = StyleSheet.create({
    adBanner: {
        alignItems: 'center',
        backgroundColor: '#E8F5E9',
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
})