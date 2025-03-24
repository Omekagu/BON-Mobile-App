import React, { useState } from 'react'
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import axios from 'axios'
import SuggestionBox from './SuggestionBox'
import Toast from 'react-native-toast-message'
import * as Animatable from 'react-native-animatable'
import { Feather, MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'

const SkeletonLoader = () => (
  <View style={styles.skeletonContainer}>
    <View style={styles.skeletonBox} />
    <View style={styles.skeletonBox} />
    <View style={styles.skeletonBox} />
  </View>
)

const Suggestions = () => {
  const [hotelName, setHotelName] = useState('')
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)

  // 🎤 Voice Search Function
  const startVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window)) {
      Toast.show({
        type: 'error',
        text1: 'Voice search not supported in this browser.'
      })
      return
    }

    const recognition = new window.webkitSpeechRecognition()
    recognition.lang = 'en-US'
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onstart = () => setIsListening(true)
    recognition.onend = () => setIsListening(false)

    recognition.onresult = event => {
      const transcript = event.results[0][0].transcript
      setHotelName(transcript)
      searchHotelsByName(transcript) // Auto-search after speech recognition
    }

    recognition.start()
  }

  // 🔍 Search Hotels
  const searchHotelsByName = async searchQuery => {
    Toast.hide()
    const query = searchQuery || hotelName

    if (!query.trim()) {
      Toast.show({ type: 'error', text1: 'Hotel name cannot be empty.' })
      return
    }
    if (!/^[a-zA-Z0-9\s]+$/.test(query)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid hotel name. Use only letters and numbers.'
      })
      return
    }

    setLoading(true)
    try {
      const response = await axios.get(
        `http://10.0.1.20:5001/hotel/search/${encodeURIComponent(query)}`
      )
      setHotels(response.data.length ? response.data : [])

      if (!response.data.length) {
        Toast.show({
          type: 'error',
          text1: 'No hotels found matching the given name.'
        })
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error searching for hotels. Please try again.'
      })
      console.error(error)
    }
    setLoading(false)
  }

  return (
    <Animatable.View animation='fadeInUp' style={styles.container}>
      {/* Search Input with Voice Search */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder='Search hotels...'
          placeholderTextColor='#888'
          value={hotelName}
          onChangeText={setHotelName}
          style={styles.textInput}
        />

        {/* 🎤 Voice Search Button */}
        <TouchableOpacity style={styles.voiceButton} onPress={startVoiceSearch}>
          <MaterialIcons
            name='mic'
            size={24}
            color={isListening ? 'red' : '#fff'}
          />
        </TouchableOpacity>

        {/* 🔍 Search Button */}
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => searchHotelsByName()}
        >
          {loading ? (
            <ActivityIndicator color='#fff' />
          ) : (
            <Feather name='search' size={24} color='#fff' />
          )}
        </TouchableOpacity>
      </View>

      {/* Hotel List */}
      <View style={styles.flatList}>
        {loading ? (
          <SkeletonLoader />
        ) : (
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
        )}
      </View>
    </Animatable.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 5,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3
  },
  flatList: {
    marginBottom: 170,
    marginHorizontal: 10
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: 'black'
  },
  searchButton: {
    backgroundColor: '#a63932',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8
  },
  voiceButton: {
    backgroundColor: '#a63932',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8
  },
  skeletonContainer: {
    padding: 10
  },
  skeletonBox: {
    height: 290,
    backgroundColor: '#ddd',
    marginBottom: 10,
    borderRadius: 10
  }
})

export default Suggestions
