import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Box,
  Center,
  Divider,
  HStack,
  Icon,
  Image,
  Spacer,
  VStack,
} from 'native-base';
import AppText from '../components/AppText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {places, veg} from '../assets/images';
import {Dimensions} from 'react-native';

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function amount(item) {
  return item.price;
}

function sum(prev, next) {
  return prev + next;
}

function random(numbers) {
  return numbers[Math.floor(Math.random() * numbers.length)];
}

const ScreenWidth = Dimensions.get('window').width;

const SwiggyScreen = ({navigation, route}) => {
  //varies
  const outlet = route?.params?.outlet;
  const deliveryDetails = route?.params?.deliveryDetails;
  const items = [...route?.params?.items];

  //fixed
  const orderId = getRandomInt(150000000000, 159000000000);
  const myLocationName = route?.params?.myLocationName.length
    ? route?.params?.myLocationName
    : 'Pg';
  const myLocationAddress = route?.params?.myLocationAddress.length
    ? route?.params?.myLocationAddress
    : `554, Jal vihar, Switch residency, sector 46, Gurug`;

  const appendDots = myLocationAddress?.length > 49 ? '..' : '';

  const taxes = getRandomInt(3, 14);
  const paidVia = 'Mobikwik';
  const itemTotal = items.map(amount).reduce(sum);
  const deliveryFee = getRandomInt(30, 67);
  const packingCharges = random([0, 25, 35]);
  const discount =
    Math.round(itemTotal / 2) > 120 ? 120 : Math.round(itemTotal / 2);
  const billTotal = itemTotal + packingCharges + deliveryFee + taxes - discount;

  const Header = () => {
    return (
      <HStack
        py={1}
        borderBottomWidth={1}
        borderBottomColor={'#e5e5e5'}
        px={'4'}
        w={'full'}
        alignItems={'center'}>
        <Icon
          onPress={() => navigation.goBack()}
          as={AntDesign}
          name="arrowleft"
          size={'8'}
          ml={-1}
          color={'gray.600'}
        />

        <VStack ml={4}>
          <AppText
            fontWeight={600}
            fontSize={15}>{`Order #${orderId}`}</AppText>
          <AppText
            fontWeight={400}
            fontSize={13}
            color={'gray.600'}
            mt={
              -1
            }>{`Delivered, ${items.length} items, ₹${billTotal}.00`}</AppText>
        </VStack>

        <Spacer />

        <AppText fontSize={15} fontWeight={600} color={'#DE600B'}>
          HELP
        </AppText>
      </HStack>
    );
  };
  return (
    <SafeAreaView
      edges={['left', 'right', 'top']}
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingHorizontal: 4,
      }}>
      <Header />

      <Box w={'full'}>
        <HStack
          ml={10}
          mt={5}
          px={'4'}
          alignItems={'center'}
          space={4}
          w={'full'}>
          <VStack>
            <AppText color={'#F57518'} fontSize={15} fontWeight={600}>
              {outlet.name}
            </AppText>
            <AppText
              color={'gray.600'}
              fontSize={13}
              mt={-0.5}
              fontWeight={400}>
              {outlet.location}
            </AppText>
          </VStack>
        </HStack>

        <HStack
          ml={10}
          mt={7}
          px={'4'}
          alignItems={'center'}
          space={4}
          w={'full'}>
          <VStack>
            <AppText color={'black'} fontSize={15} fontWeight={600}>
              {myLocationName}
            </AppText>
            <AppText
              pr={6}
              color={'gray.600'}
              fontSize={13}
              mt={-0.5}
              fontWeight={400}>
              {myLocationAddress.toString().slice(0, 49) + appendDots}
            </AppText>
          </VStack>
        </HStack>

        <Image
          alt="places"
          source={places}
          height={120}
          w={60}
          position={'absolute'}
          left={-4}
          top={3}
        />
      </Box>

      <Divider my={3} ml={'1/5'} />

      <HStack mb={5} mt={2} px={'4'} w={'full'}>
        <Icon as={MaterialIcons} name="check" size={'6'} color={'#3C8C30'} />
        <AppText fontWeight={400} fontSize={13} mx={4} ml={3} mr={8}>
          {`Order delivered on ${deliveryDetails.date}, 2023, ${deliveryDetails.time} by ${deliveryDetails.deliveryman}`}
        </AppText>
      </HStack>

      <Box py={4} w={ScreenWidth} bg={'gray.200'}>
        <AppText fontWeight={400} mx={4}>
          BILL DETAILS
        </AppText>
      </Box>

      <Box pt={1} px={'4'} alignItems={'center'} w={'full'}>
        {items.map(i => {
          return (
            <HStack my={1} alignItems={'center'}>
              <Image alt="veg" source={veg} size={'5'} />
              <AppText fontSize={13} ml={2}>
                {`${i.name} x ${i.pc}`}
              </AppText>
              <Spacer />
              <AppText>{`₹${i.price}.00`}</AppText>
            </HStack>
          );
        })}

        <Divider mt={1} mb={0.5} w={'100%'} />

        <HStack my={1}>
          <AppText fontSize={13} fontWeight={400}>
            Item total
          </AppText>
          <Spacer />
          <AppText fontSize={13} fontWeight={400}>
            {`₹${itemTotal}.00`}
          </AppText>
        </HStack>

        {packingCharges > 0 && (
          <HStack mb={1}>
            <AppText fontWeight={400} fontSize={13}>
              Order Packing Charges
            </AppText>
            <Spacer />
            <AppText fontWeight={400} fontSize={13}>
              {`₹${packingCharges}.00`}
            </AppText>
          </HStack>
        )}

        <HStack mb={1}>
          <AppText fontWeight={400} fontSize={13}>
            Delivery partner fee
          </AppText>
          <Spacer />
          <AppText fontWeight={400} fontSize={13}>
            {`₹${deliveryFee}.00`}
          </AppText>
        </HStack>

        <HStack mb={1}>
          <AppText
            fontWeight={400}
            fontSize={13}>{`Discount Applied (TRYNEW)`}</AppText>
          <Spacer />
          <AppText fontWeight={400} fontSize={13}>
            {`-₹${discount}.00`}
          </AppText>
        </HStack>

        <HStack mb={1}>
          <AppText fontWeight={400} fontSize={13}>
            Taxes
          </AppText>
          <Spacer />
          <AppText fontWeight={400} fontSize={13}>
            {`₹${taxes}.00`}
          </AppText>
        </HStack>

        <Divider w={'100%'} />

        <HStack my={2}>
          <AppText fontWeight={400} fontSize={13}>
            {`Paid via ${paidVia}`}
          </AppText>
          <Spacer />
          <AppText fontWeight={600} fontSize={13}>
            {`Bill Total ₹${billTotal}.00`}
          </AppText>
        </HStack>
      </Box>

      <Box flex={1} w={ScreenWidth} bg={'gray.200'} />
    </SafeAreaView>
  );
};

export default SwiggyScreen;
