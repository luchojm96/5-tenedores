import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import { size, isEmpty } from 'lodash';
import { useNavigation } from '@react-navigation/native';

import firebase from 'firebase/app';
import { validateEmail } from '../../utils/validations';
import Loading from '../Loading';

export default function RegisterForm(props) {
  const { toastRef } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [formData, setFormData] = useState(defaultFormValues());
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const onInputChange = (text, name) => {
    setFormData({ ...formData, [name]: text });
  };

  const onSubmit = () => {
    if (
      isEmpty(formData.email) ||
      isEmpty(formData.password) ||
      isEmpty(formData.repeatPassword)
    ) {
      toastRef.current.show('Todos los campos son obligatorios', 3000);
    } else if (!validateEmail(formData.email)) {
      toastRef.current.show('El email introducido no es válido', 3000);
    } else if (formData.password !== formData.repeatPassword) {
      toastRef.current.show('Las contraseñas deben ser iguales', 3000);
    } else if (size(formData.password) < 6) {
      toastRef.current.show(
        'La contraseña debe tener almenos seis caracteres',
        3000
      );
    } else {
      setLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .then((response) => {
          setLoading(false);
          navigation.navigate('account');
        })
        .catch((err) => {
          setLoading(false);
          toastRef.current.show('El email ya está en uso', 3000);
        });
    }
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

  const eyeIcon_2 = (
    <Icon
      type="material-community"
      name={showRepeatPassword ? 'eye-off-outline' : 'eye-outline'}
      iconStyle={styles.inputIcons}
      onPress={() => setShowRepeatPassword(!showRepeatPassword)}
    />
  );

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
      <Input
        placeholder="Repetir Contraseña"
        containerStyle={styles.inputForm}
        secureTextEntry={showRepeatPassword ? false : true}
        leftIcon={passwordIcon}
        rightIcon={eyeIcon_2}
        onChangeText={(text) => onInputChange(text, 'repeatPassword')}
      />
      <Button
        title="Unirse"
        containerStyle={styles.btnRegisterContainer}
        buttonStyle={styles.btnRegister}
        onPress={onSubmit}
      />
      <Loading isVisible={loading} text="Creando Cuenta" />
    </View>
  );
}

function defaultFormValues() {
  return {
    email: '',
    password: '',
    repeatPassword: '',
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
  btnRegisterContainer: {
    marginTop: 20,
    width: '60%',
  },
  btnRegister: {
    backgroundColor: '#00a680',
  },
});
