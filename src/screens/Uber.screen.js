import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Box,
  Center,
  Divider,
  HStack,
  Icon,
  Image,
  ScrollView,
  Spacer,
  VStack,
} from 'native-base';
import AppText from '../components/AppText';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {map, user} from '../assets/images';
import {getRandomInt} from './Swiggy.screen';
import {names} from '../utils/IndianNames';

export const getRandomName = () => {
  let randomName = `${names[Math.floor(Math.random() * names.length)].name}`;
  const words = randomName.split(' ');
  return words
    .map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
};

const UberScreen = ({navigation, route}) => {
  //varies
  const driver =
    route?.params?.driver === 'random'
      ? getRandomName()
      : route?.params?.driver;

  const details = {
    date: route?.params?.date,
    time: route?.params?.time,
  };

  //fixed
  const office = route?.params?.office.length
    ? route?.params?.office
    : `22, Star Mall, NH8, Block A, Sector 30,\nGurugram, Haryana 122001, India`;
  const home = route?.params?.home.length
    ? route?.params?.home
    : `554, Jal Vihar Colony, Sector 46,\nGurugramm, Haryana 122001, India`;
  const fare = route?.params?.fare.length
    ? Number(route?.params?.fare)
    : getRandomInt(85, 99);

  const Header = () => {
    return (
      <HStack
        justifyContent={'center'}
        px={'4'}
        w={'full'}
        alignItems={'center'}>
        <Icon
          onPress={() => navigation.goBack()}
          position={'absolute'}
          left={15}
          as={IonIcons}
          name="arrow-back"
          size={'8'}
          color={'black'}
        />

        <AppText fontSize={20}>Trip Details</AppText>
      </HStack>
    );
  };

  return (
    <SafeAreaView
      edges={['left', 'right', 'top']}
      style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
      <ScrollView
        px={1}
        w={'full'}
        showsVerticalScrollIndicator={false}
        flex={1}>
        <Header navigation={navigation} />

        <Image alt={'map'} my={1} w={'full'} h={150} source={map} />

        <HStack my={1} mx={'4'}>
          <VStack>
            <AppText fontWeight={600} fontSize={24} mb={2} pr={4}>
              {`Uber Auto trip with\n${driver}`}
            </AppText>
            <AppText fontSize={15} fontWeight={400}>
              {`${details.date} ${details.time}`}
            </AppText>
            <AppText mt={0.5} fontSize={15} fontWeight={400}>
              {`₹${fare}.00`}
            </AppText>
          </VStack>
          <Spacer />
          <Image alt={'map'} w={20} h={20} source={user} />
        </HStack>

        <HStack
          my={1.5}
          alignSelf={'flex-start'}
          bg={'gray.200'}
          p={3.5}
          px={4}
          mx={4}
          justifyContent={'center'}
          alignItems={'center'}
          space={1.5}
          mb={4}
          rounded={'full'}>
          <Icon as={IonIcons} name="receipt" size={'6'} color={'black'} />

          <AppText fontSize={18}>Receipt</AppText>
        </HStack>

        <HStack
          space={2}
          w={'full'}
          alignItems={'center'}
          my={1}
          mb={3}
          px={'4'}>
          <Icon
            mr={3}
            ml={1}
            as={MaterialIcons}
            name="circle"
            size={'4'}
            color={'black'}
          />

          <AppText fontSize={15} fontWeight={400}>
            {office}
          </AppText>
        </HStack>

        <HStack space={2} w={'full'} alignItems={'center'} my={1} px={'4'}>
          <Icon
            mr={3}
            ml={1}
            as={MaterialCommunityIcons}
            name="square"
            size={'4'}
            color={'black'}
          />

          <AppText fontSize={15} fontWeight={400}>
            {home}
          </AppText>
        </HStack>

        <Divider my={3} ml={'1/5'} />

        <HStack px={'4'} alignItems={'center'}>
          <Icon
            as={MaterialCommunityIcons}
            name="hand-coin"
            size={'7'}
            color={'black'}
            mr={3}
          />
          <AppText fontSize={18}>No tip added</AppText>
          <Spacer />

          <Center rounded={'full'} px={4} py={1.5} bg={'gray.200'}>
            <AppText fontSize={16}>Add Tip</AppText>
          </Center>
        </HStack>

        <Divider my={3} ml={'1/5'} />

        <HStack px={'4'} alignItems={'center'}>
          <Icon
            as={MaterialCommunityIcons}
            name="star"
            size={'7'}
            color={'black'}
            mr={3}
          />
          <AppText fontSize={18}>No rating</AppText>
          <Spacer />

          <Center rounded={'full'} px={4} py={1.5} bg={'gray.200'}>
            <AppText fontSize={16}>Rate</AppText>
          </Center>
        </HStack>

        <Divider my={3} ml={'1/5'} />

        <HStack px={'4'} alignItems={'center'}>
          <Icon
            as={MaterialCommunityIcons}
            name="home-lock"
            size={'7'}
            color={'black'}
            mr={3}
          />
          <VStack>
            <AppText fontSize={18}>View what your driver sees</AppText>
            <AppText fontWeight={400} mt={0.5}>
              {`After your trip, the driver can't\nsee your pick-up or drop-off address\ndetails`}
            </AppText>
          </VStack>
          <Spacer />

          <Icon as={IonIcons} name="md-chevron-forward-outline" size={8} />
        </HStack>

        <Divider my={3} py={1.5} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default UberScreen;
