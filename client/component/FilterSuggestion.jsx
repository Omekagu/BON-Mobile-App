import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import axios from 'axios'
import DropDownPicker from 'react-native-dropdown-picker'

const FilterSuggestion = () => {
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedState, setSelectedState] = useState(null)
  const [states, setStates] = useState([])

  // Dropdown states
  const [countryOpen, setCountryOpen] = useState(false)
  const [stateOpen, setStateOpen] = useState(false)

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
      { label: 'Kano', value: 'Kano' }
    ],
    'South Africa': [
      { label: 'Cape Town', value: 'Cape Town' },
      { label: 'Johannesburg', value: 'Johannesburg' }
    ],
    Ghana: [
      { label: 'Cape Town', value: 'Cape Town' },
      { label: 'Johannesburg', value: 'Johannesburg' }
    ],
    Dubai: [
      { label: 'Cape Town', value: 'Cape Town' },
      { label: 'Johannesburg', value: 'Johannesburg' }
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
      alert('Please select a state')
      return
    }

    setLoading(true)
    try {
      console.log('Fetching hotels for:', selectedState)
      const response = await axios.get(
        `http://10.0.1.14:5001/hotel/search?state=${selectedState}`
      )
      console.log('Hotels:', response.data)
      setHotels(response.data.length ? response.data : [])
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Country:</Text>
      <DropDownPicker
        open={countryOpen}
        value={selectedCountry}
        items={countryData}
        setOpen={setCountryOpen}
        setValue={setSelectedCountry}
        style={styles.dropdown}
        placeholder='Select a country'
        dropDownDirection='BOTTOM'
      />

      <Text style={styles.label}>Select State:</Text>
      <DropDownPicker
        open={stateOpen}
        value={selectedState}
        items={states}
        setOpen={setStateOpen}
        setValue={setSelectedState}
        disabled={!selectedCountry}
        style={styles.dropdown}
        placeholder='Select a state'
        dropDownDirection='BOTTOM'
      />

      <TouchableOpacity
        style={styles.searchButton}
        onPress={fetchHotelsByState}
      >
        {loading ? (
          <ActivityIndicator color='#fff' />
        ) : (
          <Text style={styles.buttonText}>Search Hotels</Text>
        )}
      </TouchableOpacity>

      {/* <Text style={styles.label}>Hotel List:</Text> */}
      {loading ? (
        <ActivityIndicator size='large' color='#a63932' />
      ) : (
        <FlatList
          data={hotels}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <View style={styles.hotelBox}>
              <Text style={styles.text}>{item.name}</Text>
            </View>
          )}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333'
  },
  dropdown: {
    marginBottom: 15
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
