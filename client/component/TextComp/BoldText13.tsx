import { View, Text } from 'react-native';
import React from 'react';

interface BoldText13Props {
  text: string;
}

const BoldText13: React.FC<BoldText13Props> = ({ text }) => {
  return (
    <View>
      <Text style={{ fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase' }}>
        ・{text}
      </Text>
    </View>
  );
};

export default BoldText13;
