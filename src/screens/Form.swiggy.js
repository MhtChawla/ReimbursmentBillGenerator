import React, {useState} from 'react';
import Container from '../utils/Container';
import AppText from '../components/AppText';
import {FormHeader, Heading} from './Form.uber';
import {Button, HStack, Input, Spacer, Switch, VStack} from 'native-base';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {TouchableOpacity} from 'react-native';
import {getRandomName} from './Uber.screen';

const SwiggyForm = ({navigation}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  //values to pass
  const [randomRider, setRandomRider] = useState(false);
  const [riderName, setRiderName] = useState('');
  const [advanceMode, setAdvanceMode] = useState(false);

  const [date, setDate] = useState('');

  const [time, setTime] = useState('');

  const [outlet, setOutlet] = useState({
    name: '',
    location: '',
  });

  const [items, setItems] = useState([
    {
      id: 1,
      name: '',
      pc: '',
      price: '',
    },
  ]);

  const [myLocationName, setmyLocationName] = useState('');
  const [myLocationAddress, setmyLocationAddress] = useState('');

  const mandatoryFieldsFilled = () => {
    let a = true;
    for (let i = 0; i < items?.length; i++) {
      if (items[i]?.name?.length > 0 && items[i]?.price > 0) {
        a = true;
      } else {
        a = false;
        break;
      }
    }
    let result =
      (randomRider || riderName?.length) &&
      time?.length &&
      date?.length &&
      outlet?.name?.length &&
      outlet?.location?.length &&
      a
        ? true
        : false;

    return result;
  };

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
          setDate(moment(v).format('DD MMM'));
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
          setTime(moment(v).format('hh:mm A'));
          setShowTimePicker(false);
        }}
        onCancel={() => setShowTimePicker(false)}
      />

      <Heading name={'4. Outlet Name'} />
      <HStack alignItems={'center'} justifyContent={'space-around'}>
        <Input
          value={outlet.name}
          onChangeText={val => {
            setOutlet({
              name: val,
              location: outlet.location,
            });
          }}
          placeholder="Restro"
          fontSize={16}
          w={'48%'}
        />

        <Input
          value={outlet.location}
          onChangeText={val => {
            setOutlet({
              name: outlet.name,
              location: val,
            });
          }}
          placeholder="Location"
          fontSize={16}
          w={'48%'}
        />
      </HStack>

      <HStack mt={4} alignItems={'center'}>
        <Heading mt={0} name={'5. Items'} />
        <Spacer />
        <TouchableOpacity
          onPress={() =>
            setItems(v => [
              ...v,
              {
                id: v.length + 1,
                name: '',
                pc: '',
                price: '',
              },
            ])
          }>
          <AppText fontSize={15}>{'+ add item'}</AppText>
        </TouchableOpacity>
      </HStack>

      {items?.map(v => {
        return (
          <VStack space={2} key={v?.id}>
            <AppText
              alignSelf={'center'}
              fontSize={15}>{`Item ${v.id}`}</AppText>
            <Input
              value={v?.name}
              onChangeText={val =>
                setItems(item => {
                  let arr = [...item];
                  (arr[arr.findIndex(obj => obj.id == v?.id)].name = val),
                    setItems(arr);
                })
              }
              placeholder={'Dish Name'}
              fontSize={16}
            />

            <HStack
              mb={2}
              alignItems={'center'}
              justifyContent={'space-around'}>
              <Input
                value={v?.pc}
                onChangeText={val =>
                  setItems(item => {
                    let arr = [...item];
                    (arr[arr.findIndex(obj => obj.id == v?.id)].pc =
                      Number(val)),
                      setItems(arr);
                  })
                }
                keyboardType="number-pad"
                placeholder="Qty."
                fontSize={16}
                w={'48%'}
              />

              <Input
                value={v?.price}
                onChangeText={val =>
                  setItems(item => {
                    let arr = [...item];
                    (arr[arr.findIndex(obj => obj.id == v?.id)].price =
                      Number(val)),
                      setItems(arr);
                  })
                }
                keyboardType="number-pad"
                placeholder="Final Price"
                fontSize={16}
                w={'48%'}
              />
            </HStack>
          </VStack>
        );
      })}

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
            value={myLocationName}
            onChangeText={v => setmyLocationName(v)}
            placeholder="Home Name"
            fontSize={16}
          />
          <Input
            value={myLocationAddress}
            onChangeText={v => setmyLocationAddress(v)}
            placeholder="Home Address"
            fontSize={16}
          />
        </VStack>
      )}

      <Button
        onPress={() =>
          navigation.navigate('Swiggy', {
            outlet: outlet,
            deliveryDetails: {
              date: date,
              time: time,
              deliveryman: randomRider ? getRandomName() : riderName,
            },
            items: items,
            myLocationName: advanceMode ? myLocationName : '',
            myLocationAddress: advanceMode ? myLocationAddress : '',
          })
        }
        disabled={!mandatoryFieldsFilled()}
        bg={mandatoryFieldsFilled() ? 'danger.600' : 'gray.400'}
        mt={2}
        colorScheme={'danger'}
        _text={{fontWeight: 600, fontSize: 16}}>
        Generate Bill
      </Button>
    </Container>
  );
};

export default SwiggyForm;
