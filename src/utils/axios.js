import axios from 'axios';
import Toast from 'react-native-toast-message';
import {BASE_URL} from './config';
import store from '../store';

// --------------------- IMP -------------------------------------------------
/* 
use wherever you want to use like this --->
    const xyz = async() => {
      var response = await getData('endpoint','body')
    } 
*/
// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// ----------------------------------------------------------------------
const getData = async (endPoint, data) => {
  store.setLoader(true);
  try {
    const result = await axiosInstance.get(endPoint, data);
    if (result) {
      store.setLoader(false);
      console.log('--- API Response --->', result.data); //console response of every request
      return result;
    } else {
      store.setLoader(false);
      Toast.show({type: 'error', text1: 'Something went wrong!'});
    }
  } catch (error) {
    store.setLoader(false);
    Toast.show({
      type: 'error',
      text1: error.response.data?.message || 'Something went wrong!',
    });
    console.log('--- API Error --->', error); // log any error
    throw error;
  }
};
// ----------------------------------------------------------------------
const postData = async (endPoint, data, formData = false) => {
  store.setLoader(true);
  let headers = {};
  if (formData) {
    headers = {
      'Content-Type': 'multipart/form-data',
    };
  }
  try {
    const result = await axiosInstance.post(endPoint, data, {headers: headers});
    if (result) {
      store.setLoader(false);
      console.log('--- API Response --->', result.data); //console response of every request
      return result;
    } else {
      store.setLoader(false);
      Toast.show({type: 'error', text1: 'Something went wrong !'});
    }
  } catch (error) {
    store.setLoader(false);
    Toast.show({
      type: 'error',
      text1: error.response.data?.message || 'Something went wrong !',
    });
    console.log('--- API Error --->', error); // log any error
    throw error;
  }
};
// ----------------------------------------------------------------------

export {getData, postData, axiosInstance};
