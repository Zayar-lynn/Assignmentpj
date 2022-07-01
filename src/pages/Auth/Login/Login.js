import { View, Text, ToastAndroid, Switch } from 'react-native';
import React, { Component, useState, useContext, useEffect } from 'react';
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import { AuthContext } from '../../../context/context';

// Component
import AuthForm from '../../../components/auth/AuthForm';
import useLocal from '../../../hook/useLocal';
// style
import styles from '../../../components/auth/AuthFormStyle';

const Login = ({navigation}) => {

  const {lang, getLang} = useContext(AuthContext);
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEnabled, setIsEnabled] = useState();

  const {getAuth} = useContext(AuthContext);
  const local = useLocal();

  useEffect(()=> {
    if(lang == 'en'){
      setIsEnabled(false);
    }else{
      setIsEnabled(true);
    }
  },[])
  
  const toggleSwitch = (value) => {
    setIsEnabled(previousState => !previousState);
    if(value == false){
      RNSecureKeyStore.set("lang", "en", {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY});
      getLang('en');
    }else{
      RNSecureKeyStore.set("lang", "jp", {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY});
      getLang('jp');
    }
    // console.log(value)
  }

  const footerHandler = () => {
    if(login){
      navigation.navigate('Register')
    }else{
      navigation.navigate('Login')
    }
  }

  const actionHandler = () => {
    RNSecureKeyStore.get("logedUser")
    .then((res) => {
        let logedData = JSON.parse(res)
        goLogin(logedData);
    }, (err) => {
        ToastAndroid.show(local.error, ToastAndroid.SHORT);
        console.log(err);
    });
  }

  const goLogin = (data) => {
    if(data.email == email && data.password == password){
      getAuth(true);
      ToastAndroid.show(local.welcome, ToastAndroid.SHORT);
    }else{
      ToastAndroid.show(local.error, ToastAndroid.SHORT);
    }
  }

  return (
    <>
      <View style={{flexDirection: 'row-reverse'}}>
        <Text style={styles.langText}>{local.jp} </Text>
        <Switch
          trackColor={{ false: "#81b0ff", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4fe33"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Text style={styles.langText}>{local.en}</Text>
      </View>
      <AuthForm 
        buttonText={local.login}
        action={actionHandler}
        onChangeEmail={val => setEmail(val)}
        onChangePassword={val => setPassword(val)}
        isLogin={login}
        footerText={local.register}
        footerAction={footerHandler}
      />
    </>
  )
}

export default Login