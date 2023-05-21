import {View, Text, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import {Button, HStack, Input, Switch, VStack} from 'native-base';
import AppText from '../components/AppText';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export const Heading = ({name}) => {
  return (
    <AppText mt={4} fontSize={20} fontWeight={600}>
      {name}
    </AppText>
  );
};

const UberForm = () => {
  const [isToDatePickerVisible, setisToDatePickerVisible] = useState(false);
  return (
    <SafeAreaView style={{flex: 1}}>
      <VStack space={2} flex={1} px={'4'}>
        <Heading name={'Enter details below'} />

        <Heading name={'1. Rider Name'} />
        <HStack alignSelf={'center'} alignItems={'center'}>
          <AppText>Random</AppText>
          <Switch size="sm" />
        </HStack>
        <AppText textAlign={'center'}>or</AppText>
        <Input placeholder="Enter rider name" fontSize={16} />

        <Heading name={'2. Choose Date'} />
        <Button onPress={()=>setisToDatePickerVisible(true)}>Open</Button>
        <DateTimePickerModal
          isVisible={isToDatePickerVisible}
          mode="date"
          onConfirm={() => setisToDatePickerVisible(false)}
          onCancel={() => setisToDatePickerVisible(false)}
        />
      </VStack>
    </SafeAreaView>
  );
};

export default UberForm;
