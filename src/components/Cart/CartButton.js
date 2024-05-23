import React, { useContext } from 'react';
import { TouchableOpacity, Image, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CartImage from '../../assets/images/shopping-bag.png'
import MyContext from '../../../MyContext';

export default function CartButton() {
  const navigation = useNavigation();
  const [user] = useContext(MyContext)
  
  const goToCartScreen = () => {
    navigation.navigate('CartScreen');
  };

  return (
    <>
    {user && <View style={styles.container}>
      <TouchableOpacity onPress={goToCartScreen} style={styles.button}>
        <Image
          source={CartImage}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 60,
    right: 18,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 9,
    opacity: 0.7,
    shadowColor: 'red',
    shadowOffset: { width: 20, height: 21 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5,
  },
  icon: {
    width: 25,
    height: 25,
    opacity: 0.8,
  },
});
