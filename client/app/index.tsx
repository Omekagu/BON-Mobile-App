import { Link, useRouter } from 'expo-router';
import React from 'react';
import { Button, SafeAreaView, Text } from 'react-native';

const index = () => {
  const router = useRouter();
  return (
    <SafeAreaView>
      <Text>Hello bonami</Text>
      <Button
        title="Login"
        onPress={() => router.push('/registration/Login')}
      />

      <Button title="home" onPress={() => router.push('/Home')} />
    </SafeAreaView>
  );
};

export default index;
