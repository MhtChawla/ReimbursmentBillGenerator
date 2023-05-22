import React, {useCallback} from 'react';
import {
  Box,
  Center,
  HStack,
  Image,
  Pressable,
  Spacer,
  VStack,
} from 'native-base';
import {observer} from 'mobx-react-lite';
import {smile} from '../assets/images';
import AppText from '../components/AppText';
import {Dimensions} from 'react-native';
import AuthorCredits from '../utils/AuthorCredits';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const HomeScreen = ({navigation}) => {
  const ScreenWidth = Dimensions.get('window').width;

  const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };

  const vibrateBitch = useCallback(() => {
    ReactNativeHapticFeedback.trigger('impactLight');
  }, []);

  const Tab = ({name, onPress, ...other}) => {
    const size = ScreenWidth * 0.4;

    return (
      <Pressable onPress={onPress}>
        {({isHovered, isFocused, isPressed}) => {
          return (
            <Center
              bg={
                isPressed
                  ? 'rgba(52, 52, 52, 0.7)'
                  : isHovered
                  ? 'rgba(52, 52, 52, 0.7)'
                  : 'rgba(52, 52, 52, 0.5)'
              }
              style={{
                transform: [
                  {
                    scale: isPressed ? 0.98 : 1,
                  },
                ],
              }}
              rounded={8}
              borderWidth={0.2}
              borderColor={'white'}
              h={size}
              w={size}>
              <AppText fontSize={18} color={'white'} {...other}>
                {name}
              </AppText>
            </Center>
          );
        }}
      </Pressable>
    );
  };

  return (
    <Box
      safeArea
      justifyContent={'center'}
      alignItems={'center'}
      flex={1}
      bg={'black'}>
      <Spacer />

      <VStack alignItems={'center'}>
        <HStack space={1.5} alignItems={'center'}>
          <AppText fontSize={20} color={'white'}>
            {'Choose one'}
          </AppText>
          <Image alt="smile" source={smile} h={21} w={21} />
        </HStack>

        <HStack
          my={20}
          w={'full'}
          px={'4'}
          justifyContent={'space-evenly'}
          alignItems={'center'}>
          <Tab
            onPress={() => {
              ReactNativeHapticFeedback.trigger('impactLight', options);
              navigation.navigate('UberForm');
            }}
            name="UBER"
          />
          <Tab
            onPress={() => {
              ReactNativeHapticFeedback.trigger('impactLight', options);
              navigation.navigate('SwiggyForm');
            }}
            name="SWIGGY"
          />
        </HStack>
      </VStack>

      <Spacer />

      <AuthorCredits />
    </Box>
  );
};

export default observer(HomeScreen);
