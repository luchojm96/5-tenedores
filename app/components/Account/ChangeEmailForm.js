import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button } from 'react-native-elements';

import { validateEmail } from '../../utils/validations';
import { reauthenticate } from '../../utils/api';

export default function ChangeEmailForm(props) {
  const { email, setShowModal, toastRef, setLoading, setLoadingText } = props;
  const [newEmail, setNewEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  const onSubmit = () => {
    setErrors({ email: '', password: '' });
    if (!newEmail) {
      setErrors({ ...errors, email: 'Debe introducir un Email' });
    } else if (email === newEmail) {
      setErrors({ ...errors, email: 'El email no puede ser igual al actual' });
    } else if (!validateEmail(newEmail)) {
      setErrors({ ...errors, email: 'Correo electrónico no válido' });
    } else {
      setLoading(true);
      setLoadingText('Guardando...');
      reauthenticate(password)
        .then((res) => {
          res.user
            .updateEmail(newEmail)
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
        placeholder="Correo Electrónico"
        rightIcon={{
          type: 'material-community',
          name: 'at',
        }}
        defaultValue={email || ''}
        onChangeText={(text) => setNewEmail(text)}
        errorMessage={errors.email}
      />
      <Input
        placeholder="Contraseña"
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
