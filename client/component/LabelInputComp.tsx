import { View, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import React from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function LabelInputComp({ placeholder, label, Value,onchangeText }) {
  return (
    <KeyboardAvoidingView>
      <View>
        <Text
          style={{
            fontSize: 15,
            textTransform: 'capitalize',
            fontWeight: '600',
            marginLeft: 15,
            marginBottom: 5,
          }}
        >
          {label}
        </Text>
        <TextInput
          placeholderTextColor={'gray'}
          style={{
            backgroundColor: '#fff',
            height: 60,
            borderRadius: 20,
            paddingLeft: 10,
            marginBottom: 10,
          }}
          placeholder={placeholder}

          value={Value}
          onChangeText={onchangeText}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
