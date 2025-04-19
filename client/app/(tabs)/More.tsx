import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign'
import Fontisto from '@expo/vector-icons/Fontisto'
import Ionicons from '@expo/vector-icons/Ionicons'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MoreComp from '@/component/MoreComp'
import * as ImagePicker from 'expo-image-picker'
import axios from 'axios'

export default function More () {
  const router = useRouter()
  const [imageUri, setImageUri] = useState(null)
  const [upLoading, setUploading] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const CLOUDINARY_UPLOAD_URL =
    'https://api.cloudinary.com/v1_1/da26wgev2/image/upload'
  const UPLOAD_PRESET = 'chataap'

  const pickImage = async () => {
    try {
      // Request permission first
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Please allow access to the media library.'
        )
        return
      }

      // Launch the image picker with base64 enabled
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5, // lower quality to reduce file size
        base64: true,
        selectionLimit: 1
      })

      if (!result.canceled) {
        // Set the image URI for display (optional)
        setImageUri(result.assets?.[0]?.uri ?? null)
        // Prepare the base64 image for upload
        const base64Img = `data:image/jpg;base64,${result.assets[0].base64}`
        let formData = new FormData()
        formData.append('file', base64Img)
        formData.append('upload_preset', UPLOAD_PRESET)

        // Upload the image to Cloudinary
        const uploadResponse = await axios.post(
          CLOUDINARY_UPLOAD_URL,
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' }
          }
        )
        const imageUrl = uploadResponse.data.secure_url
        console.log('Uploaded image URL:', imageUrl)
        // Update the profile image on your backend using the short URL from Cloudinary
        await updateProfileImage(imageUrl)
      }
    } catch (error) {
      console.error('Image picking error:', error)
      Alert.alert('Error', 'An error occurred while picking the image.')
    }
  }

  const getUserId = async () => {
    try {
      const userData = await AsyncStorage.getItem('token')
      if (!userData) return null
      const parsedData = JSON.parse(userData)
      let token = parsedData.token.replace(/^"|"$/g, '')
      const response = await axios.get(
        'http://172.20.10.3:5001/auth/usertoken',
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      return parsedData.userId
    } catch (error) {
      console.error('Error retrieving user ID:', error)
      return null
    }
  }

  const updateProfileImage = async imageUrl => {
    try {
      setUploading(true)
      // Retrieve the logged-in user ID properly
      const userId = await getUserId()
      if (!userId) {
        Alert.alert('Error', 'User not found')
        return
      }
      // imageUrl is the short URL returned from Cloudinary
      const response = await axios.post(
        'http://172.20.10.3:5001/auth/update-profile-image',
        { userId, profileImage: imageUrl }
      )
      Alert.alert('Success', 'Profile image updated successfully')
      console.log(response.data)
      // Update local user state so that further uploads are disabled
      setUser(prev => ({ ...prev, profileImage: imageUrl }))
    } catch (error) {
      console.error('Error updating profile image:', error)
      Alert.alert('Error', 'Failed to update profile image')
    } finally {
      setUploading(false)
    }
  }

  useEffect(() => {
    // Fetch user data from backend
    const fetchUser = async () => {
      try {
        const userId = await getUserId()
        const response = await axios.get(
          `http://172.20.10.3:5001/user/user/${userId}`
        )
        setUser(response.data.user)
      } catch (error) {
        console.error('Error fetching user:', error)
      }
      setLoading(false)
    }
    fetchUser()
  }, [])

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size='large' color='#a63932' />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View>
          <Text style={styles.profileName}>
            Hi, {user?.firstName || 'User'}.
          </Text>
          <View style={styles.ratingContainer}>
            <AntDesign name='star' size={16} color='#a63932' />
            <Text style={styles.ratingText}>Tier 1</Text>
          </View>
        </View>
        <TouchableOpacity
          // If there's already an image in the database, disable uploading
          onPress={() => {
            if (user?.profileImage) {
              Alert.alert('Image Set', 'Your profile image is already set.')
            } else {
              pickImage()
            }
          }}
          style={styles.imagePicker}
        >
          {user?.profileImage ? (
            <Image
              source={{ uri: user.profileImage }}
              style={styles.profileImage}
            />
          ) : imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.profileImage} />
          ) : (
            <Text style={styles.imageText}>Upload Photo</Text>
          )}
          {upLoading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size='large' color='#a63932' />
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Quick Access Buttons */}
      <View style={styles.quickAccess}>
        <TouchableOpacity style={styles.accessButton}>
          <Ionicons name='help-circle' size={30} color='#a63932' />
          <Text style={styles.cardText}>Help</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.accessButton}
          onPress={() => router.push('/Wallet')}
        >
          <Fontisto name='wallet' size={30} color='#a63932' />
          <Text style={styles.cardText}>Wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.accessButton}>
          <Ionicons name='time-outline' size={30} color='#a63932' />
          <Text style={styles.cardText}>Activity</Text>
        </TouchableOpacity>
      </View>

      {/* Checkups Section */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Safety Checkup</Text>
          <Text style={styles.cardText}>Learn ways to make rides safer</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Privacy Checkup</Text>
          <Text style={styles.cardText}>
            Take an interactive tour of your privacy settings
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Estimated Cost Saved</Text>
          <Text style={styles.cardText}>$1000</Text>
        </View>

        {/* Settings Section */}
        <MoreComp
          onPress={() => router.push('/Profile')}
          name={'Manage Profile'}
          icon={
            <Ionicons name='person-circle-sharp' size={24} color='#a63932' />
          }
        />
        <MoreComp
          onPress={() => router.push('/Reward')}
          name={'Rewards & Wallet'}
          icon={<Fontisto name='wallet' size={24} color='#a63932' />}
        />
        <MoreComp
          onPress={() => router.push('/BONami')}
          name={'Loyalty Programme'}
          icon={<FontAwesome6 name='thumbs-up' size={24} color='#a63932' />}
        />
        <MoreComp
          onPress={() => router.push('/Bookings')}
          name={'Saved'}
          icon={<AntDesign name='hearto' size={24} color='#a63932' />}
        />
        <MoreComp
          onPress={() => router.push('/Reviews')}
          name={'Reviews'}
          icon={<FontAwesome6 name='thumbs-up' size={24} color='#a63932' />}
        />
        <MoreComp
          onPress={() => router.push('/Questions')}
          name={'FAQs'}
          icon={<FontAwesome6 name='question' size={24} color='#a63932' />}
        />
        <MoreComp
          onPress={() => router.push('/CustomerService')}
          name={'Contact Customer Service'}
          icon={
            <MaterialCommunityIcons
              name='account-question-outline'
              size={24}
              color='#a63932'
            />
          }
        />
        <MoreComp
          onPress={() => router.push('/ResourceCentre')}
          name={'Safety Resource Centre'}
          icon={<AntDesign name='Safety' size={24} color='#a63932' />}
        />
        <MoreComp
          onPress={() => router.push('/Deals')}
          name={'Deals'}
          icon={<Ionicons name='contract' size={24} color='#a63932' />}
        />
        <MoreComp
          onPress={() => router.push('/Settings')}
          name={'Settings'}
          icon={<Ionicons name='settings-outline' size={24} color='#a63932' />}
        />

        {/* Logout */}
        <View style={styles.bottom}>
          <Text
            style={styles.logoutText}
            onPress={async () => {
              try {
                await AsyncStorage.removeItem('token')
                router.replace('/registration/Login')
              } catch (error) {
                console.error('Logout Error:', error)
              }
            }}
          >
            Log Out
          </Text>
          <Text> V 1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  imagePicker: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    position: 'relative'
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  imageText: {
    color: '#666'
  },
  profileName: {
    fontSize: 28,
    color: '#a63932',
    fontWeight: 'bold'
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  ratingText: {
    marginLeft: 5,
    color: '#a63932',
    fontSize: 16
  },
  quickAccess: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20
  },
  accessButton: {
    alignItems: 'center'
  },
  cardText: {
    marginTop: 5,
    color: '#a63932'
  },
  scrollContent: {
    paddingBottom: 40
  },
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15
  },
  cardTitle: {
    fontSize: 15,
    color: '#a63932',
    fontWeight: 'bold'
  },
  settingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15
  },
  settingText: {
    marginLeft: 15,
    fontSize: 16
  },
  logoutText: {
    textAlign: 'center',
    color: 'red',
    fontSize: 19,
    marginVertical: 20
  },
  bottom: {
    paddingBottom: 100
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 100,
    height: 100,
    backgroundColor: 'rgba(255,255,255,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50
  }
})
