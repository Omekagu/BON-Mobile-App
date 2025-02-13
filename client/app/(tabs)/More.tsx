import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import ProfileBox from '@/component/ProfileBox';
import MoreComp from '@/component/MoreComp';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function More() {
  const router = useRouter();
  return (
    <View>
      <ProfileBox />

      <ScrollView style={{ height: '100%' }}>
        <MoreComp
          onPress={() => router.push('/Profile')}
          name={'Manage Profile details'}
          icon={
            <Ionicons name="person-circle-sharp" size={24} color="#a63932" />
          }
        />
        <MoreComp
          onPress={() => router.push('/Reward')}
          name={'Rewards & Wallet'}
          icon={<Fontisto name="wallet" size={24} color="#a63932" />}
        />
        <MoreComp
          onPress={() => router.push('/Loyalty')}
          name={'Loyalty Programme'}
          icon={<FontAwesome6 name="thumbs-up" size={24} color="#a63932" />}
        />
        <MoreComp
          onPress={() => router.push('/Saved')}
          name={'saved'}
          icon={<AntDesign name="hearto" size={24} color="#a63932" />}
        />
        <MoreComp
          onPress={() => router.push('/Reviews')}
          name={'Reviews'}
          icon={<FontAwesome6 name="thumbs-up" size={24} color="#a63932" />}
        />
        <MoreComp
          onPress={() => router.push('/Questions')}
          name={'Questions to property'}
          icon={<FontAwesome6 name="question" size={24} color="#a63932" />}
        />

        {/* <Text>Help and Support</Text> */}
        <MoreComp
          onPress={() => router.push('/CustomerService')}
          name={'Contact Customer Service'}
          icon={
            <MaterialCommunityIcons
              name="account-question-outline"
              size={24}
              color="#a63932"
            />
          }
        />
        <MoreComp
          onPress={() => router.push('/ResourceCentre')}
          name={'Safety resource centre'}
          icon={<AntDesign name="Safety" size={24} color="#a63932" />}
        />
        {/* <Text>Discover</Text> */}
        <MoreComp
          onPress={() => router.push('/Deals')}
          name={'Deals'}
          icon={<Ionicons name="contract" size={24} color="#a63932" />}
        />

        {/* <Text>settings and legal</Text> */}
        <MoreComp
          onPress={() => router.push('/Settings')}
          name={'Settings'}
          icon={<Ionicons name="settings-outline" size={24} color="#a63932" />}
        />
        <Text
  style={{ textAlign: 'center', color: 'red', fontSize: 19 }}
  onPress={async () => {
    try {
      await AsyncStorage.removeItem("token"); // Clear the token
      router.replace("/registration/Login"); // Redirect to login page

      // Prevent user from going back
      router.setParams({});
    } catch (error) {
      console.error("Logout Error:", error);
    }
  }}
>
  Log Out
</Text>
      </ScrollView>
    </View>
  );
}
