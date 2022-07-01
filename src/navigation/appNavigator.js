import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../context/context';
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";

// Stack
import AuthStack from './stack/AuthStack';
import MainStack from './stack/MainStack';

// pages
import SplashScreen from '../pages/SplashScreen/SplashScreen';

const appNavigator = () => {
  const [auth, setAuth] = useState(false);
  const [splash, setSplash] = useState(true);
  const [lang, setLang] = useState('en');

  const context = {
    auth,
    lang,
    getAuth: value => {
      setAuth(value);
    },
    getLang: value => {
      setLang(value);
    }
  }

  const getLogedData = () => {
    RNSecureKeyStore.get("lang")
    .then((res) => {
        if(res == 'en'){
          setLang('en');
        }else{
          setLang('jp');
        }
    });
    RNSecureKeyStore.get("logedUser")
    .then((res) => {
        if(res){
          setAuth(true);
          setTimeout(() => {
            setSplash(false);
          }, 3000);
        }else{
          setAuth(false);
          setSplash(false);
        }
    }, (err) => {
        setTimeout(() => {
          setSplash(false);
        }, 3000);
        console.log(err);
    });
  }

  useEffect(() => {
    getLogedData();
  }, [])

  if(splash){
    return (
      <AuthContext.Provider value={context}>
        <SplashScreen />
      </AuthContext.Provider>
    )
  }else if(auth){
    return (
      <AuthContext.Provider value={context}>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </AuthContext.Provider>
    )
  }else{
    return (
      <AuthContext.Provider value={context}>
        <NavigationContainer>
          <AuthStack />
        </NavigationContainer>
      </AuthContext.Provider>
    )
  }
}

export default appNavigator