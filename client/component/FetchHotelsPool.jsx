import React, { useState } from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import SuggestionBox from './SuggestionBox'
import * as Animatable from 'react-native-animatable'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

// Simple custom skeleton component for React Native
const SkeletonBox = ({ height = 120, width = '100%', style = {} }) => (
  <View
    style={[
      {
        backgroundColor: '#e6e6e6',
        height,
        width,
        borderRadius: 12,
        marginBottom: 16,
        overflow: 'hidden'
      },
      style
    ]}
  >
    <Animatable.View
      animation='pulse'
      iterationCount='infinite'
      duration={900}
      style={{
        flex: 1,
        backgroundColor: '#ece9f7',
        opacity: 0.7
      }}
    />
  </View>
)

const { width } = Dimensions.get('window')

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
      alert('Please select a hotel to search.')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(
        `http:/10.0.1.27:5001/hotel/search/pool/${encodeURIComponent(
          selectedPool
        )}`
      )

      if (!response.ok) throw new Error('Failed to fetch hotels')

      const data = await response.json()
      setHotels(data.length ? data : [])
    } catch (error) {
      console.error('Error fetching hotels:', error)
      alert('Failed to fetch hotels. Please try again.')
    }
    setLoading(false)
  }

  const transformedHotels = hotels.map(hotel => {
    const imageUrls = [
      ...(hotel.info.match(/src="(https:\/\/[^"]+)"/g) || [])
    ].map(img => img.match(/src="(https:\/\/[^"]+)"/)[1])

    return {
      _id: hotel.id.toString(),
      name: hotel.name,
      img: hotel.img,
      images: imageUrls,
      available: hotel.avail,
      reviews: hotel.units,
      pricePerNight: hotel.params ? JSON.parse(hotel.params).custprice : 'N/A',
      location: hotel.alias || 'N/A'
    }
  })

  return (
    <View style={styles.rootContainer}>
      {/* Dropdown */}
      <View style={{ zIndex: 2000, marginBottom: poolOpen ? 180 : 10 }}>
        <DropDownPicker
          open={poolOpen}
          value={selectedPool}
          items={poolItems}
          setOpen={setPoolOpen}
          setValue={setSelectedPool}
          setItems={() => {}}
          style={styles.dropdown}
          placeholder='Choose a Hotel'
          dropDownDirection='BOTTOM'
          listMode='SCROLLVIEW'
          dropDownContainerStyle={styles.dropdownContainer}
          ArrowDownIconComponent={() => (
            <Ionicons name='chevron-down' size={22} color='#7f53ac' />
          )}
          ArrowUpIconComponent={() => (
            <Ionicons name='chevron-up' size={22} color='#7f53ac' />
          )}
          tickIconStyle={{ tintColor: '#7f53ac' }}
        />
      </View>
      {/* Search Button */}
      <TouchableOpacity
        style={[
          styles.searchButton,
          loading ? { backgroundColor: '#a63932' } : {}
        ]}
        onPress={fetchHotelsByPool}
        disabled={loading}
        activeOpacity={0.8}
      >
        <Animatable.View
          animation={loading ? undefined : 'pulse'}
          duration={800}
          iterationCount='infinite'
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <Ionicons name='search' size={20} color='#fff' />
          <Text style={styles.buttonText}> Search Hotels</Text>
        </Animatable.View>
      </TouchableOpacity>
      {/* Results */}
      <View style={{ flex: 1, paddingBottom: 40 }}>
        {loading ? (
          <View style={{ marginTop: 8 }}>
            {[1, 2, 3, 4].map(i => (
              <SkeletonBox
                key={i}
                height={328}
                width={width - 32}
                style={{ alignSelf: 'center' }}
              />
            ))}
          </View>
        ) : (
          <FlatList
            data={transformedHotels}
            keyExtractor={item => item._id}
            contentContainerStyle={{ paddingBottom: 180 }}
            ListEmptyComponent={
              <Text style={styles.emptyListText}>
                {selectedPool
                  ? 'No hotels found for your selection.'
                  : 'Please select a hotel.'}
              </Text>
            }
            renderItem={({ item }) => (
              <Animatable.View animation='fadeInUp' duration={800}>
                <SuggestionBox
                  futuristic
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
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#f7f8fa',
    padding: 10,
    borderRadius: 14,
    shadowColor: '#7f53ac',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.09,
    shadowRadius: 12,
    minHeight: '100%'
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    marginTop: 7,
    paddingHorizontal: 6,
    gap: 6
  },
  headerText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#7f53ac',
    letterSpacing: 0.5,
    textShadowColor: '#ccc',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#5a3d8c'
  },
  dropdown: {
    marginBottom: 15,
    borderColor: '#a63932',
    borderRadius: 10,
    backgroundColor: '#f5f4fb'
  },
  dropdownContainer: {
    borderColor: '#a63932',
    borderRadius: 10,
    backgroundColor: '#f7f8fa'
  },
  searchButton: {
    backgroundColor: '#a63932',
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 2,
    shadowColor: '#a63932',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.24,
    shadowRadius: 12
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 0.3
  },
  emptyListText: {
    color: '#8d8d8d',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 30,
    fontStyle: 'italic'
  }
})

export default FilterSuggestion
