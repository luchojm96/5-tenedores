import React, { useRef } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-easy-toast';

import logo from '../../../assets/img/5-tenedores-logo.png';
import RegisterForm from '../../components/Account/RegisterForm';

export default function Register() {
  const toastRef = useRef();
  return (
    <KeyboardAwareScrollView>
      <Image source={logo} resizeMode="contain" style={styles.logo} />
      <View style={styles.viewContainer}>
        <RegisterForm toastRef={toastRef} />
      </View>
      <Toast
        ref={toastRef}
        position="center"
        opacity={0.9}
        style={{ backgroundColor: '#E91E63' }}
        textStyle={{ color: 'white' }}
      />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: '100%',
    height: 150,
    marginTop: 20,
  },
  viewContainer: {
    marginRight: 40,
    marginLeft: 40,
  },
});
