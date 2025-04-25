import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import axios from 'axios'
import Toast from 'react-native-toast-message'
import {
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Modal,
  ActivityIndicator,
  Share
} from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Feather from '@expo/vector-icons/Feather'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Entypo from '@expo/vector-icons/Entypo'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import CustomBotton from '@/component/CustomBotton'

export default function HotelBookingScreen () {
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(2800) // Example initial likes count
  const [modalVisible, setModalVisible] = useState(false)
  const { id } = useLocalSearchParams() // Get hotel ID from route params
  const [hotel, setHotel] = useState(null)
  const [loading, setLoading] = useState(true)

  const handleLike = async () => {
    const newLikedState = !liked
    const newCount = newLikedState ? likesCount + 1 : likesCount - 1
    if (newLikedState) {
      setLiked(newLikedState)
      setLikesCount(newCount)
      Toast.show({ type: 'success', text1: 'saved to your Favourite.' })
    } else {
      Toast.show({ type: 'error', text1: 'Unsaved from Favourite.' })
      setLiked(newLikedState)
    }
    try {
      // Simulating API call to update likes in the database
      await fetch('https://your-api.com/update-likes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ liked: newLikedState, likesCount: newCount })
      })
    } catch (error) {
      console.error('Error updating likes:', error)
    }
  }

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await axios.get(`http://10.0.1.8:5001/hotel/${id}`)
        setHotel(response.data)
      } catch (error) {
        Toast.show({ type: 'error', text1: 'Failed to load hotel details.' })
      }
      setLoading(false)
    }

    fetchHotelDetails()
  }, [id])

  if (loading) {
    return (
      <ActivityIndicator size='large' color='#a63932' style={styles.loader} />
    )
  }

  if (!hotel) {
    return <Text style={styles.errorText}>Hotel details not found.</Text>
  }

  const handleCall = () => {
    Linking.openURL(`tel:${hotel.contact.phone}`)
  }

  const handleEmail = () => {
    Linking.openURL(
      `mailto:${hotel.contact.email}?subject=Support Request&body=Hello, I need help with...`
    )
  }

  const handleShare = async () => {
    try {
      const hotelLink = `https://yourhotelwebsite.com/hotel/${hotel._id}` // Ensure it's a full URL
      const message = `🏨 Check out this amazing hotel: *${hotel.name}* 📍 ${hotel.location}\n💰 Price: $₦{hotel.pricePerNight.toLocaleString()} per night.\n🔗 Click here: ${hotelLink}`

      const result = await Share.share({
        message: message,
        url: hotelLink // Ensures it's detected as a clickable link
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
  // console.log(hotel.contact)
  // console.log(hotel.reviews)

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

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <ScrollView>
          {/* <View> */}

          {/* Navigation & Header */}
          <View style={styles.header}>
            <Feather name='arrow-left' size={24} color='black' />
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
          {/* Hotel Image (Click to Open Modal) */}
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
                {[
                  hotel.images?.[0],
                  hotel.images?.[1],
                  hotel.images?.[2],
                  hotel.images?.[3]
                  // "https://i.postimg.cc/sDF3pxL1/YTW-EXECUTIVE-3.jpg",
                  // "https://i.postimg.cc/Bnps9gn1/YTW-SUPERIOR-6.jpg",
                  // "https://i.postimg.cc/5ttJxCXK/YTW-DELUXE-6.jpg",
                ].map((img, index) => (
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
              <Text style={styles.star}>⭐{hotel.rating}</Text>
              <Text style={styles.reviews}>({hotel.reviews})k · reviews</Text>
            </View>
            <Text style={styles.price}>
              ₦
              {hotel.pricePerNight
                ? Number(hotel.pricePerNight).toLocaleString()
                : '100,000,000'}{' '}
              - A night
            </Text>
          </View>

          {/* Amenities */}
          <ScrollView horizontal style={styles.amenities}>
            <View style={styles.amenityBox}>
              <FontAwesome5 name='bed' size={20} color='black' />
              <Text style={styles.amenityText}>2 Bed</Text>
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
                  hotel.owners?.ownerImage ||
                  'https://i.postimg.cc/5ttJxCXK/YTW-DELUXE-6.jpg'
              }}
            />
            <View>
              <Text style={styles.ownerName}>{hotel.owners?.name}</Text>
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
          <Text style={styles.description}>{hotel.description}</Text>

          <CustomBotton
            button={`Next - ₦${
              hotel.pricePerNight
                ? Number(hotel.pricePerNight).toLocaleString()
                : '100,000'
            }`}
            onPress={() =>
              router.push({
                pathname: '/SelectDateRange',
                params: { price: hotel.pricePerNight, hotelId: hotel._id }
              })
            }
          />
          {/* </View> */}
        </ScrollView>
      </View>
    </GestureHandlerRootView>
  )
}

// Styles
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
    // fontSize: 16,
    // color: '#FFA500'
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
    elevation: 3, // Android shadow
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
  // Modal Styles
  modalContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center'
    // height:'3%',
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
    borderRadius: 10
  }
})
