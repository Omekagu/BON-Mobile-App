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
import { SafeAreaView } from 'react-native-safe-area-context'

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
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Please allow access to the media library.'
        )
        return
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
        base64: true,
        selectionLimit: 1
      })

      if (!result.canceled) {
        setImageUri(result.assets?.[0]?.uri ?? null)
        const base64Img = `data:image/jpg;base64,${result.assets[0].base64}`
        let formData = new FormData()
        formData.append('file', base64Img)
        formData.append('upload_preset', UPLOAD_PRESET)

        const uploadResponse = await axios.post(
          CLOUDINARY_UPLOAD_URL,
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' }
          }
        )
        const imageUrl = uploadResponse.data.secure_url
        await updateProfileImage(imageUrl)
      } else {
        ;<ActivityIndicator />
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
      await axios.get('http:/10.0.1.27:5001/auth/usertoken', {
        headers: { Authorization: `Bearer ${token}` }
      })
      return parsedData.userId
    } catch (error) {
      console.error('Error retrieving user ID:', error)
      return null
    }
  }

  const updateProfileImage = async imageUrl => {
    try {
      setUploading(true)
      const userId = await getUserId()
      if (!userId) {
        Alert.alert('Error', 'User not found')
        return
      }
      const response = await axios.post(
        'http:/10.0.1.27:5001/auth/update-profile-image',
        { userId, profileImage: imageUrl }
      )
      Alert.alert('Success', 'Profile image updated successfully')
      setUser(prev => ({ ...prev, profileImage: imageUrl }))
    } catch (error) {
      console.error('Error updating profile image:', error)
      Alert.alert('Error', 'Failed to update profile image')
    } finally {
      setUploading(false)
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = await getUserId()
        const response = await axios.get(
          `http:/10.0.1.27:5001/user/user/${userId}`
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
    <SafeAreaView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <TouchableOpacity
          style={styles.imagePicker}
          // Allow change if not uploading
          onPress={() => {
            if (user?.profileImage) {
              Alert.alert('Image Set', 'Your profile image is already set.')
            } else if (!upLoading) {
              pickImage()
            }
          }}
          activeOpacity={0.9}
        >
          {user?.profileImage ? (
            <Image
              source={{ uri: user.profileImage }}
              style={styles.profileImage}
            />
          ) : imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.profileImage} />
          ) : (
            <Ionicons name='camera' size={44} color='#b5a1a1' />
          )}
          {upLoading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size='large' color='#a63932' />
            </View>
          )}
        </TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 18 }}>
          <Text style={styles.profileName}>
            Hello, {user?.firstname || 'User'}.
          </Text>
          <View style={styles.ratingContainer}>
            <AntDesign name='star' size={18} color='#fbc02d' />
            <Text style={styles.ratingText}>Tier 1</Text>
          </View>
        </View>
      </View>

      {/* Quick Access Buttons */}
      <View style={styles.quickAccess}>
        <TouchableOpacity style={styles.accessButton}>
          <Ionicons name='help-circle' size={28} color='#000' />
          <Text style={styles.cardText}>Help</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.accessButton}
          onPress={() => router.push('/Wallet')}
        >
          <Fontisto name='wallet' size={28} color='#000' />
          <Text style={styles.cardText}>Wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.accessButton}>
          <Ionicons name='time-outline' size={28} color='#000' />
          <Text style={styles.cardText}>Activity</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Checkups Section */}
        <View style={styles.cardRow}>
          <View style={styles.card}>
            <AntDesign
              name='Safety'
              size={20}
              color='#000'
              style={styles.cardIcon}
            />
            <Text style={styles.cardTitle}>Safety Checkup</Text>
            <Text style={styles.cardText}>
              Learn ways to make booking safer
            </Text>
          </View>
          <View style={styles.card}>
            <MaterialCommunityIcons
              name='shield-account'
              size={20}
              color='#000'
              style={styles.cardIcon}
            />
            <Text style={styles.cardTitle}>Privacy Checkup</Text>
            <Text style={styles.cardText}>
              Take a tour of your privacy settings
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.card,
            { alignSelf: 'center', width: '90%', marginVertical: 12 }
          ]}
        >
          <FontAwesome6
            name='sack-dollar'
            size={22}
            color='#000'
            style={styles.cardIcon}
          />
          <Text style={styles.cardTitle}>Estimated Cost Saved</Text>
          <Text style={styles.cardText}>₦1000</Text>
        </View>

        {/* Settings Section */}
        <MoreComp
          onPress={() => router.push('/Profile')}
          name={'Manage Profile'}
          icon={<Ionicons name='person-circle-sharp' size={24} color='#000' />}
        />
        <MoreComp
          onPress={() => router.push('/Reward')}
          name={'Rewards & Wallet'}
          icon={<Fontisto name='wallet' size={24} color='#000' />}
        />
        <MoreComp
          onPress={() => router.push('/BONami')}
          name={'Loyalty Programme'}
          icon={<FontAwesome6 name='thumbs-up' size={24} color='#000' />}
        />
        <MoreComp
          onPress={() => router.push('/Bookings')}
          name={'Saved'}
          icon={<AntDesign name='hearto' size={24} color='#000' />}
        />
        <MoreComp
          onPress={() => router.push('/Reviews')}
          name={'Reviews'}
          icon={<FontAwesome6 name='thumbs-up' size={24} color='#000' />}
        />
        <MoreComp
          onPress={() => router.push('/Questions')}
          name={'FAQs'}
          icon={<FontAwesome6 name='question' size={24} color='#000' />}
        />
        <MoreComp
          onPress={() => router.push('/CustomerService')}
          name={'Contact Customer Service'}
          icon={
            <MaterialCommunityIcons
              name='account-question-outline'
              size={24}
              color='#000'
            />
          }
        />
        <MoreComp
          onPress={() => router.push('/ResourceCentre')}
          name={'Safety Resource Centre'}
          icon={<AntDesign name='Safety' size={24} color='#000' />}
        />
        <MoreComp
          onPress={() => router.push('/Deals')}
          name={'Deals'}
          icon={<Ionicons name='contract' size={24} color='#000' />}
        />
        <MoreComp
          onPress={() => router.push('/Settings')}
          name={'Settings'}
          icon={<Ionicons name='settings-outline' size={24} color='#000' />}
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
          <Text style={styles.versionText}>V 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    paddingTop: 18,
    paddingHorizontal: 0
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    paddingHorizontal: 25,
    paddingTop: 10
  },
  imagePicker: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 2,
    borderColor: '#e7e2f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8
  },
  profileImage: {
    width: 92,
    height: 92,
    borderRadius: 46
  },
  profileName: {
    fontSize: 25,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 3
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  ratingText: {
    marginLeft: 7,
    color: '#000',
    fontSize: 16
  },
  quickAccess: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
    marginTop: 3
  },
  accessButton: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 13,
    width: 87,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6
  },
  cardText: {
    marginTop: 8,
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center'
  },
  scrollContent: {
    paddingBottom: 40,
    paddingHorizontal: 12
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    marginTop: 3
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 13,
    padding: 18,
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    alignItems: 'center'
  },
  cardIcon: {
    marginBottom: 6
  },
  cardTitle: {
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 2
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
    color: '#ff3b30',
    fontSize: 19,
    marginVertical: 18,
    fontWeight: 'bold'
  },
  versionText: {
    textAlign: 'center',
    color: '#b3a0cf',
    fontSize: 13,
    marginBottom: 18
  },
  bottom: {
    paddingBottom: 70,
    paddingTop: 10
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 92,
    height: 92,
    backgroundColor: 'rgba(255,255,255,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 46
  }
})
