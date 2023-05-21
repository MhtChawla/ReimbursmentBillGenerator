import React, {useState} from 'react';
import {Button, HStack, Icon, Input, Spacer, Switch, VStack} from 'native-base';
import AppText from '../components/AppText';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Container from '../utils/Container';

export const Heading = ({name, mt = 4}) => {
  return (
    <AppText mt={mt} fontSize={20} fontWeight={600}>
      {name}
    </AppText>
  );
};

export const FormHeader = ({onPress}) => {
  return (
    <HStack mb={1} space={1.5} alignItems={'center'}>
      <Icon
        onPress={onPress}
        as={IonIcons}
        name="arrow-back"
        size={'7'}
        color={'black'}
      />

      <Heading mt={0} name={'Enter details below'} />
    </HStack>
  );
};

const removeOTime = v => {
  if (v.charAt(0) === '0') {
    return v.slice(1);
  } else {
    return v;
  }
};

const UberForm = ({navigation}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [advanceMode, setAdvanceMode] = useState(false);

  //values to pass
  const [randomRider, setRandomRider] = useState(false);
  const [riderName, setRiderName] = useState('');

  const [date, setDate] = useState('');

  const [time, setTime] = useState('');

  const [officeAddress, setOfficeAddress] = useState('');
  const [homeAddress, setHomeAddress] = useState('');
  const [fare, setFare] = useState(null);

  return (
    <Container>
      <FormHeader onPress={() => navigation.goBack()} />

      <HStack mt={4} alignItems={'center'}>
        <Heading name={'1. Rider Name'} mt={0} />
        <Spacer />
        <AppText fontSize={15}>Random</AppText>
        <Switch
          colorScheme={'danger'}
          value={randomRider}
          onToggle={v => setRandomRider(v)}
          size="sm"
        />
      </HStack>
      <Input
        value={riderName}
        onChangeText={v => setRiderName(v)}
        isDisabled={randomRider}
        placeholder="Enter rider name"
        fontSize={16}
      />

      <Heading name={'2. Choose Date'} />
      <Input
        showSoftInputOnFocus={false}
        value={date}
        onPressIn={() => setShowDatePicker(true)}
        placeholder="Pick Date"
        fontSize={16}
      />
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        onConfirm={v => {
          setDate(moment(v).format('MMM DD'));
          setShowDatePicker(false);
        }}
        onCancel={() => setShowDatePicker(false)}
      />

      <Heading name={'3. Choose Time'} />
      <Input
        showSoftInputOnFocus={false}
        value={time}
        onPressIn={() => setShowTimePicker(true)}
        placeholder="Pick Time"
        fontSize={16}
      />
      <DateTimePickerModal
        isVisible={showTimePicker}
        mode="time"
        onConfirm={v => {
          setTime(removeOTime(moment(v).format('hh:mmA')));
          setShowTimePicker(false);
        }}
        onCancel={() => setShowTimePicker(false)}
      />

      <HStack alignSelf={'flex-start'} alignItems={'center'}>
        <AppText fontSize={16}>Edit more details?</AppText>
        <Switch
          colorScheme={'danger'}
          value={advanceMode}
          onToggle={v => setAdvanceMode(v)}
          size="sm"
        />
      </HStack>

      {advanceMode && (
        <VStack space={2}>
          <Input
            value={officeAddress}
            onChangeText={v => setOfficeAddress(v)}
            placeholder="Office address"
            fontSize={16}
          />
          <Input
            value={homeAddress}
            onChangeText={v => setHomeAddress(v)}
            placeholder="Home address"
            fontSize={16}
          />
          <Input
            keyboardType="number-pad"
            value={fare}
            onChangeText={v => setFare(v)}
            placeholder="Fare (in Rs)"
            fontSize={16}
          />
        </VStack>
      )}

      <Button
        disabled={
          !((randomRider || riderName.length) && time.length && date.length)
        }
        bg={
          (randomRider || riderName.length) && time.length && date.length
            ? 'danger.600'
            : 'gray.400'
        }
        onPress={() =>
          navigation.navigate('Uber', {
            driver: randomRider ? 'random' : riderName,
            date: date,
            time: time,
            office: advanceMode ? officeAddress : '',
            home: advanceMode ? homeAddress : '',
            fare: advanceMode ? fare : '',
          })
        }
        mt={2}
        colorScheme={'danger'}
        _text={{fontWeight: 600, fontSize: 16}}>
        Generate Bill
      </Button>
    </Container>
  );
};

export default UberForm;
