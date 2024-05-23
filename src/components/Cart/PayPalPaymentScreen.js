// import React, { useState } from 'react';
// import { View, Button, Alert, StyleSheet } from 'react-native';
// import PayPal from 'react-native-paypal';

// const PayPalPaymentScreen = () => {
//     const [paying, setPaying] = useState(false);

//     const handlePayPalPayment = async () => {
//         setPaying(true);
//         try {
//             const response = await PayPal.pay({
//                 price: '10.00',
//                 currency: 'USD',
//                 description: 'Test payment',
//                 clientId: 'AZWlcEaz8k1fEi6OC7TeuNvVUPRBy1AmD9yrQKQBb4rC4RRdnFvjgiILS9Ylp_xgy_AbUPtfOSFhqs4Z',
//                 environment: PayPal.SANDBOX // hoặc PayPal.PRODUCTION cho môi trường sản xuất
//             });

//             if (response.response.state === 'approved') {
//                 Alert.alert('Payment Successful', `Payment ID: ${response.response.id}`);
//             } else {
//                 Alert.alert('Payment Failed', 'Payment not approved');
//             }
//         } catch (error) {
//             Alert.alert('Payment Error', error.message);
//         } finally {
//             setPaying(false);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <Button
//                 title={paying ? 'Processing...' : 'Pay with PayPal'}
//                 onPress={handlePayPalPayment}
//                 disabled={paying}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
// });

// export default PayPalPaymentScreen;
