import {Alert, Linking, Platform} from 'react-native';
import {PERMISSIONS, request, requestMultiple} from 'react-native-permissions';
import {APP_NAME} from './config';

export const requestDevicePermission = async permission_name => {
  console.log('>>>', permission_name);
  var iosPermission, androidPermission, androidMessage, iosMessage;
  permission_name == 'camera'
    ? ((androidPermission = PERMISSIONS.ANDROID.CAMERA),
      (iosPermission = PERMISSIONS.IOS.CAMERA),
      (androidMessage = 'Camera'),
      (iosMessage = 'Camera'))
    : permission_name == 'read external storage' //0
    ? ((androidPermission = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE),
      (iosPermission = PERMISSIONS.IOS.PHOTO_LIBRARY),
      ((androidMessage = 'Files and Media'), (iosMessage = 'Photos')))
    : permission_name == 'coarse location' //1 //ALWAYS ALLOW IN IOS
    ? ((androidPermission = PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION),
      (iosPermission = PERMISSIONS.IOS.LOCATION_ALWAYS),
      (androidMessage = 'Location'),
      (iosMessage = 'Location'))
    : permission_name == 'fine location' //1 //WHEN IN USE ALLOW IN IOS
    ? ((androidPermission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION),
      (iosPermission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE),
      (androidMessage = 'Location'),
      (iosMessage = 'Location'))
    : permission_name == 'answer phone calls'
    ? ((androidPermission = PERMISSIONS.ANDROID.ANSWER_PHONE_CALLS),
      (androidMessage = 'Phone'))
    : permission_name == 'call phone'
    ? ((androidPermission = PERMISSIONS.ANDROID.CALL_PHONE),
      (androidMessage = 'Phone'))
    : permission_name == 'process outgoing calls' //2
    ? ((androidPermission = PERMISSIONS.ANDROID.PROCESS_OUTGOING_CALLS),
      (androidMessage = 'Call Logs'))
    : permission_name == 'read calendar' //4
    ? ((androidPermission = PERMISSIONS.ANDROID.READ_CALENDAR),
      (iosPermission = PERMISSIONS.IOS.CALENDARS),
      (androidMessage = 'Calendar'),
      (iosMessage = 'Calendars'))
    : permission_name == 'read call logs' //2
    ? ((androidPermission = PERMISSIONS.ANDROID.READ_CALL_LOG),
      (androidMessage = 'Call Logs'))
    : permission_name == 'read contacts' //5
    ? ((androidPermission = PERMISSIONS.ANDROID.READ_CONTACTS),
      (iosPermission = PERMISSIONS.IOS.CONTACTS),
      (androidMessage = 'Contacts'),
      (iosMessage = 'Contacts'))
    : permission_name == 'read phone numbers' //5
    ? ((androidPermission = PERMISSIONS.ANDROID.READ_PHONE_NUMBERS),
      (androidMessage = 'Phone'))
    : permission_name == 'read sms' //3
    ? ((androidPermission = PERMISSIONS.ANDROID.READ_SMS),
      (androidMessage = 'SMS'))
    : permission_name == 'receive sms' //3
    ? ((androidPermission = PERMISSIONS.ANDROID.RECEIVE_SMS),
      (androidMessage = 'SMS'))
    : permission_name == 'record audio'
    ? ((androidPermission = PERMISSIONS.ANDROID.RECORD_AUDIO),
      (iosPermission = PERMISSIONS.IOS.MICROPHONE),
      (androidMessage = 'Microphone'),
      (iosMessage = 'Microphone'))
    : permission_name == 'send sms' //3
    ? ((androidPermission = PERMISSIONS.ANDROID.SEND_SMS),
      (androidMessage = 'SMS'))
    : permission_name == 'write calendar' //4
    ? ((androidPermission = PERMISSIONS.ANDROID.WRITE_CALENDAR),
      (androidMessage = 'Calendar'))
    : permission_name == 'write call log' //2
    ? ((androidPermission = PERMISSIONS.ANDROID.WRITE_CALL_LOG),
      (androidMessage = 'Call Logs'))
    : permission_name == 'write contacts' //5
    ? ((androidPermission = PERMISSIONS.ANDROID.WRITE_CONTACTS),
      (androidMessage = 'Contacts'))
    : permission_name == 'write external storage' //0
    ? ((androidPermission = PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE),
      (iosPermission = PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY),
      (androidMessage = 'Files and Media'),
      (iosMessage = 'Photos'))
    : permission_name == 'bluetooth'
    ? ((iosPermission = PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL),
      (iosMessage = 'Bluetooth'))
    : permission_name == 'faceid'
    ? ((iosPermission = PERMISSIONS.IOS.FACE_ID),
      (iosMessage = 'Face id/Touch id'))
    : permission_name == 'motion'
    ? ((iosPermission = PERMISSIONS.IOS.MOTION), (iosMessage = 'Motion'))
    : permission_name == 'reminder'
    ? ((iosPermission = PERMISSIONS.IOS.REMINDERS), (iosMessage = 'Reminders'))
    : permission_name == 'speech recogniztion'
    ? ((iosPermission = PERMISSIONS.IOS.SPEECH_RECOGNITION),
      (iosMessage = 'Speech Recognition'))
    : permission_name == 'siri'
    ? ((iosPermission = PERMISSIONS.IOS.SIRI), (iosMessage = 'Siri'))
    : permission_name == 'track'
    ? ((iosPermission = PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY),
      (iosMessage = 'Allow Tracking'))
    : null;

  if (Platform.OS == 'ios') {
    requestMultiple([iosPermission])
      .then(statuses => {
        if (statuses[iosPermission] === 'granted') {
          console.log('Permission granted!');
        } else {
          Alert.alert(
            'Permission Required',
            `Go to settings & allow ${iosM} to ${APP_NAME} app to continue`,
            [
              {
                text: 'OK',
                onPress: () => Linking.openSettings(),
              },
            ],
          );
        }
      })
      .catch(error => {
        Alert.alert(`${APP_NAME}`, 'Permissions error', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      });
  } else if (Platform.OS == 'android') {
    requestMultiple([androidPermission])
      .then(statuses => {
        if (statuses[androidPermission] === 'granted') {
          console.log('Permission granted! ->', androidPermission);
        } else {
          Alert.alert(
            'Permission Required',
            `Go to settings & allow ${androidMessage} permission to ${APP_NAME} app to continue`,
            [{text: 'OK', onPress: () => Linking.openSettings()}],
          );
        }
      })

      .catch(error => {
        Alert.alert(`${APP_NAME}`, 'Permission error', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      });
  }
};
