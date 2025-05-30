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
  StatusBar,
  Dimensions
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

const { width } = Dimensions.get('window')

export default function SearchedPoolDetailsPage () {
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(2800)
  const [modalVisible, setModalVisible] = useState(false)
  const { id, pool } = useLocalSearchParams()
  const [hotel, setHotel] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImageIdx, setActiveImageIdx] = useState(0)

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
        console.log(data)
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
      <View style={styles.loader}>
        <ActivityIndicator size='large' color='#000' />
        <Text style={{ color: '#000', fontSize: 16, marginTop: 10 }}>
          Loading hotel details...
        </Text>
      </View>
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

  // Socials
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
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Navigation & Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backBtn}
            >
              <Feather name='arrow-left' size={28} color='#000' />
            </TouchableOpacity>
            <View style={styles.right}>
              <TouchableOpacity
                onPress={handleShare}
                style={styles.headerIconBtn}
              >
                <AntDesign name='sharealt' size={26} color='#000' />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleLike}
                style={styles.headerIconBtn}
              >
                <AntDesign
                  name='heart'
                  size={26}
                  color={liked ? '#fc0303' : '#000'}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Hotel Image (with indicator if multiple) */}
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              style={styles.image}
              source={{
                uri:
                  hotel.images?.[activeImageIdx] ||
                  'https://i.postimg.cc/5ttJxCXK/YTW-DELUXE-6.jpg'
              }}
            />
            {hotel.images && hotel.images.length > 1 && (
              <View style={styles.imageIndicatorBox}>
                {hotel.images.map((_, idx) => (
                  <View
                    key={idx}
                    style={[
                      styles.imageIndicatorDot,
                      activeImageIdx === idx && styles.imageIndicatorDotActive
                    ]}
                  />
                ))}
              </View>
            )}
          </TouchableOpacity>

          {/* Image Modal */}
          <Modal
            animationType='fade'
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <AntDesign name='close' size={32} color='#000' />
              </TouchableOpacity>
              <ScrollView
                horizontal
                pagingEnabled
                style={styles.imageScroll}
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={e => {
                  const idx = Math.round(e.nativeEvent.contentOffset.x / width)
                  setActiveImageIdx(idx)
                }}
              >
                {(hotel.images || []).map((img, index) => (
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

            <View style={styles.ratingRow}>
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
              <Text style={{ color: '#888', fontWeight: '400' }}>
                per night
              </Text>
            </Text>
          </View>

          {/* Amenities */}
          <ScrollView
            horizontal
            style={styles.amenities}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 15 }}
          >
            <View style={styles.amenityBox}>
              <FontAwesome5 name='bed' size={22} color='#000' />
              <Text style={styles.amenityText}>King Size Bed</Text>
            </View>
            <View style={styles.amenityBox}>
              <FontAwesome name='bathtub' size={23} color='#000' />
              <Text style={styles.amenityText}>Bathroom</Text>
            </View>
            <View style={styles.amenityBox}>
              <FontAwesome5 name='wifi' size={22} color='#000' />
              <Text style={styles.amenityText}>WiFi</Text>
            </View>
            <View style={styles.amenityBox}>
              <MaterialIcons name='ac-unit' size={22} color='#000' />
              <Text style={styles.amenityText}>AC</Text>
            </View>
            <View style={styles.amenityBox}>
              <Entypo name='aircraft-take-off' size={20} color='#000' />
              <Text style={styles.amenityText}>Shuttle</Text>
            </View>
            <View style={styles.amenityBox}>
              <MaterialCommunityIcons name='broom' size={22} color='#000' />
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
            <View style={{ flex: 1 }}>
              <Text style={styles.ownerName}>{owner.name || 'Angela Yue'}</Text>
              <Text style={styles.ownerRole}>Reservations Personnel</Text>
            </View>
            <View style={styles.contactIcons}>
              <TouchableOpacity onPress={handleEmail}>
                <Feather name='message-circle' size={22} color='#000' />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCall}>
                <Feather name='phone-call' size={22} color='#000' />
              </TouchableOpacity>
            </View>
          </View>

          {/* Socials */}
          <View>
            <View style={styles.socials}>
              <TouchableOpacity onPress={OpenFacebook}>
                <FontAwesome name='facebook-square' size={24} color='#000' />
              </TouchableOpacity>
              <TouchableOpacity onPress={OpenInstagram}>
                <FontAwesome5 name='instagram' size={24} color='#000' />
              </TouchableOpacity>
              <TouchableOpacity onPress={OpenTwitter}>
                <FontAwesome name='twitter' size={24} color='#000' />
              </TouchableOpacity>
            </View>
          </View>

          {/* Description */}
          <Text style={styles.description}>
            {hotel.smalldesc || 'No description available.'}
          </Text>

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
    backgroundColor: '#eee',
    height: '100%',
    paddingTop: 30
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee'
  },
  errorText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
    color: '#fff'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10
  },
  backBtn: {
    backgroundColor: '#fff',
    padding: 7,
    borderRadius: 16
  },
  headerIconBtn: {
    marginLeft: 10,
    padding: 6,
    backgroundColor: '#fff',
    borderRadius: 14
  },
  socials: {
    flexDirection: 'row',
    gap: 15,
    margin: 15,
    justifyContent: 'center'
  },
  right: {
    flexDirection: 'row'
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 20,
    marginBottom: 3,
    backgroundColor: '#ece9f7'
  },
  imageIndicatorBox: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    justifyContent: 'center'
  },
  imageIndicatorDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#c1b3e5',
    marginHorizontal: 3
  },
  imageIndicatorDotActive: {
    backgroundColor: '#000'
  },
  detailsContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8
  },
  hotelName: {
    fontSize: 19,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 3
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
    gap: 3
  },
  locationText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
    gap: 7
  },
  star: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold'
  },
  reviews: {
    color: '#0d5e0f',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 6
  },
  price: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#a63932',
    marginTop: 12
  },
  amenities: {
    flexDirection: 'row',
    marginVertical: 18,
    paddingLeft: 12
  },
  amenityBox: {
    backgroundColor: '#fff',
    paddingVertical: 13,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.13,
    shadowRadius: 2,
    minWidth: 90
  },
  amenityText: {
    marginTop: 5,
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center'
  },
  ownerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 14,
    marginTop: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.16,
    shadowRadius: 2,
    margin: 12
  },
  ownerImage: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginRight: 12,
    borderWidth: 1.2,
    borderColor: '#ece9f7'
  },
  ownerName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000'
  },
  ownerRole: {
    fontSize: 13,
    color: '#888'
  },
  contactIcons: {
    flexDirection: 'row',
    marginLeft: 'auto',
    gap: 14
  },
  description: {
    marginTop: 15,
    fontSize: 15,
    color: '#3b403b',
    lineHeight: 21,
    paddingHorizontal: 16,
    fontWeight: '500',
    marginBottom: 16
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeButton: {
    position: 'absolute',
    top: 56,
    right: 24,
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 4
  },
  imageScroll: {
    flexDirection: 'row',
    width: width,
    height: 420
  },
  modalImage: {
    width: width - 40,
    height: 400,
    marginHorizontal: 10,
    resizeMode: 'cover',
    borderRadius: 14,
    marginTop: 50
  }
})
