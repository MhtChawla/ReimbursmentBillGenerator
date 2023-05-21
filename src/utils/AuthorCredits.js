import {Linking, TouchableOpacity} from 'react-native';
import React from 'react';
import {HStack, Image, VStack} from 'native-base';
import AppText from '../components/AppText';
import {git, heart} from '../assets/images';

const AuthorCredits = ({...other}) => {
  return (
    <VStack space={1} my={2} alignItems={'center'} {...other}>
      <HStack mt={'auto'} space={1.5} alignItems={'center'}>
        <AppText color={'white'}>{'Made with'}</AppText>
        <Image alt="smile" source={heart} h={19} w={19} />
      </HStack>

      <TouchableOpacity
        onPress={() => Linking.openURL('https://github.com/MhtChawla/')}>
        <HStack
          p={2}
          rounded={6}
          bg={'rgba(52, 52, 52, 0.5)'}
          space={1.5}
          alignItems={'center'}>
          <Image alt="smile" source={git} h={19} w={19} />
          <AppText color={'white'}>{'Mohit Chawla'}</AppText>
        </HStack>
      </TouchableOpacity>
    </VStack>
  );
};

export default AuthorCredits;
