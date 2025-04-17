import React from 'react'
import EvilIcons from '@expo/vector-icons/EvilIcons'
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native'

const SuggestionBox = ({
  name,
  price,
  available,
  location,
  image,
  reviews,
  onPress
}) => {
  const availabilityColor = available < 2 ? 'red' : 'green'
  const availabilityText =
    available < 2
      ? `${available} Left – Act Fast!`
      : `${available} Units Available`

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: '100%',
        marginBottom: 30,
        borderRadius: 20,
        backgroundColor: '#fff',
        ...Platform.select({
          ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.15,
            shadowRadius: 6
          },
          android: {
            elevation: 6
          }
        })
      }}
    >
      <Image
        source={{ uri: image }}
        style={{
          width: '100%',
          height: 220,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20
        }}
      />
      <View
        style={{
          padding: 15,
          gap: 8
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: '700' }}>{name}</Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Text style={{ color: availabilityColor, fontSize: 13 }}>
            {availabilityText}
          </Text>
          <Text style={{ fontWeight: '600', fontSize: 13, color: '#555' }}>
            {reviews}K Reviews
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <EvilIcons name='location' size={20} color='gray' />
            <Text style={{ fontWeight: '600', fontSize: 13, color: '#333' }}>
              {location}
            </Text>
          </View>
          <Text
            style={{
              fontWeight: '900',
              fontSize: 16,
              color: '#000'
            }}
          >
            ₦{price}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default SuggestionBox
