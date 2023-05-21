import React from 'react';
import {Button, Center, Image, VStack} from 'native-base';
import {observer} from 'mobx-react-lite';
import {bg, swiggy, uber} from '../assets/images';
import AppText from '../components/AppText';
import {TouchableOpacity} from 'react-native';

const HomeScreen = ({navigation}) => {
  const Tab = ({name, onPress, ...other}) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <Center bg={'rgba(52, 52, 52, 0.5)'} rounded={8} h={120} m={4}>
          {name === 'Uber' ? (
            <Image
              source={uber}
              size={'md'}
              w={150}
              h={53}
              p={'2'}
              alt="logo"
            />
          ) : (
            <Image
              source={swiggy}
              size={'md'}
              w={200}
              h={35}
              p={'2'}
              alt="logo"
            />
          )}
        </Center>
      </TouchableOpacity>
    );
  };
  return (
    <Center flex={1}>
      <Image alt={'bg'} position={'absolute'} source={bg} />

      <VStack w={'full'} my={20} flex={1 / 2}>
        <Tab onPress={() => navigation.navigate('UberForm')} name={'Uber'} />
        <Tab
          onPress={() => navigation.navigate('SwiggyForm')}
          name={'Swiggy'}
          color={'#F57518'}
        />
      </VStack>
    </Center>
  );
};

export default observer(HomeScreen);
