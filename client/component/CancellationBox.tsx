import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated
} from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useRouter } from 'expo-router'
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler'
import axios from 'axios'

export default function CancellationBox ({
  id, // Added ID to track the booking
  city,
  date,
  name,
  type,
  datePrice,
  image,
  color,
  onDelete, // Function to remove item from state after deletion
  onPress,
  onPrintReceipt // Function to print the receipt
}) {
  const router = useRouter()

  const handleDelete = async () => {
    try {
      await axios.delete(`http://10.0.1.20:5001/hotel/delete-bookings/${id}`)
      onDelete(id) // Remove item from state after successful deletion
    } catch (error) {
      console.error('Failed to delete booking:', error)
    }
  }

  const renderRightAction = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    })

    return (
      <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
        <Animated.Text style={[styles.deleteText, { transform: [{ scale }] }]}>
          Delete
        </Animated.Text>
      </TouchableOpacity>
    )
  }

  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={renderRightAction}>
        <TouchableOpacity onPress={onPress}>
          <View style={styles.container}>
            <Text style={styles.date}>{date}</Text>

            <View style={styles.content}>
              <Image style={styles.image} source={{ uri: image }} />
              <View style={{ gap: 5 }}>
                <Text style={styles.name}>{name}</Text>
                <Text>{datePrice}</Text>
                <Text style={[{ color: color, fontWeight: '500' }]}>
                  {type}
                </Text>

                {/* Show Print Receipt Button ONLY for Completed Bookings */}
                {type.toLowerCase() === 'completed' && (
                  <TouchableOpacity
                    style={styles.printButton}
                    onPress={onPrintReceipt}
                  >
                    <Text style={styles.printButtonText}>Print Receipt</Text>
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.arrowIcon}>
                <MaterialIcons name='arrow-right-alt' size={30} color='black' />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    gap: 5
  },
  date: {
    fontWeight: '500',
    fontSize: 12
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 5
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10
  },
  name: {
    fontWeight: '700'
  },
  printButton: {
    marginTop: 5,
    backgroundColor: '#28a745',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  printButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold'
  },
  arrowIcon: {
    marginLeft: 'auto'
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    borderRadius: 5,
    marginVertical: 5
  },
  deleteText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
})
