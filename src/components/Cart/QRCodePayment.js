import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import axios from 'axios';

const QRCodePayment = () => {
    const [qrData, setQrData] = useState('');

    useEffect(() => {
        const fetchQrData = async () => {
            try {
                // Giả định gọi API để lấy dữ liệu QR
                const userId = 3;  // Thay thế bằng ID người dùng hoặc thông tin liên quan
                const response = await axios.post('https://api.example.com/vietqr', {
                    user_id: userId,
                    amount: 100000,  // Số tiền thanh toán
                    description: 'Thanh toán đơn hàng'
                });
                setQrData(response.data.qr_code);  // Giả định API trả về dữ liệu mã QR
            } catch (error) {
                console.error('Error fetching QR data:', error);
            }
        };

        fetchQrData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Thanh toán bằng VietQR</Text>
            {qrData ? (
                <QRCode
                    value={qrData}
                    size={200}
                />
            ) : (
                <Text>Loading...</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
    },
});

export default QRCodePayment;
