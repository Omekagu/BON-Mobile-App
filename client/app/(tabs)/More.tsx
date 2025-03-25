import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native'
import React, { useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign'
import Fontisto from '@expo/vector-icons/Fontisto'
import Ionicons from '@expo/vector-icons/Ionicons'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MoreComp from '@/component/MoreComp'
import * as ImagePicker from 'expo-image-picker'

export default function More () {
  const router = useRouter()

  const [imageUri, setImageUri] = useState(null)
  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      console.log('Media Library Permission Status:', status)
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!')
        return
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1
      })

      if (!result.cancelled) {
        setImageUri(result.uri)
      }
    } catch (error) {
      console.error('Error picking an image: ', error)
      alert('An error occurred while picking the image.')
    }
  }

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View>
          <Text style={styles.profileName}>Omekagu Chukwuebuka</Text>
          <View style={styles.ratingContainer}>
            <AntDesign name='star' size={16} color='#a63932' />
            <Text style={styles.ratingText}>5.00</Text>
          </View>
        </View>
        <View style={styles.avatar}>
          <TouchableOpacity onPress={pickImage}>
            <View style={styles.avatar}>
              {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.image} />
              ) : (
                <Ionicons name='person-circle' size={64} color='#ccc' />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Access Buttons */}
      <View style={styles.quickAccess}>
        <TouchableOpacity style={styles.accessButton}>
          <Ionicons name='help-circle' size={30} color='#a63932' />
          <Text style={styles.cardText}>Help</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.accessButton}>
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
          <Text style={styles.cardTitle}>Estimated CO₂ Saved</Text>
          <Text style={styles.cardText}>0g</Text>
        </View>

        {/* Settings Section */}
        <MoreComp
          onPress={() => router.push('/Profile')}
          name={'Manage Profile details'}
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
          onPress={() => router.push('/Loyalty')}
          name={'Loyalty Programme'}
          icon={<FontAwesome6 name='thumbs-up' size={24} color='#a63932' />}
        />
        <MoreComp
          onPress={() => router.push('/Saved')}
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
          name={'Questions to property'}
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
  profileSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  profileName: {
    fontSize: 24,
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

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  quickAccess: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20
  },
  accessButton: {
    alignItems: 'center',
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
  cardText: {
    marginTop: 5,
    color: '#a63932'
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
  }
})
