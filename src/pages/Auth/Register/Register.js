import { View, Text, ToastAndroid } from 'react-native';
import React, { Component, useState, useContext } from 'react';
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import { AuthContext } from '../../../context/context';

// Component
import AuthForm from '../../../components/auth/AuthForm';
import useLocal from '../../../hook/useLocal';

const Register = ({navigation}) => {

  const [login, setLogin] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');

  const {getAuth} = useContext(AuthContext);
  const local = useLocal();

  const footerHandler = () => {
      if(login){
        navigation.navigate('Register')
      }else{
        navigation.navigate('Login')
      }
  }

  const actionHandler = () => {
    let regData = {
      userName:userName,
      email:email,
      password:password,
      confirmPassword:confirmPassword
    };
    // console.log(regData);
    if(userName == "" && email == "" && password == "" && confirmPassword == ""){
      ToastAndroid.show('Fill all data!', ToastAndroid.SHORT);
    }else{
      if(password != confirmPassword){
        ToastAndroid.show('Confirm Password does not match!', ToastAndroid.SHORT);
      }else{
        RNSecureKeyStore.set("logedUser", JSON.stringify(regData), {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY});
        navigation.navigate('Login');
        ToastAndroid.show('Success!', ToastAndroid.SHORT);
      }
    }
  }

  return (
      <AuthForm 
        buttonText={local.register}
        action={actionHandler}
        onChangeUserName={val => setUserName(val)}
        onChangeEmail={val => setEmail(val)}
        onChangePassword={val => setPassword(val)}
        onChangeConfirmPassword={val => setconfirmPassword(val)}
        isLogin={login}
        footerText={local.login}
        footerAction={footerHandler}
      />
  )
}

export default Register