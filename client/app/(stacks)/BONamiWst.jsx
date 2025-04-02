import React from 'react'
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView
} from 'react-native'

const BONamiWst = () => {
  return (
    <View>
      <ImageBackground
        source={{ uri: 'https://i.postimg.cc/TPy6rR3C/Building1271.jpg' }}
        style={styles.background}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay}>
          <Text style={styles.text}>BONami West Africa</Text>
        </View>
      </ImageBackground>
      <ScrollView style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.description}>
            For only 20,000 NGN, you get the following benefits, 10% off the
            best available rate of the day at participating BON Hotels in
            Africa, 10% Discount on food for up to 2 persons, Hotel Rooms
            Upgrade – subject to availability, Early arrivals and late
            check-outs – subject to availability.
          </Text>

          <Text style={styles.price}>
            Annual Cost <Text style={styles.priceHighlight}>₦20,000 (NGN)</Text>
          </Text>

          <Text style={styles.sectionTitle}>West African Customers</Text>
        </View>

        {/* Dining Discounts Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Dining Discounts</Text>
          <Image
            source={{ uri: 'https://i.postimg.cc/TPy6rR3C/Building1271.jpg' }}
            style={styles.image}
          />
        </View>

        {/* Discounted Rates Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Discounted Rates and More</Text>
          <Image
            source={{ uri: 'https://i.postimg.cc/TPy6rR3C/Building1271.jpg' }}
            style={styles.image}
          />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    top: 0
  },
  background: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageStyle: {
    // borderRadius: 10
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  textContainer: {
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 15
  },
  description: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '500'
  },
  price: {
    fontSize: 12,
    fontWeight: '500',
    marginVertical: 10
  },
  priceHighlight: {
    fontSize: 15,
    fontWeight: '700',
    color: 'green'
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10
  },
  section: {
    marginHorizontal: 10,
    marginBottom: 20
  },
  sectionHeader: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '800',
    textDecorationLine: 'underline',
    marginBottom: 5
  },
  image: {
    width: '100%',
    height: 250
  }
})

export default BONamiWst
