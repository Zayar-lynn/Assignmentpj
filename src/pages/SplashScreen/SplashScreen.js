import React from 'react'
import { View, Text, StatusBar } from 'react-native';
import LottieView from 'lottie-react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

// component
import useLocal from '../../hook/useLocal';

const SplashScreen = () => {
  const local = useLocal();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#ffffff" translucent={false} />
      <LottieView style={{ width: wp(80) }} source={require('../../../asset/98194-loading.json')} autoPlay loop />
      <Text>{local.loading}</Text>
    </View>
  )
}

export default SplashScreen