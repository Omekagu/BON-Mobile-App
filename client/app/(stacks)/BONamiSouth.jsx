import React from 'react'
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView
} from 'react-native'
import CustomBotton from '../../component/CustomBotton'

const BONamiSouth = () => {
  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://bonhotels.com/wp-content/uploads/2022/09/loyalty-header.jpg'
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
          For only R690, you get over R16000 worth of benefits. These are just
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

      {/* Your Free Night Vouchers Section */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Your Free Night Vouchers</Text>
        <Image
          source={{
            uri: 'https://bonhotels.com/wp-content/uploads/BOnami-Website-.jpg'
          }}
          style={styles.image}
        />
        {/* <Text style={styles.subText}>
          You now have access to the best accommodation rates on offer anywhere!
        </Text> */}
        <Text style={styles.list}>
          • Experience us on the house. Your welcome pack includes complimentary
          vouchers to the value of R16000.
        </Text>
        <Text style={styles.list}>
          • 1x Complimentary night’s accommodation for any participating BON
          Hotel in Southern Africa.
        </Text>
        <Text style={styles.list}>
          • 2x Complimentary Full English Breakfast for two at any participating
          BON Hotel in Southern Africa.
        </Text>
        <Text style={styles.list}>
          • 1x Complimentary night’s accommodation at any participating BON
          hotel in West Africa.
        </Text>
        <Text style={styles.list}>
          • 4x Pay One Night, Get The Next Night Free voucher for any of our
          participating BON Hotels in Africa.
        </Text>
      </View>
      {/* Dining Discounts Section */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Dining Discounts</Text>
        <Image
          source={{
            uri: 'https://bonhotels.com/wp-content/uploads/2022/09/loyalty-image3.jpg'
          }}
          style={styles.image}
        />
        <Text style={styles.subText}>
          Whether you are a guest at the hotel or are just enjoying a night out,
          BONami members are entitled to a discount on the food portion of the
          bill at breakfast, lunch and dinner at any participating BON Hotel in
          Africa.
        </Text>
        <Text style={styles.subText}>
          Your discount entitlement is as follows:
        </Text>

        <Text style={styles.list}>• 1 x Diner = 25% discount.</Text>
        <Text style={styles.list}>• 2 x Diners = 50% discount.</Text>
        <Text style={styles.list}>• 3 x Diners = 33% discount.</Text>
        <Text style={styles.list}>• 4 – 12 Diners = 25% discount.</Text>
      </View>
      {/* Discounted Rates and More Section */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Discounted Rates and More</Text>
        <Image
          source={{
            uri: 'https://bonhotels.com/wp-content/uploads/2022/09/loyalty-image3.jpg'
          }}
          style={styles.image}
        />
        <Text style={styles.subText}>
          You now have access to the best accommodation rates on offer anywhere!
        </Text>
        <Text style={styles.list}>
          • 20% Off the best available rate of the day at participating BON
          Hotel’s in Africa.
        </Text>
        <Text style={styles.list}>
          • 5% Off any advertised accommodation specials on bonhotels.com.
        </Text>
        <Text style={styles.list}>
          • Free Room Upgrade – subject to availability.
        </Text>
        <Text style={styles.list}>
          • Early Arrival / Late Checkout perks – subject to availability.
        </Text>
        <Text style={styles.list}>• Free Wi-Fi.</Text>
        <Text style={styles.list}>• Free Parking.</Text>
      </View>
      <View style={styles.botton}>
        <CustomBotton button={'Sign Up'} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1 // Ensures proper layout
  },
  botton: {
    marginBottom: 30,
    marginHorizontal: 10
  },
  background: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center'
  },
  subText: {
    marginVertical: 10,
    fontSize: 14,
    fontWeight: 500
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for text visibility
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
    fontSize: 14,
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
    fontSize: 14,
    fontWeight: '800',
    textDecorationLine: 'underline',
    marginBottom: 5
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10
  },
  list: {
    fontSize: 14,
    fontWeight: '500',
    marginVertical: 2,
    paddingHorizontal: 10
  }
})

export default BONamiSouth
