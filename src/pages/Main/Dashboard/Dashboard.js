import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import React, {useContext} from 'react';
import LottieView from 'lottie-react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import { AuthContext } from '../../../context/context';
import useLocal from '../../../hook/useLocal';

import styles from './DashboardStyle';

const Dashboard = () => {
  const {getAuth} = useContext(AuthContext);
  const local = useLocal();

  const removeHendler = () => {
    RNSecureKeyStore.remove("logedUser")
    .then((res) => {
        getAuth(false);
    }, (err) => {
        console.log(err);
    });
  }

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#ffffff" translucent={false} />
      <LottieView style={{ width: wp(80) }} source={require('../../../../asset/13636-modified-dashboard.json')} autoPlay loop />
      
      <TouchableOpacity 
        style={styles.removeBtn} 
        onPress={removeHendler}
        activeOpacity={0.7}>
        <Text >{local.dashboardText}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Dashboard