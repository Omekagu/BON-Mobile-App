import React from 'react'
import { ImageBackground, Text, View, StyleSheet } from 'react-native'

const BONamiSouth = () => {
  return (
    <View>
      <ImageBackground
        source={{
          uri: 'https://bonhotels.com/wp-content/uploads/BON_Hotel_Bloemfontein_Central_Exterior-1-scaled.jpg'
        }}
        style={styles.background}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay}>
          <Text style={styles.text}>BONami South Africa</Text>
        </View>
      </ImageBackground>

      <View
        style={{
          alignItems: 'center',
          marginVertical: 10,
          marginHorizontal: 5
        }}
      >
        <Text style={{ textAlign: 'center', fontSize: 17, fontWeight: '500' }}>
          {' '}
          For only R690, you get over R16 000 worth of benefits. These are just
          some of the amazing benefits available to BONami members.
        </Text>
        <Text style={{ fontSize: 12, fontWeight: '500', marginVertical: 10 }}>
          Annual Cost{' '}
          <Text style={{ fontSize: 15, fontWeight: '700', color: 'green' }}>
            R690(ZAR)
          </Text>{' '}
        </Text>
        <Text>South African Customers</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageStyle: {},
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adds a slight dark overlay
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  }
})

export default BONamiSouth
