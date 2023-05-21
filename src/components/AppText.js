import React from 'react';
import {Text} from 'native-base';
import {Platform} from 'react-native';
export default function AppText({
  children,
  fontWeight = 500,
  fontSize = 14,
  ...other
}) {
  return (
    <Text
      fontFamily={'body'}
      color={'black'}
      fontWeight={fontWeight}
      fontSize={fontSize}
      {...other}>
      {children}
    </Text>
  );
}
