import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import ProfileBox from '@/component/ProfileBox';
import MoreComp from '@/component/MoreComp';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function More() {
  return (
    <View>
      <ProfileBox />

      <ScrollView style={{ height: '100%' }}>
        <MoreComp
          name={'Rewards & Wallet'}
          icon={<Fontisto name="wallet" size={24} color="#a63932" />}
        />
        <MoreComp
          name={'Loyalty Programme'}
          icon={<FontAwesome6 name="thumbs-up" size={24} color="#a63932" />}
        />
        <MoreComp
          name={'saved'}
          icon={<AntDesign name="hearto" size={24} color="#a63932" />}
        />
        <MoreComp
          name={'Reviews'}
          icon={<FontAwesome6 name="thumbs-up" size={24} color="#a63932" />}
        />
        <MoreComp
          name={'Questions to property'}
          icon={<FontAwesome6 name="question" size={24} color="#a63932" />}
        />

        {/* <Text>Help and Support</Text> */}
        <MoreComp
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
          name={'Safety resource centre'}
          icon={<AntDesign name="Safety" size={24} color="#a63932" />}
        />
        {/* <Text>Discover</Text> */}
        <MoreComp
          name={'Deals'}
          icon={<Ionicons name="contract" size={24} color="#a63932" />}
        />

        {/* <Text>settings and legal</Text> */}
        <MoreComp
          name={'Settings'}
          icon={<Ionicons name="settings-outline" size={24} color="#a63932" />}
        />
        <Text style={{ textAlign: 'center', color: 'red', fontSize: 19 }}>
          Log Out
        </Text>
      </ScrollView>
    </View>
  );
}
