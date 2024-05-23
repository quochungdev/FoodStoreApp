import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AlertNotification from '../Alert/AlertNotification'

export default function SectionComp() {
  return (
    <View style={styles.section}>
        <TouchableOpacity style={[styles.sectionItem, {backgroundColor: '#FFD3CD'}]}>
          <Text style={styles.sectionText}>Gần tôi</Text>
          <Text style={styles.sectionSubText}>Giao đến ngay</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.sectionItem, {backgroundColor: '#B9E6E0'}]}>
          <Text style={styles.sectionText}>Bữa xế OĐ</Text>
          <Text style={styles.sectionSubText}>Săn deal ngay!</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.sectionItem, {backgroundColor: '#DAFCDF'}]}>
          <Text style={styles.sectionText}>Phòng nóng chữa nóng</Text>
          <Text style={styles.sectionSubText}>Giảm đến 50%</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.sectionItem, {backgroundColor: '#FFE4CD'}]}>
          <Text style={styles.sectionText}>BaeNgonRẻ</Text>
          <Text style={styles.sectionSubText}>Bao tiết kiệm</Text>
        </TouchableOpacity>
      </View>
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
})