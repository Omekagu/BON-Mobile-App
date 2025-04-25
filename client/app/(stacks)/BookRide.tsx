import React, { useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
  FlatList,
  Image
} from 'react-native'
import MapView, { Marker, Polyline } from 'react-native-maps'
import io from 'socket.io-client'
import * as Location from 'expo-location'
import { router } from 'expo-router'
import Icon from 'react-native-vector-icons/Ionicons'

// Connect to your Node.js server
const socket = io('http://10.0.1.8:5001')

export default function BookRide () {
  const [userLocation, setUserLocation] = useState(null)
  const [deliveryLocation, setDeliveryLocation] = useState({
    latitude: 6.5244,
    longitude: 3.3792
  })
  const [routeCoords, setRouteCoords] = useState([])
  const [rideOptions, setRideOptions] = useState([])
  const [selectedRide, setSelectedRide] = useState(null)

  useEffect(() => {
    ;(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Location access is required for tracking.'
        )
        return
      }

      Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 10 },
        currentLocation => {
          const { latitude, longitude } = currentLocation.coords
          setUserLocation({ latitude, longitude })
          socket.emit('userLocation', { latitude, longitude })
        }
      )
    })()

    socket.on('deliveryLocation', location => {
      setDeliveryLocation(location)
    })

    // Dummy fetch for ride options
    fetchRideOptions()

    return () => {
      socket.off('deliveryLocation')
    }
  }, [])

  const fetchRideOptions = () => {
    const dummyOptions = [
      {
        type: 'Comfort',
        price: '₦16,770',
        eta: '10:06 AM',
        arrivalIn: '16 min',
        icon: '🚗'
      },
      {
        type: 'VVIP',
        price: '₦12,830',
        eta: '9:57 AM',
        arrivalIn: '6 min',
        icon: '🚕'
      },
      {
        type: 'Priority',
        price: '₦13,540',
        eta: '9:56 AM',
        arrivalIn: '3 min',
        faster: true,
        icon: '🚙'
      }
    ]
    setRideOptions(dummyOptions)
  }

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Icon name='arrow-back' size={24} color='white' />
      </TouchableOpacity>

      {/* Map View */}
      <MapView
        style={styles.map}
        showsUserLocation={true}
        initialRegion={{
          latitude: userLocation ? userLocation.latitude : 6.5244,
          longitude: userLocation ? userLocation.longitude : 3.3792,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1
        }}
      >
        {userLocation && (
          <Marker coordinate={userLocation} title='You' pinColor='blue' />
        )}
        {deliveryLocation && (
          <Marker
            coordinate={deliveryLocation}
            title='Destination'
            pinColor='red'
          />
        )}
        {userLocation && deliveryLocation && (
          <Polyline
            coordinates={[userLocation, deliveryLocation]}
            strokeColor='#1E90FF'
            strokeWidth={4}
          />
        )}
      </MapView>

      {/* Ride Options Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Choose a trip</Text>
        <FlatList
          data={rideOptions}
          keyExtractor={item => item.type}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.rideOption,
                selectedRide === item.type && styles.selectedRide
              ]}
              onPress={() => setSelectedRide(item.type)}
            >
              <Text style={styles.rideIcon}>{item.icon}</Text>
              <View style={styles.rideInfo}>
                <Text style={styles.rideType}>{item.type}</Text>
                <Text style={styles.rideDetails}>
                  {item.eta} · {item.arrivalIn} ·{' '}
                </Text>
              </View>
              <Text style={styles.price}>{item.price}</Text>
            </TouchableOpacity>
          )}
        />

        {/* Payment Method Section */}
        <TouchableOpacity style={styles.paymentMethod}>
          <Icon name='wallet' size={20} color='black' />
          <Text style={styles.paymentText}>Personal - Cash</Text>
        </TouchableOpacity>

        {/* Book Button */}
        <TouchableOpacity style={styles.bookButton} disabled={!selectedRide}>
          <Text style={styles.bookText}>
            {selectedRide ? `Choose ${selectedRide}` : 'Select a Ride'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    backgroundColor: '#6A5ACD',
    padding: 10,
    borderRadius: 50
  },
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    width: '100%',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  infoText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  rideOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f0f0f0',
    marginVertical: 5,
    borderRadius: 10
  },
  selectedRide: {
    borderWidth: 2,
    borderColor: '#6A5ACD'
  },
  rideIcon: {
    fontSize: 30,
    marginRight: 15
  },
  rideInfo: {
    flex: 1
  },
  rideType: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  rideDetails: {
    fontSize: 14,
    marginTop: 5
  },
  fasterTag: {
    fontSize: 12,
    color: '#1E90FF'
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 10
  },
  paymentText: {
    marginLeft: 10,
    fontSize: 16
  },
  bookButton: {
    backgroundColor: '#6A5ACD',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 15
  },
  bookText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  price: {
    fontSize: 18,
    fontWeight: '700'
  }
})
