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
  Dimensions,
  Platform
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

interface Owner {
  ownerImage?: string
  name?: string
}

interface Hotel {
  _id: string
  name: string
  location: string
  units?: number
  images?: string[]
  rating?: number
  reviews?: number
  smalldesc?: string
  owners?: Owner
  contact?: {
    phone?: string
    email?: string
  }
  params?: string
  custprice?: number
  info?: string
}

interface Params {
  id?: string
  pool?: string
}

export default function SearchedPoolDetailsPage () {
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(2800)
  const [modalVisible, setModalVisible] = useState(false)
  const { id, pool } = useLocalSearchParams<Params>()
  const [hotel, setHotel] = useState<Hotel | null>(null)
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
        const extractImageUrls = (htmlString: string): string[] => {
          return [...(htmlString.match(/src="(https:\/\/[^"]+)"/g) || [])].map(
            img => img.match(/src="(https:\/\/[^"]+)"/)?.[1] || ''
          )
        }
        const data: Hotel = response.data
        data.images = extractImageUrls(data.info || '')
        setHotel(data)
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
        <ActivityIndicator size='large' color='#a63932' />
        <Text style={{ color: '#a63932', fontSize: 16, marginTop: 10 }}>
          Loading hotel details...
        </Text>
      </View>
    )
  }

  if (!hotel) {
    return <Text style={styles.errorText}>Hotel details not found.</Text>
  }

  const handleCall = () => {
    if (hotel.contact?.phone) Linking.openURL(`tel:${hotel.contact.phone}`)
  }

  const handleEmail = () => {
    if (hotel.contact?.email)
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

      await Share.share({
        message,
        url: hotelLink
      })
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

  const owner = hotel.owners || {}

  const hotelImages = hotel.images?.length
    ? hotel.images
    : ['https://i.postimg.cc/5ttJxCXK/YTW-DELUXE-6.jpg']

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <StatusBar barStyle='dark-content' />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 10 }}
        >
          {/* Navigation & Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backBtn}
            >
              <Feather name='arrow-left' size={28} color='#222' />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={handleShare}
                style={styles.headerIconBtn}
              >
                <AntDesign name='sharealt' size={26} color='#222' />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleLike}
                style={styles.headerIconBtn}
              >
                <AntDesign
                  name='heart'
                  size={26}
                  color={liked ? '#fa0505' : '#000'}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Hotel Image (with indicator if multiple) */}
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              style={styles.image}
              source={{
                uri: hotelImages[activeImageIdx]
              }}
            />
            {hotelImages.length > 1 && (
              <View style={styles.imageDots}>
                {hotelImages.map((_, idx) => (
                  <View
                    key={idx}
                    style={[
                      styles.dot,
                      {
                        backgroundColor:
                          idx === activeImageIdx ? '#a63932' : '#fff'
                      }
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
                <AntDesign name='close' size={32} color={'dark'} />
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
                {hotelImages.map((img, index) => (
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
              <FontAwesome5 name='bed' size={22} color='#a63932' />
              <Text style={styles.amenityText}>King Size Bed</Text>
            </View>
            <View style={styles.amenityBox}>
              <FontAwesome name='bathtub' size={23} color='#a63932' />
              <Text style={styles.amenityText}>Bathroom</Text>
            </View>
            <View style={styles.amenityBox}>
              <FontAwesome5 name='wifi' size={22} color='#a63932' />
              <Text style={styles.amenityText}>WiFi</Text>
            </View>
            <View style={styles.amenityBox}>
              <MaterialIcons name='ac-unit' size={22} color='#a63932' />
              <Text style={styles.amenityText}>AC</Text>
            </View>
            <View style={styles.amenityBox}>
              <Entypo name='aircraft-take-off' size={20} color='#a63932' />
              <Text style={styles.amenityText}>Shuttle</Text>
            </View>
            <View style={styles.amenityBox}>
              <MaterialCommunityIcons name='broom' size={22} color='#a63932' />
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
                  'https://i.postimg.cc/5ttJxCXK/YTW-DELUXE-6.jpg'
              }}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.ownerName}>{owner.name || 'Angela Yue'}</Text>
              <Text style={styles.ownerRole}>Reservations Personnel</Text>
            </View>
            <View style={styles.contactIcons}>
              <TouchableOpacity onPress={handleEmail}>
                <Feather name='message-circle' size={22} color='#a63932' />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCall}>
                <Feather name='phone-call' size={22} color='#a63932' />
              </TouchableOpacity>
            </View>
          </View>

          {/* Socials */}
          <View>
            <View style={styles.socials}>
              <TouchableOpacity onPress={OpenFacebook}>
                <FontAwesome name='facebook-square' size={24} color='#4267B2' />
              </TouchableOpacity>
              <TouchableOpacity onPress={OpenInstagram}>
                <FontAwesome5 name='instagram' size={24} color='#C13584' />
              </TouchableOpacity>
              <TouchableOpacity onPress={OpenTwitter}>
                <FontAwesome name='twitter' size={24} color='#1DA1F2' />
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
    backgroundColor: '#faf8f7',
    paddingTop: Platform.OS === 'android' ? 34 : 24
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#faf8f7'
  },
  errorText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 40,
    color: '#a63932'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 14,
    paddingTop: 10
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center'
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
  image: {
    width: '94%',
    height: 220,
    borderRadius: 16,
    marginTop: 10,
    alignSelf: 'center'
  },
  imageDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#a63932'
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeButton: {
    position: 'absolute',

    top: 46,
    right: 24,
    zIndex: 2
  },
  imageScroll: {
    width: width,
    flexGrow: 0
  },
  modalImage: {
    width: width,
    height: 420,
    resizeMode: 'contain'
  },
  detailsContainer: {
    marginTop: 18,
    paddingHorizontal: 22
  },
  hotelName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 4,
    color: '#1a1a1a'
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
    gap: 7
  },
  star: {
    color: '#a63932',
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
    fontSize: 19,
    fontWeight: 'bold',
    color: '#a63932',
    marginTop: 12
  },
  amenities: {
    flexDirection: 'row',
    marginVertical: 18,
    paddingLeft: 18
  },
  amenityBox: {
    backgroundColor: '#fff',
    paddingVertical: 13,
    paddingHorizontal: 15,
    borderRadius: 13,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#a63932',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3
  },
  amenityText: {
    marginTop: 5,
    fontSize: 13,
    fontWeight: 'bold',
    color: '#a63932'
  },
  ownerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 13,
    borderRadius: 12,
    marginTop: 10,
    marginHorizontal: 12,
    elevation: 2,
    shadowColor: '#222',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3
  },
  ownerImage: {
    width: 46,
    height: 46,
    borderRadius: 23
  },
  ownerName: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 2
  },
  ownerRole: {
    fontSize: 13,
    color: '#888'
  },
  contactIcons: {
    flexDirection: 'row',
    marginLeft: 'auto',
    gap: 16
  },
  iconBtn: {
    padding: 5
  },
  socials: {
    flexDirection: 'row',
    gap: 15,
    margin: 15,
    justifyContent: 'center'
  },
  description: {
    marginTop: 18,
    fontSize: 14,
    color: '#444',
    lineHeight: 21,
    paddingHorizontal: 18,
    marginBottom: 10
  }
})
