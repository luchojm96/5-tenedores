import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import { isEmpty } from 'lodash';
import { useNavigation } from '@react-navigation/native';

import { firebase } from '../../utils/firebase';
import { validateEmail } from '../../utils/validations';
import Loading from '../Loading';

export default function LoginForm(props) {
  const { toastRef } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultFormValues());
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const onInputChange = (text, name) => {
    setFormData({ ...formData, [name]: text });
  };

  const emailIcon = (
    <Icon
      type="material-community"
      name="email"
      iconStyle={styles.inputIcons}
    />
  );

  const passwordIcon = (
    <Icon type="material-community" name="lock" iconStyle={styles.inputIcons} />
  );

  const eyeIcon_1 = (
    <Icon
      type="material-community"
      name={showPassword ? 'eye-off-outline' : 'eye-outline'}
      iconStyle={styles.inputIcons}
      onPress={() => setShowPassword(!showPassword)}
    />
  );

  const onSubmit = () => {
    if (isEmpty(formData.email) || isEmpty(formData.password)) {
      toastRef.current.show('Todos los campos son obligatorios', 3000);
    } else if (!validateEmail(formData.email)) {
      toastRef.current.show('El email introducido no es válido', 3000);
    } else {
      setLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then((response) => {
          setLoading(false);
          navigation.navigate('account');
        })
        .catch((err) => {
          setLoading(false);
          toastRef.current.show('Email o contraseña incorrectos', 3000);
        });
    }
  };

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Correo Electrónico"
        containerStyle={styles.inputForm}
        leftIcon={emailIcon}
        onChangeText={(text) => onInputChange(text, 'email')}
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.inputForm}
        secureTextEntry={showPassword ? false : true}
        leftIcon={passwordIcon}
        rightIcon={eyeIcon_1}
        onChangeText={(text) => onInputChange(text, 'password')}
      />
      <Button
        title="Unirse"
        containerStyle={styles.btnLoginContainer}
        buttonStyle={styles.btnLogin}
        onPress={onSubmit}
      />
      <Loading isVisible={loading} text="Ingresando" />
    </View>
  );
}

function defaultFormValues() {
  return {
    email: '',
    password: '',
  };
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  inputForm: {
    width: '100%',
  },
  inputIcons: {
    color: '#c1c1c1',
  },
  btnLoginContainer: {
    marginTop: 20,
    width: '60%',
  },
  btnLogin: {
    backgroundColor: '#00a680',
  },
});
