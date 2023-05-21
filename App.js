import 'react-native-gesture-handler'; //remember to always import this
import React from 'react';
import {Box, NativeBaseProvider, Text} from 'native-base';
import Toast from 'react-native-toast-message';
import InternetConnectionAlert from 'react-native-internet-connection-alert';
import {dismiss} from './src/assets/images';
import Loader from './src/components/Loader';
import store from './src/store';
import {observer} from 'mobx-react-lite';
import HomeScreen from './src/screens/Home.screen';
import RootNavigation from './src/navigation/RootNavigation';

// Don't forget to add your App name in './src/utils/config.js'

const App = () => {
  return (
    <InternetConnectionAlert
      errorImageSrc=""
      errorColor="#E44937"
      title=""
      tapToCloseEnabled={true}
      showCancel
      cancelBtnImageSrc={dismiss}
      cancelBtnImageStyle={{
        height: 13,
        width: '100%',
      }}
      cancelBtnStyle={{
        justifyContent: 'flex-end',
        marginRight: 18,
        marginBottom: 10,
        width: 45,
      }}
      message="We can't reach our network right now. Please check your internet connection.">
      <NativeBaseProvider>
        <RootNavigation />
        <Loader isLoading={store.loader} />
        <Toast />
      </NativeBaseProvider>
    </InternetConnectionAlert>
  );
};

export default observer(App);
