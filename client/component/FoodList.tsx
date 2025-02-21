import { View, Image, TouchableOpacity, Platform, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import TextGreen from './TextComp/TextGreen';
import TextCaps from './TextComp/TextCaps';
import BoldText13 from './TextComp/BoldText13';
import { useRouter } from 'expo-router';
import Fontisto from '@expo/vector-icons/Fontisto';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';

interface SearchBoxProps {
  hotelname: string;
  image: string;
  review: number;
 foodname: string;
  price: number;
  time: string;
  onPress?: () => void;
}

const FoodList: React.FC<SearchBoxProps> = ({
  hotelname,
  image,
  review,
  foodname,
  time,
  price,
  onPress,
}) => {
  const router = useRouter();
  const [liked, setLiked] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState<number>(2800);

  const handleLike = async () => {
    const newLikedState = !liked;
    const newCount = newLikedState ? likesCount + 1 : likesCount - 1;

    if (newLikedState) {
      setLiked(newLikedState);
      setLikesCount(newCount);
      Toast.show({ type: 'success', text1: 'Saved to your Favourite.' });
    } else {
      Toast.show({ type: 'error', text1: 'Unsaved from Favourite.' });
      setLiked(newLikedState);
    }

    try {
      await fetch('https://your-api.com/update-likes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ liked: newLikedState, likesCount: newCount }),
      });
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#fff',
          padding: 5,
          borderRadius: 10,
          marginVertical: 5,
          // marginHorizontal: 5,
          gap:5,
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
            },
            android: { elevation: 5 },
          }),
        }}
      >
        <Image
          style={{
            width: 120,
            height: 230,
            borderRadius: 10,
            marginRight: 10,
          }}
          source={{ uri: image }}
        />

        <View style={{ justifyContent: 'space-between', width: '65%', padding: 5, }}>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <BoldText13 text={hotelname} />
              <TouchableOpacity onPress={handleLike}>
                <Fontisto name="heart" size={24} color={liked ? 'red' : 'black'} />
              </TouchableOpacity>
            </View>
                     <Text style={styles.foodname}>{foodname}</Text>
            <TextCaps text="⭐⭐⭐" />
             <View style={styles.infoBox}>
                         <Ionicons name="star-outline" size={16} />
                         <Text style={styles.infoText}>4.6 Rating</Text>
                       </View>
           <View style={styles.infoBox}>
                     <Ionicons name="chatbubbles-outline" size={16} />
                     <Text style={styles.infoText}>{review}k+ reviews</Text>
                   </View>
            {/* <Text><Ionicons name="chatbubbles-outline" size={16} />{review}k+ reviews</Text> */}
            <View style={styles.infoBox}>
                      <Ionicons name="time-outline" size={16} />
                      <Text style={styles.infoText}>{time}</Text>
                      </View>
          </View>

          <View style={{ alignItems: 'flex-end' }}>
            <TextGreen text={`₦${Number(price).toLocaleString()}`} />
            <TextCaps text="includes taxes and charges" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FoodList;

const styles = StyleSheet.create({
    infoBox: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical:3
      },
      infoText: {
        marginLeft: 5,
        fontSize: 12,
        fontWeight: 700
      },
      foodname: {
        marginTop:10,
        fontSize:17,
        fontWeight: 500,
        textDecorationLine:'underline'
      }
})
