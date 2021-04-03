import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import firebase from 'firebase/app';

export default function ChangeDisplayNameForm(props) {
  const {
    displayName,
    setShowModal,
    toastRef,
    setLoading,
    setLoadingText,
  } = props;
  const [newDisplayName, setNewDisplayName] = useState(null);
  const [error, setError] = useState(null);

  const onSubmit = () => {
    setError(null);
    if (!newDisplayName) {
      setError('El nombre no puede estar vacío');
    } else if (displayName === newDisplayName) {
      setError('El nombre no puede ser igual al actual');
    } else {
      setLoading(true);
      setLoadingText('Guardando Nombre');
      firebase
        .auth()
        .currentUser.updateProfile({ displayName: newDisplayName })
        .then(() => {
          setLoading(false);
          setShowModal(false);
        })
        .catch((err) => toastRef.current.show('No se pudo guardar'));
    }
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Nombre Completo"
        rightIcon={{
          type: 'material-community',
          name: 'account-circle-outline',
        }}
        defaultValue={displayName || ''}
        onChangeText={(text) => setNewDisplayName(text)}
        errorMessage={error}
      />
      <Button
        title="Guardar Nombre"
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
