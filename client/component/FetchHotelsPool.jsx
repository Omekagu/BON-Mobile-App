import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import SuggestionBox from './SuggestionBox'
import * as Animatable from 'react-native-animatable'
import { useRouter } from 'expo-router'

const FilterSuggestion = () => {
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedPool, setSelectedPool] = useState(null)
  const [poolOpen, setPoolOpen] = useState(false)

  const router = useRouter()

  const poolItems = [
    { label: 'BON Hotel Ikeja Lagos', value: 'IkejaResSQL' },
    { label: 'BON Hotel Nest Garki, Abuja', value: 'NestGarkiSQL' },
    { label: 'BON Hotel Kano', value: 'KanoSQL' },
    { label: 'BON Hotel Transtell', value: 'TranstellSQL' },
    { label: 'BON Hotel Hyatti', value: 'HyattiSQL' },
    { label: 'BON Hotel Platinum', value: 'PlatinumSQL' },
    { label: 'BON Hotel Royal Parklane', value: 'RoyalParkLaneSQL' },
    { label: 'BON Hotel Imperial', value: 'ImperialSQL' },
    { label: 'BON Hotel Smithcity', value: 'SmithCitySQL' },
    { label: 'BON Hotel Elvis', value: 'ElvisSQL' },
    { label: 'BON Hotel Asokoro', value: 'AsokoroSQL' },
    { label: 'BON Hotel Asaba', value: 'AsabaSQL' },
    { label: 'BON Hotel Nest Ibadan', value: 'NestIBSQL' }
  ]

  const fetchHotelsByPool = async () => {
    if (!selectedPool) {
      Alert.alert('Missing Selection', 'Please select a pool to search.')
      return
    }

    setLoading(true)
    try {
      console.log(`Fetching hotels from pool: ${selectedPool}`)
      const response = await fetch(
        `http:///10.0.1.13:5001/hotel/search/pool/${encodeURIComponent(
          selectedPool
        )}`
      )

      if (!response.ok) throw new Error('Failed to fetch hotels')

      const data = await response.json()
      setHotels(data.length ? data : [])
    } catch (error) {
      console.error('Error fetching hotels:', error)
      Alert.alert('Error', 'Failed to fetch hotels. Please try again.')
    }
    setLoading(false)
  }

  const transformedHotels = hotels.map(hotel => {
    // Regex to extract the URLs from the src attributes in the info field
    const imageUrls = [
      ...(hotel.info.match(/src="(https:\/\/[^"]+)"/g) || [])
    ].map(img => img.match(/src="(https:\/\/[^"]+)"/)[1]) // Extract the actual URL

    return {
      _id: hotel.id.toString(), // Ensure ID is a string for keyExtractor
      name: hotel.name,
      img: hotel.img,
      images: imageUrls, // Using the extracted image URLs
      available: hotel.avail, // Placeholder for stars (replace with actual rating if available)
      reviews: hotel.units, // Placeholder for reviews count (replace if available)
      pricePerNight: hotel.params ? JSON.parse(hotel.params).custprice : 'N/A',
      location: hotel.alias || 'N/A' // Assuming alias can be treated as location
    }
  })

  ;<View style={{ paddingBottom: 300 }}>
    <FlatList
      data={transformedHotels}
      keyExtractor={item => item._id}
      renderItem={({ item }) => (
        <Animatable.View animation='fadeInUp' duration={800}>
          <SuggestionBox
            onPress={() => {
              router.push({
                pathname: '/SearchPageInfo',
                params: { id: item._id, pool: selectedPool }
              })
            }}
            image={
              item.images[0] || 'https://i.postimg.cc/5ttJxCXK/YTW-DELUXE-6.jpg'
            }
            name={item.name}
            stars={item.rating}
            reviews={item.reviews}
            price={
              item.pricePerNight
                ? Number(item.pricePerNight).toLocaleString()
                : '100,000,000'
            }
            location={item.location || 'N/A'}
          />
        </Animatable.View>
      )}
    />
  </View>

  return (
    <View style={styles.container}>
      <View style={{ zIndex: 2000, marginBottom: poolOpen ? 180 : 10 }}>
        <Text style={styles.label}>Select Hotel:</Text>
        <DropDownPicker
          open={poolOpen}
          value={selectedPool}
          items={poolItems}
          setOpen={setPoolOpen}
          setValue={setSelectedPool}
          setItems={() => {}}
          style={styles.dropdown}
          placeholder='Select a Hotel'
          dropDownDirection='BOTTOM'
          listMode='SCROLLVIEW'
          dropDownContainerStyle={styles.dropdownContainer}
        />
      </View>

      <TouchableOpacity
        style={styles.searchButton}
        onPress={fetchHotelsByPool}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color='#fff' />
        ) : (
          <Text style={styles.buttonText}>Search Hotels</Text>
        )}
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size='large' color='#a63932' />
      ) : (
        <View style={{ paddingBottom: 250 }}>
          <FlatList
            data={transformedHotels}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
              <Animatable.View animation='fadeInUp' duration={800}>
                <SuggestionBox
                  onPress={() => {
                    router.push({
                      pathname: '/SearchedPoolDetailsPage',
                      params: { id: item._id, pool: selectedPool }
                    })
                  }}
                  image={
                    item.images[0] ||
                    'https://i.postimg.cc/5ttJxCXK/YTW-DELUXE-6.jpg'
                  }
                  name={item.name}
                  available={item.available}
                  reviews={item.reviews}
                  price={
                    item.pricePerNight
                      ? Number(item.pricePerNight).toLocaleString()
                      : '100,000,000'
                  }
                  location={item.location || 'N/A'}
                />
              </Animatable.View>
            )}
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#a63932'
  },
  dropdown: {
    marginBottom: 15,
    borderColor: '#a63932'
  },
  searchButton: {
    backgroundColor: '#a63932',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  hotelBox: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5
  },
  text: {
    color: 'black'
  }
})

export default FilterSuggestion
