import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import axios from 'axios'
import Toast from 'react-native-toast-message'
import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Modal,
  ActivityIndicator,
  Share,
  StatusBar
} from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Feather from '@expo/vector-icons/Feather'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Entypo from '@expo/vector-icons/Entypo'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import CustomBotton from '@/component/CustomBotton'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function SearchedPoolDetailsPage () {
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(2800)
  const [modalVisible, setModalVisible] = useState(false)
  const { id, pool } = useLocalSearchParams()
  const [hotel, setHotel] = useState(null)
  const [loading, setLoading] = useState(true)

  const handleLike = async () => {
    const newLikedState = !liked
    const newCount = newLikedState ? likesCount + 1 : likesCount - 1
    setLiked(newLikedState)
    setLikesCount(newCount)
    Toast.show({
      type: newLikedState ? 'success' : 'error',
      text1: newLikedState
        ? 'Saved to your Favourite.'
        : 'Unsaved from Favourite.'
    })
    try {
      await fetch('https://your-api.com/update-likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ liked: newLikedState, likesCount: newCount })
      })
    } catch (error) {
      console.error('Error updating likes:', error)
    }
  }

  useEffect(() => {
    const fetchHotelDetails = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          `http:/10.0.1.27:5001/hotel/${pool}/${id}`
        )
        const extractImageUrls = htmlString => {
          return [...(htmlString.match(/src="(https:\/\/[^"]+)"/g) || [])].map(
            img => img.match(/src="(https:\/\/[^"]+)"/)[1]
          )
        }
        const data = response.data
        data.images = extractImageUrls(data.info)
        setHotel(data)
        // Save just the hotel data to AsyncStorage
        await AsyncStorage.setItem('hotelDetails', JSON.stringify(data))
      } catch (error) {
        Toast.show({ type: 'error', text1: 'Failed to load hotel details.' })
      }
      setLoading(false)
    }
    fetchHotelDetails()
  }, [id, pool])

  if (loading) {
    return (
      <ActivityIndicator size='large' color='#a63932' style={styles.loader} />
    )
  }

  if (!hotel) {
    return <Text style={styles.errorText}>Hotel details not found.</Text>
  }

  const handleCall = () => {
    if (hotel?.contact?.phone) Linking.openURL(`tel:${hotel.contact.phone}`)
  }

  const handleEmail = () => {
    if (hotel?.contact?.email)
      Linking.openURL(
        `mailto:${hotel.contact.email}?subject=Support Request&body=Hello, I need help with...`
      )
  }

  const handleShare = async () => {
    try {
      const hotelLink = `https://yourhotelwebsite.com/hotel/${hotel._id}`
      const price = hotel.params
        ? Number(JSON.parse(hotel.params).custprice).toLocaleString()
        : hotel.custprice
        ? Number(hotel.custprice).toLocaleString()
        : 'N/A'
      const message = `🏨 Check out this amazing hotel: *${hotel.name}* 📍 ${hotel.location}\n💰 Price: ₦${price} per night.\n🔗 Click here: ${hotelLink}`

      const result = await Share.share({
        message,
        url: hotelLink
      })

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared via:', result.activityType)
        } else {
          console.log('Shared successfully!')
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed.')
      }
    } catch (error) {
      console.error('Error sharing hotel:', error)
    }
  }

  const OpenInstagram = () => {
    Linking.openURL('https://www.instagram.com/').catch(err =>
      console.error("Couldn't load page", err)
    )
  }
  const OpenFacebook = () => {
    Linking.openURL('https://www.facebook.com/').catch(err =>
      console.error("Couldn't load page", err)
    )
  }
  const OpenTwitter = () => {
    Linking.openURL('https://www.twitter.com/').catch(err =>
      console.error("Couldn't load page", err)
    )
  }

  // Defensive: for owners, fallback to empty object to avoid errors on undefined
  const owner = hotel.owners || {}

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <StatusBar barStyle='dark-content' />
        <ScrollView>
          {/* Navigation & Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Feather name='arrow-left' size={24} color='black' />
            </TouchableOpacity>
            <View style={styles.right}>
              <TouchableOpacity onPress={handleShare}>
                <AntDesign
                  style={{ marginRight: 20 }}
                  name='sharealt'
                  size={30}
                  color='black'
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLike}>
                <AntDesign
                  name='heart'
                  size={30}
                  color={liked ? 'red' : 'black'}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Hotel Image */}
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              style={styles.image}
              source={{
                uri:
                  hotel.images?.[0] ||
                  'https://i.postimg.cc/5ttJxCXK/YTW-DELUXE-6.jpg'
              }}
            />
          </TouchableOpacity>

          {/* Image Modal */}
          <Modal
            animationType='slide'
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <AntDesign name='close' size={30} color='white' />
              </TouchableOpacity>
              <ScrollView horizontal pagingEnabled style={styles.imageScroll}>
                {(hotel.images || [])
                  .slice(0, hotel.images.length)
                  .map((img, index) => (
                    <Image
                      key={index}
                      style={styles.modalImage}
                      source={{ uri: img }}
                    />
                  ))}
              </ScrollView>
            </View>
          </Modal>

          {/* Hotel Details */}
          <View style={styles.detailsContainer}>
            <Text style={styles.hotelName}>{hotel.name}</Text>
            <View style={styles.location}>
              <Feather name='map-pin' size={16} color='gray' />
              <Text style={styles.locationText}>{hotel.location}</Text>
            </View>
            <View style={styles.rating}>
              <Text style={styles.star}>{hotel.rating}</Text>
              <Text style={styles.reviews}>
                {hotel.units} · units available
              </Text>
            </View>
            <Text style={styles.price}>
              ₦
              {hotel.params
                ? Number(JSON.parse(hotel.params).custprice).toLocaleString()
                : hotel.custprice
                ? Number(hotel.custprice).toLocaleString()
                : '100,000,000'}{' '}
              - A night
            </Text>
          </View>

          {/* Amenities */}
          <ScrollView
            horizontal
            style={styles.amenities}
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.amenityBox}>
              <FontAwesome5 name='bed' size={20} color='black' />
              <Text style={styles.amenityText}>1 -king Size Bed</Text>
            </View>
            <View style={styles.amenityBox}>
              <FontAwesome name='bathtub' size={24} color='black' />
              <Text style={styles.amenityText}>Bathroom</Text>
            </View>
            <View style={styles.amenityBox}>
              <FontAwesome5 name='wifi' size={24} color='black' />
              <Text style={styles.amenityText}>wifi</Text>
            </View>
            <View style={styles.amenityBox}>
              <MaterialIcons name='ac-unit' size={24} color='black' />
              <Text style={styles.amenityText}>AC</Text>
            </View>
            <View style={styles.amenityBox}>
              <Entypo name='aircraft-take-off' size={20} color='black' />
              <Text style={styles.amenityText}>Airport Shuttle</Text>
            </View>
            <View style={styles.amenityBox}>
              <MaterialCommunityIcons name='broom' size={24} color='black' />
              <Text style={styles.amenityText}>Room Service</Text>
            </View>
          </ScrollView>

          {/* Owner Info */}
          <View style={styles.ownerSection}>
            <Image
              style={styles.ownerImage}
              source={{
                uri:
                  owner.ownerImage ||
                  'data:image/png;base64,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'
              }}
            />
            <View>
              <Text style={styles.ownerName}>{owner.name || 'Angela Yue'}</Text>
              <Text style={styles.ownerRole}>Reservations Personnel</Text>
            </View>
            <View style={styles.contactIcons}>
              <TouchableOpacity onPress={handleEmail}>
                <Feather name='message-circle' size={24} color='black' />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCall}>
                <Feather name='phone-call' size={24} color='black' />
              </TouchableOpacity>
            </View>
          </View>

          {/* Socials */}
          <View>
            <View style={styles.socials}>
              <TouchableOpacity onPress={OpenFacebook}>
                <FontAwesome name='facebook-square' size={24} color='black' />
              </TouchableOpacity>
              <TouchableOpacity onPress={OpenInstagram}>
                <FontAwesome5 name='instagram' size={24} color='black' />
              </TouchableOpacity>
              <TouchableOpacity onPress={OpenTwitter}>
                <FontAwesome name='twitter' size={24} color='black' />
              </TouchableOpacity>
            </View>
          </View>

          {/* Description */}
          <Text style={styles.description}>{hotel.smalldesc}</Text>

          <CustomBotton
            button={`Next - ₦${
              hotel.params
                ? Number(JSON.parse(hotel.params).custprice).toLocaleString()
                : hotel.custprice
                ? Number(hotel.custprice).toLocaleString()
                : 'N/A'
            }`}
            onPress={() =>
              router.push({
                pathname: '/SelectPoolDateRange',
                params: {
                  price: hotel.params
                    ? JSON.parse(hotel.params).custprice
                    : hotel.custprice || '100000',
                  hotelId: hotel._id,
                  pool: pool
                }
              })
            }
          />
        </ScrollView>
      </View>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    paddingTop: 30
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
    color: 'red'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10
  },
  socials: {
    flexDirection: 'row',
    gap: 15,
    margin: 15
  },
  right: {
    flexDirection: 'row'
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 15,
    padding: 10
  },
  detailsContainer: {
    marginTop: 15,
    padding: 10
  },
  hotelName: {
    fontSize: 15,
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5
  },
  locationText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  star: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold'
  },
  reviews: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5
  },
  price: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#a63932',
    marginTop: 10
  },
  amenities: {
    flexDirection: 'row',
    marginVertical: 15,
    flex: 1,
    padding: 10
  },
  amenityBox: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2
  },
  amenityText: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: 'bold'
  },
  ownerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    margin: 10
  },
  ownerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10
  },
  ownerName: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  ownerRole: {
    fontSize: 14,
    color: 'gray'
  },
  contactIcons: {
    flexDirection: 'row',
    marginLeft: 'auto',
    gap: 15
  },
  description: {
    marginTop: 15,
    fontSize: 14,
    color: 'gray',
    lineHeight: 20,
    padding: 10
  },
  bookButton: {
    backgroundColor: '#a63932',
    margin: 10,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20
  },
  bookButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10
  },
  imageScroll: {
    flexDirection: 'row',
    width: '100%'
  },
  modalImage: {
    width: 350,
    height: 400,
    marginHorizontal: 10,
    resizeMode: 'cover',
    borderRadius: 5
  }
})
