import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useReducer } from 'react';
import TabScreen from './src/screens/TabScreen'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useFonts } from 'expo-font';
import MyUserReducer from './MyUserReducer';
import MyContext from './MyContext';
import CartButton from './src/components/Cart/CartButton';

const Drawer = createDrawerNavigator();

export function parseAmount(text) {
  if(text){
    // Xóa ký tự ',' trong chuỗi số nếu có
    text = text.replace(',', '');
 
    // Chuyển đổi thành số float
    let amount = parseFloat(text);
  
    // Định dạng lại số với 2 số thập phân
    let formattedAmount = amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  
    // Tách phần nguyên và phần thập phân
    let [integerPart, decimalPart] = formattedAmount.split('.');
  
    // Xử lý phần nguyên
    if (integerPart.length > 3) {
      // Nếu phần nguyên dài hơn 3 chữ số, thêm dấu chấm phân cách
      formattedAmount = amount.toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&.');
    }
  
    return formattedAmount;
  }
 }

export default function App() {
  
  const [user, dispatch] = useReducer(MyUserReducer, null);
  const [fontsLoaded, fontError] = useFonts({
    'BaeminFont': require('./src/assets/fonts/BMDANIEL-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  
  return (
    <MyContext.Provider value={[user, dispatch]}>
      <NavigationContainer onLayout={onLayoutRootView}>
        <TabScreen />
        <CartButton />
      </NavigationContainer>
    </MyContext.Provider>
  );
}
