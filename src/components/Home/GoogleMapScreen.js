import React, { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { GOOGLE_MAP_API_KEY } from '../../../Apis';

export default function GoogleMapScreen({route}) {
    // const [markersList, setMarkersList] = useState([
    //     {
    //         id: 1,
    //         latitude: 10.709338779295614,
    //         longitude: 106.70538265732336,
    //         title: 'Cửa hàng ăn vặt',
    //         longitudeDelta: 'Cửa hàng ăn vặt', 
    //     },
    //     {
    //         id: 2,
    //         latitude: 10.709200575129717,
    //         longitude: 106.70570931113815,
    //         title: 'Nhà hàng phương Nam',
    //         longitudeDelta: 'Nhà hàng phương Nam', 
    //     },
    //     {
    //         id: 3,
    //         latitude: 10.709106911475953,
    //         longitude: 106.70504946721482,
    //         title: 'Quán hủ tiếu Phong Ký',
    //         longitudeDelta: 'Cửa hàng ăn vặt', 
    //     },
    // ])
    console.log(route.params.restaurantDetail);

    const [markers, setMarkers] = useState(route.params.restaurantDetail ? route.params.restaurantDetail : null)

    const MyCustomMarkerView = () => {
        return(
            <Image style={{width: 50, height: 20}} source={{uri: markers.image}} />
        )
    }
    
    const MyCustomCalloutView = (item) => {
        return(
            <View style={{alignItems: 'center', justifyContent: 'center'}} key={item.id}>
                <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
                <Text style={{color: 'gray', fontSize: 12}}>{item.address}</Text>
            </View>
        )
    }

    return (
    <View style={styles.container}>
        <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
            latitude: 10.709338779295614,
            longitude: 106.70538265732336,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
        }}
        >
        {markers ?
         <>
            <Marker coordinate={{
            latitude: 10.709433396757344,
            longitude: 106.70259969115776
            }}>
                <MyCustomMarkerView />
                <Callout style={{width: 250, height: 55}}>
                    <MyCustomCalloutView {...markers} />
                </Callout>
            </Marker>
            {/* <Marker
              key={markers.id}
              coordinate={{latitude: 10.709338779295614, longitude: 106.70538265732336}}
              title={markers.name}
              description={markers.description}
            /> */}
        </>
        : null}
        </MapView>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
   });