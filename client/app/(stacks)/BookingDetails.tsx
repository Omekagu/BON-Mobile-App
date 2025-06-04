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

const { width } = Dimensions.get('window')

interface Owner {
  ownerImage?: string
  name?: string
}

interface HotelDetails {
  _id: string
  name: string
  location: string
  images?: string[]
  rating?: number
  reviews?: number
  smalldesc?: string
  owners?: Owner
  contact?: {
    phone?: string
    email?: string
  }
}

interface Booking {
  hotelDetails: HotelDetails
  checkInDate: string
  checkOutDate: string
  guests: number
  nights: number
  status: string
  totalPrice: number
  _id: string
}

interface Params {
  userId?: string
  id?: string
}

export default function BookingDetails () {
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(2800)
  const [modalVisible, setModalVisible] = useState(false)
  const { userId, id } = useLocalSearchParams<Params>()
  const [hotel, setHotel] = useState<HotelDetails | null>(null)
  const [bookingDetails, setBookingsDetails] = useState<Booking | null>(null)
  const [loading, setLoading] = useState(true)
  const [imgIndex, setImgIndex] = useState(0)

  const handleLike = async () => {
    const newLikedState = !liked
    const newCount = newLikedState ? likesCount + 1 : likesCount - 1
    setLiked(newLikedState)
    setLikesCount(newCount)
    Toast.show({
      type: newLikedState ? 'success' : 'error',
      text1: newLikedState
        ? 'Saved to your Favourites.'
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
        const response = await axios.get<{ data: Booking[] }>(
          `http://10.0.1.27:5001/hotel/history/booking/${userId}`
        )
        const booking = Array.isArray(response.data.data)
          ? response.data.data.find(b => b._id === id)
          : null
        if (!booking) {
          Toast.show({ type: 'error', text1: 'No booking found for this ID.' })
          setLoading(false)
          return
        }
        setHotel(booking.hotelDetails)
        setBookingsDetails(booking)
      } catch (error) {
        Toast.show({ type: 'error', text1: 'Failed to load hotel details.' })
      }
      setLoading(false)
    }
    fetchHotelDetails()
  }, [id, userId])

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size='large' color='#a63932' />
      </View>
    )
  }

  if (!hotel || !bookingDetails) {
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
      const message = `Check out this amazing hotel:\n🏨 ${hotel.name}\n📍 ${
        hotel.location
      }\n💰Price:  ${Number(bookingDetails.totalPrice).toLocaleString()} for ${
        bookingDetails.nights
      } nights.\n🔗 Click here: ${hotelLink}`
      await Share.share({ message, url: hotelLink })
    } catch (error) {
      console.error('Error sharing hotel:', error)
    }
  }

  const hotelImages = hotel.images?.length
    ? hotel.images
    : ['https://i.postimg.cc/5ttJxCXK/YTW-DELUXE-6.jpg']

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Feather name='arrow-left' size={28} color='#222' />
            </TouchableOpacity>
            <View style={styles.headerActions}>
              <TouchableOpacity onPress={handleShare}>
                <AntDesign
                  name='sharealt'
                  size={26}
                  color='#222'
                  style={{ marginRight: 18 }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLike}>
                <AntDesign
                  name='heart'
                  size={26}
                  color={liked ? '#a63932' : '#222'}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Hotel Images */}
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            activeOpacity={0.88}
          >
            <Image
              style={styles.image}
              source={{ uri: hotelImages[imgIndex] }}
              resizeMode='cover'
            />
            <View style={styles.imageDots}>
              {hotelImages.map((_, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.dot,
                    { backgroundColor: idx === imgIndex ? '#a63932' : '#fff' }
                  ]}
                />
              ))}
            </View>
          </TouchableOpacity>

          {/* Modal Gallery */}
          <Modal
            animationType='slide'
            transparent
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <AntDesign name='close' size={32} color='white' />
              </TouchableOpacity>
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={e => {
                  const page = Math.round(e.nativeEvent.contentOffset.x / width)
                  setImgIndex(page)
                }}
                style={styles.imageScroll}
              >
                {hotelImages.map((img, index) => (
                  <Image
                    key={index}
                    style={styles.modalImage}
                    source={{ uri: img }}
                    resizeMode='contain'
                  />
                ))}
              </ScrollView>
            </View>
          </Modal>

          {/* Details */}
          <View style={styles.detailsContainer}>
            <View style={styles.statusRow}>
              <Text
                style={[
                  styles.status,
                  {
                    color:
                      bookingDetails.status === 'Completed'
                        ? 'green'
                        : bookingDetails.status === 'Pending'
                        ? '#FFA500'
                        : 'red'
                  }
                ]}
              >
                {bookingDetails.status}
              </Text>
              <Text style={styles.likesCount}>{likesCount} likes</Text>
            </View>
            <Text style={styles.hotelName}>{hotel.name}</Text>
            <View style={styles.location}>
              <Feather name='map-pin' size={17} color='#a63932' />
              <Text style={styles.locationText}>{hotel.location}</Text>
            </View>
            <View style={styles.rating}>
              <Text style={styles.star}>⭐{hotel.rating ?? 4.5}</Text>
              <Text style={styles.reviews}>
                ({hotel.reviews ?? 223}) reviews
              </Text>
            </View>
            <Text style={styles.price}>
              ₦
              {bookingDetails.totalPrice
                ? Number(bookingDetails.totalPrice).toLocaleString()
                : 'N/A'}
              <Text style={styles.bookingDetails}>
                {' '}
                • {bookingDetails.nights} Night
                {bookingDetails.nights > 1 ? 's' : ''}
              </Text>
            </Text>
            <View style={styles.checkInOutRow}>
              <Text style={styles.bookingDetails}>
                Check-In: {new Date(bookingDetails.checkInDate).toDateString()}
              </Text>
              <Text style={styles.bookingDetails}>
                Check-Out:{' '}
                {new Date(bookingDetails.checkOutDate).toDateString()}
              </Text>
              <Text style={styles.bookingDetails}>
                Guests: {bookingDetails.guests}
              </Text>
            </View>
          </View>

          {/* Amenities */}
          <ScrollView
            horizontal
            style={styles.amenities}
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.amenityBox}>
              <FontAwesome5 name='bed' size={20} color='#a63932' />
              <Text style={styles.amenityText}>1 King Bed</Text>
            </View>
            <View style={styles.amenityBox}>
              <FontAwesome name='bathtub' size={22} color='#a63932' />
              <Text style={styles.amenityText}>Bathroom</Text>
            </View>
            <View style={styles.amenityBox}>
              <FontAwesome5 name='wifi' size={20} color='#a63932' />
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
                  hotel.owners?.ownerImage ||
                  'https://i.postimg.cc/5ttJxCXK/YTW-DELUXE-6.jpg'
              }}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.ownerName}>
                {hotel.owners?.name ?? 'Angela Yue'}
              </Text>
              <Text style={styles.ownerRole}>Customer Service</Text>
            </View>
            <View style={styles.contactIcons}>
              <TouchableOpacity onPress={handleEmail} style={styles.iconBtn}>
                <Feather name='message-circle' size={22} color='#a63932' />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCall} style={styles.iconBtn}>
                <Feather name='phone-call' size={22} color='#a63932' />
              </TouchableOpacity>
            </View>
          </View>

          {/* Socials */}
          <View style={styles.socials}>
            <TouchableOpacity onPress={handleEmail} style={styles.iconBtn}>
              <FontAwesome name='facebook-square' size={22} color='#4267B2' />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCall} style={styles.iconBtn}>
              <FontAwesome5 name='instagram' size={22} color='#C13584' />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCall} style={styles.iconBtn}>
              <FontAwesome name='twitter' size={22} color='#1DA1F2' />
            </TouchableOpacity>
          </View>

          {/* Description */}
          {hotel.smalldesc ? (
            <Text style={styles.description}>{hotel.smalldesc}</Text>
          ) : null}

          {/* Action Buttons */}
          {bookingDetails.status === 'Pending' ? (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: '/Payments',
                  params: {
                    price: String(bookingDetails.totalPrice),
                    // hotelId,
                    bookingData: bookingDetails
                  }
                })
              }
              style={styles.primaryBtn}
              activeOpacity={0.85}
            >
              <Text style={styles.primaryBtnText}>
                Book Now · ₦{bookingDetails.totalPrice}
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.secondaryBtn}
                onPress={() => router.push('/BookFlight')}
              >
                <Text style={styles.secondaryBtnText}>Book Flight</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.secondaryBtn}
                onPress={() => router.push('/OrderFood')}
              >
                <Text style={styles.secondaryBtnText}>Order Food</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.secondaryBtn}
                onPress={() => router.push('/PlanYourRide')}
              >
                <Text style={styles.secondaryBtnText}>Order Ride</Text>
              </TouchableOpacity>
            </View>
          )}
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
    backgroundColor: '#000',
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
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  status: {
    fontSize: 15,
    fontWeight: '800',
    textTransform: 'uppercase'
  },
  likesCount: {
    fontSize: 13,
    color: '#888',
    fontWeight: '500'
  },
  hotelName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 4,
    color: '#1a1a1a'
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 2
  },
  locationText: {
    color: '#555',
    marginLeft: 7,
    fontSize: 15,
    fontWeight: '500'
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2
  },
  star: {
    fontSize: 15,
    color: '#FFA500',
    fontWeight: 'bold'
  },
  reviews: {
    fontSize: 13,
    color: '#888',
    marginLeft: 5
  },
  price: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#a63932',
    marginTop: 6,
    marginBottom: 0
  },
  checkInOutRow: {
    marginTop: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14
  },
  bookingDetails: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666'
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
  },
  primaryBtn: {
    backgroundColor: '#a63932',
    marginHorizontal: 20,
    marginTop: 18,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2
  },
  primaryBtnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 8,
    marginTop: 17
  },
  secondaryBtn: {
    backgroundColor: '#fff',
    borderColor: '#a63932',
    borderWidth: 1,
    paddingVertical: 13,
    paddingHorizontal: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 4,
    elevation: 1
  },
  secondaryBtnText: {
    color: '#a63932',
    fontSize: 15,
    fontWeight: 'bold'
  }
})
