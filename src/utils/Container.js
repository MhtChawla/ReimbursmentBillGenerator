import {ScrollView, VStack} from 'native-base';
import React from 'react';
import {KeyboardAvoidingView, Platform, SafeAreaView} from 'react-native';

const Container = ({children}) => {
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView
          showsVerticalScrollIndicator={'false'}
          keyboardShouldPersistTaps="handled">
          <VStack space={2} py={'4'} flex={1} px={'4'}>
            {children}
          </VStack>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Container;
