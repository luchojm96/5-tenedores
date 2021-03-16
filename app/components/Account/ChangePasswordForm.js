import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button } from 'react-native-elements';

import { reauthenticate } from '../../utils/api';

export default function ChangePasswordForm(props) {
  const { setShowModal, toastRef, setLoading, setLoadingText } = props;
  const [password, setPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [errors, setErrors] = useState({ password: '', newPassword: '' });

  const onSubmit = () => {
    setErrors({ password: '', newPassword: '' });
    if (!password) {
      setErrors({ ...errors, password: 'Debe introducir su contraseña' });
    } else if (!newPassword) {
      setErrors({
        ...errors,
        newPassword: 'Debe introducir una nueva contraseña',
      });
    } else if (password === newPassword) {
      setErrors({
        ...errors,
        newPassword: 'Las contraseñas no pueden ser iguales',
      });
    } else {
      setLoading(true);
      setLoadingText('Guardando...');
      reauthenticate(password)
        .then((res) => {
          res.user
            .updatePassword(newPassword)
            .then(() => {
              setLoading(false);
              setShowModal(false);
            })
            .catch((err) => {
              setLoading(false);
              setShowModal(false);
              toastRef.current.show('No se puedo guardar');
            });
        })
        .catch((err) => {
          setErrors({ ...errors, password: 'La contraseña no es correcta' });
          setLoading(false);
        });
    }
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Contraseña Actual"
        rightIcon={
          showPassword
            ? {
                type: 'material-community',
                name: 'eye-off-outline',
                onPress: () => setShowPassword(!showPassword),
              }
            : {
                type: 'material-community',
                name: 'eye-outline',
                onPress: () => setShowPassword(!showPassword),
              }
        }
        secureTextEntry={showPassword ? false : true}
        errorMessage={errors.password}
        onChangeText={(text) => setPassword(text)}
      />
      <Input
        placeholder="Nueva Contraseña"
        rightIcon={
          showNewPassword
            ? {
                type: 'material-community',
                name: 'eye-off-outline',
                onPress: () => setShowNewPassword(!showNewPassword),
              }
            : {
                type: 'material-community',
                name: 'eye-outline',
                onPress: () => setShowNewPassword(!showNewPassword),
              }
        }
        secureTextEntry={showNewPassword ? false : true}
        errorMessage={errors.newPassword}
        onChangeText={(text) => setNewPassword(text)}
      />
      <Button
        title="Guardar Correo"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  btnContainer: {
    marginTop: 20,
    width: '95%',
  },
  btn: {
    backgroundColor: '#00a680',
  },
});
