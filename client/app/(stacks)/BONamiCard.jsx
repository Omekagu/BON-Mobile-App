import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function BONamiCard () {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Chip Icon (Optional) */}
        <View style={styles.chip} />

        {/* Card Number */}
        <Text style={styles.cardNumber}>5418 2822 2918 3201</Text>

        {/* Cardholder & Expiry */}
        <View style={styles.cardDetails}>
          <View>
            <Text style={styles.label}>BONami Cardholder</Text>
            <Text style={styles.value}>John Doe</Text>
          </View>
          <View>
            <Text style={styles.label}>Expires</Text>
            <Text style={styles.value}>08/26</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  },
  card: {
    width: '90%',
    height: 200,
    backgroundColor: '#a63932', // Dark color for premium look
    borderRadius: 15,
    padding: 20,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5
  },
  chip: {
    width: 40,
    height: 30,
    backgroundColor: 'gold',
    borderRadius: 5
  },
  cardNumber: {
    fontSize: 22,
    color: '#fff',
    letterSpacing: 2,
    textAlign: 'center',
    marginTop: 20
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  label: {
    fontSize: 12,
    color: '#aaa'
  },
  value: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold'
  }
})
