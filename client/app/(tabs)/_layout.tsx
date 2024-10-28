import React from 'react';
import { Tabs } from 'expo-router';
import TabBar from '@/component/TabBar';
import { Text, TouchableOpacity, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

const _layout = () => {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="Home"
        options={{
          headerStyle: {
            backgroundColor: '#a63932',
          },
          headerTintColor: '#a63932',
          title: 'Home',
          // ,
          headerTitle: () => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '900',
                  color: '#fff',
                }}
              >
                BON HOTEL
              </Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity>
              <Entypo
                name="menu"
                size={40}
                color="#fff"
                style={{ marginRight: 10 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="Bookings"
        options={{
          headerStyle: {
            backgroundColor: '#a63932',
          },
          headerTintColor: '#a63932',
          title: 'Bookings',
        }}
      />
      <Tabs.Screen
        name="Saved"
        options={{
          headerStyle: {
            backgroundColor: '#a63932',
          },
          headerTintColor: '#a63932',
          title: 'Saved',
        }}
      />
      <Tabs.Screen
        name="More"
        options={{
          headerStyle: {
            backgroundColor: '#a63932',
          },
          headerTintColor: '#a63932',
          title: 'More',
        }}
      />
      {/* <Tabs.Screen
        name="(stacks)"
        options={{
          headerStyle: {
            backgroundColor: '#a63932',
          },
          headerTintColor: '#a63932',
        }}
      /> */}
    </Tabs>
  );
};

export default _layout;
