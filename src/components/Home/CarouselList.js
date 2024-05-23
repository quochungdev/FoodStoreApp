import React from 'react'
import Carousel from 'react-native-reanimated-carousel'
import Carousel1 from '../../assets/images/carousel1.jpg'
import Carousel2 from '../../assets/images/carousel2.png'
import Carousel3 from '../../assets/images/carousel3.jpg'
import Carousel4 from '../../assets/images/carousel4.jpg'
import { Dimensions, Image } from 'react-native'

export default function CarouselList() {

    const images = [Carousel1,Carousel2,Carousel3,Carousel4]
    const width = Dimensions.get('window').width

    return (
        <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay
        data={images}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
        <Image source={item} style={{ width: width / 1.06, height: width / 2, borderRadius: 10 }} />
        )}
    />
  )
}
