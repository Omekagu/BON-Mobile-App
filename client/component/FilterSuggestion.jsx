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
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedState, setSelectedState] = useState(null)
  const [states, setStates] = useState([])

  const router = useRouter()

  // Dropdown states
  const [countryOpen, setCountryOpen] = useState(false)
  const [stateOpen, setStateOpen] = useState(false)
  const [setCountryItems] = useState([])
  const [setStateItems] = useState([])

  const countryData = [
    { label: 'Nigeria', value: 'Nigeria' },
    { label: 'South Africa', value: 'South Africa' },
    { label: 'Ghana', value: 'Ghana' },
    { label: 'Dubai', value: 'Dubai' }
  ]

  const stateData = {
    Nigeria: [
      { label: 'Lagos', value: 'Lagos' },
      { label: 'Abuja', value: 'Abuja' },
      { label: 'Kano', value: 'Kano' },
      { label: 'Port Harcourt', value: 'Port Harcourt' }
    ],
    'South Africa': [
      { label: 'Cape Town', value: 'Cape Town' },
      { label: 'Johannesburg', value: 'Johannesburg' },
      { label: 'Western Cape', value: 'Western Cape' }
    ],
    Ghana: [
      { label: 'Greater Accra', value: 'Greater Accra' },
      { label: 'Ashanti', value: 'Ashanti' },
      { label: 'Tamale', value: 'Tamale' }
    ],
    Dubai: [
      { label: 'Dubai', value: 'Dubai' },
      { label: 'Abu Dhabi', value: 'Abu Dhabi' },
      { label: 'Sharjah', value: 'Sharjah' }
    ]
  }

  useEffect(() => {
    if (selectedCountry) {
      setStates(stateData[selectedCountry] || [])
      setSelectedState(null)
    }
  }, [selectedCountry])

  const fetchHotelsByState = async () => {
    if (!selectedState) {
      Alert.alert(
        'Missing Selection',
        'Please select a state before searching.'
      )
      return
    }

    setLoading(true)
    try {
      console.log('Fetching hotels for:', selectedState)
      const response = await fetch(
        `http://10.0.1.13:5001/hotel/search/state/${encodeURIComponent(
          selectedState
        )}`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch hotels')
      }

      const data = await response.json()
      setHotels(data.length ? data : [])
      //   console.log(data)
    } catch (error) {
      console.error('Error fetching hotels:', error)
      Alert.alert('Error', 'Failed to fetch hotels. Please try again.')
    }
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <View style={{ zIndex: 3000, marginBottom: countryOpen ? 180 : 1 }}>
        <Text style={styles.label}>Select Country:</Text>
        <DropDownPicker
          open={countryOpen}
          value={selectedCountry}
          items={countryData}
          setOpen={setCountryOpen}
          setValue={setSelectedCountry}
          setItems={setCountryItems}
          style={styles.dropdown}
          placeholder='Select a country'
          dropDownDirection='BOTTOM'
          listMode='SCROLLVIEW'
          dropDownContainerStyle={styles.dropdownContainer}
        />
      </View>

      <View style={{ zIndex: 2000, marginBottom: stateOpen ? 180 : 1 }}>
        <Text style={styles.label}>Select State:</Text>
        <DropDownPicker
          open={stateOpen}
          value={selectedState}
          items={states}
          setOpen={setStateOpen}
          setValue={setSelectedState}
          setItems={setStateItems}
          disabled={!selectedCountry}
          style={styles.dropdown}
          placeholder='Select a state'
          dropDownDirection='BOTTOM'
          listMode='SCROLLVIEW'
          dropDownContainerStyle={styles.dropdownContainer}
        />
      </View>
      <TouchableOpacity
        style={styles.searchButton}
        onPress={fetchHotelsByState}
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
        <View style={{ paddingBottom: 300 }}>
          <FlatList
            data={hotels}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
              <Animatable.View animation='fadeInUp' duration={800}>
                <SuggestionBox
                  onPress={() => {
                    router.push({
                      pathname: '/SearchPageInfo',
                      params: { id: item._id }
                    })
                  }}
                  image={
                    item.images[0] ||
                    'https://i.postimg.cc/5ttJxCXK/YTW-DELUXE-6.jpg'
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
