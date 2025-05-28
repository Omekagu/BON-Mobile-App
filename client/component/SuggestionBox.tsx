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
  const availabilityColor = available < 2 ? '#FF5252' : '#34D399'
  const availabilityText =
    available < 2
      ? `${available} Left – Act Fast!`
      : `${available} Units Available`

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={{
        width: '100%',
        marginBottom: 32,
        borderRadius: 24,
        backgroundColor: '#fff',
        overflow: 'hidden',
        ...Platform.select({
          ios: {
            shadowColor: '#a63932',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.18,
            shadowRadius: 20
          },
          android: {
            elevation: 8
          }
        }),
        borderWidth: 1.5,
        borderColor: '#e7e2f9'
      }}
    >
      <Image
        source={{ uri: image }}
        style={{
          width: '100%',
          height: 200,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          backgroundColor: '#ece9f7'
        }}
        resizeMode='cover'
      />
      <View
        style={{
          padding: 18,
          gap: 10
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: '800',
            color: '#000',
            letterSpacing: 0.2
          }}
        >
          {name}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Text
            style={{
              color: availabilityColor,
              fontSize: 13,
              fontWeight: 'bold'
            }}
          >
            {availabilityText}
          </Text>
          <Text style={{ fontWeight: '600', fontSize: 13, color: '#000' }}>
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
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
            <EvilIcons name='location' size={22} color='#000' />
            <Text style={{ fontWeight: '600', fontSize: 14, color: '#000' }}>
              {location}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#f6edfa',
              paddingVertical: 7,
              paddingHorizontal: 18,
              borderRadius: 16,
              shadowColor: '#a63932',
              shadowOpacity: 0.08,
              shadowRadius: 4,
              alignItems: 'center'
            }}
          >
            <Text
              style={{
                fontWeight: '900',
                fontSize: 17,
                color: '#a63932',
                letterSpacing: 0.1
              }}
            >
              ₦{price}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default SuggestionBox
