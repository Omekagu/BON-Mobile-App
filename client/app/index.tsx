import { Link } from 'expo-router';
import React from 'react';
import { Button, SafeAreaView, Text } from 'react-native';

const index = () => {
  return (
    <SafeAreaView>
      <Text>Hello bonami</Text>

      <Link href="/registration/Login" asChild>
        <Button title="Login" />
      </Link>
    </SafeAreaView>
  );
};

export default index;
