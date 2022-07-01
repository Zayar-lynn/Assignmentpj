import { View, Text, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView, Switch, Keyboard } from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import LottieView from 'lottie-react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

// style
import styles from './AuthFormStyle';

// component
import { AuthContext } from '../../context/context';
import useLocal from '../../hook/useLocal';

const TextInputField = (props) => {
  const local = useLocal();
  const [passShow, setPassShow] = useState(true);
  const [conPassShow, setConPassShow] = useState(true);
  const [shouldShow, setShouldShow] = useState(true);

  const passShowHide = (value) => {
    setPassShow(previousState => !previousState);
  }
  const conPassShowHide = (value) => {
    setConPassShow(previousState => !previousState);
  }

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setShouldShow(false);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setShouldShow(true);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#ffffff" translucent={false} />
      
      <View style={styles.container}>
        {/* <KeyboardAvoidingView behavior="padding" style={styles.container}> */}
        {shouldShow ?
        (
          <View style={{ alignItems: 'center', justifyContent: 'center'}}>
            <LottieView style={{ width: wp(60) }} source={require('../../../asset/93385-login.json')} autoPlay loop />
          </View>
        ) : null}

          <View style={[styles.inputContainer, styles.elevation]}>
            {!props.isLogin && (
              <TextInput 
                placeholder={local.name}
                style={[styles.input, {marginBottom: 40}]}
                onChangeText={props.onChangeUserName}
                onSubmitEditing={Keyboard.dismiss}
              />
            )}

            <TextInput 
              placeholder={local.email}
              style={[styles.input]}
              onChangeText={props.onChangeEmail}
              onSubmitEditing={Keyboard.dismiss}
            />

            <View style={{flexDirection: 'row'}}>
              <TextInput 
                placeholder={local.pass}
                secureTextEntry={passShow}
                style={[styles.input, {marginTop: 40,width:wp(56),marginLeft:wp(3)}]}
                onChangeText={props.onChangePassword}
                onSubmitEditing={Keyboard.dismiss}
              />
              <Switch
                style={{marginTop:hp(6)}}
                trackColor={{ false: "gray", true: "#81b0ff" }}
                thumbColor={passShow ? "#ffffff" : "#f5dd4b"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={passShowHide}
                value={!passShow}
              />
            </View>

            {!props.isLogin && (
              <View style={{flexDirection: 'row'}}>
                <TextInput 
                  placeholder={local.confirmPass}
                  secureTextEntry={conPassShow}
                  style={[styles.input, {marginTop: 40,width:wp(56),marginLeft:wp(3)}]}
                  onChangeText={props.onChangeConfirmPassword}
                  onSubmitEditing={Keyboard.dismiss}
                />
                <Switch
                  style={{marginTop:hp(6)}}
                  trackColor={{ false: "gray", true: "#81b0ff" }}
                  thumbColor={conPassShow ? "#ffffff" : "#f5dd4b"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={conPassShowHide}
                  value={!conPassShow}
                />
              </View>
            )}
            
          </View>
          <TouchableOpacity
            onPress={props.action}
            style={[styles.btnContainer, styles.elevation]}
            activeOpacity={0.7}
          >
            <Text style={styles.btnText}>{props.buttonText}</Text>
          </TouchableOpacity>

          <View style={styles.footerContainer}>
          {props.isLogin ? (
            <Text style={{fontWeight: 'bold',paddingHorizontal: wp(2)}}>{local.noAccount}</Text>
          ) : (
            <Text style={{fontWeight: 'bold',paddingHorizontal: wp(2)}}>{local.already}</Text>
          )}
            <TouchableOpacity onPress={props.footerAction}>
              <Text style={{color: 'red'}}>{props.footerText}</Text>
            </TouchableOpacity>
          </View>
        {/* </KeyboardAvoidingView> */}
      </View>
    </>
  )
}

export default TextInputField