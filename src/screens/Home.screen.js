import React from 'react';
import {Button, Center, Text} from 'native-base';
import user from '../store';
import {observer} from 'mobx-react-lite';

const HomeScreen = ({navigation}) => {
  return (
    <Center flex={1}>
      <Button
        m={2}
        _text={{fontWeight: 600, fontSize: 18}}
        onPress={() => navigation.navigate('UberForm')}>
        Uber
      </Button>

      <Button
        m={2}
        _text={{fontWeight: 600, fontSize: 18}}
        onPress={() => navigation.navigate('SwiggyForm')}>
        Swiggy
      </Button>
    </Center>
  );
};

export default observer(HomeScreen);
