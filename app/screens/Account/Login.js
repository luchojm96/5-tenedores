import React, { useRef } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Divider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-easy-toast';

import logo from '../../../assets/img/5-tenedores-logo.png';
import LoginForm from '../../components/Account/LoginForm';

export default function Login() {
  const toastRef = useRef();
  return (
    <ScrollView>
      <Image source={logo} resizeMode="contain" style={styles.logo} />
      <View style={styles.viewContainer}>
        <LoginForm toastRef={toastRef} />
        <CreateAccount />
      </View>
      <Divider style={styles.divider} />
      <Text style={styles.txtRegister}>Ingresar con:</Text>
      <Toast
        ref={toastRef}
        position="center"
        opacity={0.9}
        style={{ backgroundColor: '#E91E63' }}
        textStyle={{ color: 'white' }}
      />
    </ScrollView>
  );
}

function CreateAccount() {
  const navigation = useNavigation();

  return (
    <Text style={styles.txtRegister}>
      ¿Aún no tienes una cuenta?{' '}
      <Text
        style={styles.btnRegister}
        onPress={() => navigation.navigate('register')}
      >
        Registrate
      </Text>
    </Text>
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
  txtRegister: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'center',
  },
  btnRegister: {
    color: '#00a680',
    fontWeight: 'bold',
  },
  divider: {
    backgroundColor: '#00a680',
    marginHorizontal: 40,
    marginVertical: 20,
  },
});
