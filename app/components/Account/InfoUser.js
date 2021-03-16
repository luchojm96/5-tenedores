import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';

import Modal from '../Modal';
import ShowImage from './ShowImage';

export default function InfoUser(props) {
  const { userInfo, toastRef, setLoading, setLoadingText } = props;
  const { uid, photoURL, displayName, email } = userInfo;
  const [showModal, setShowModal] = useState(false);

  const changeAvatar = async () => {
    const resultPermission = await Permissions.askAsync(
      Permissions.MEDIA_LIBRARY
    );
    const resultPermissionCamera =
      resultPermission.permissions.mediaLibrary.status;
    if (resultPermissionCamera === 'denied') {
      toastRef.current.show('Es necesario aceptar los permisos');
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (result.cancelled) {
        toastRef.current.show('Selecciona una imagen');
      } else {
        uploadImage(result.uri)
          .then(async () => {
            await updatePhotoURL();
          })
          .catch(() => toastRef.current.show('Error al actualizar el avatar'));
      }
    }
  };

  const uploadImage = async (uri) => {
    setLoadingText('Actualizando Avatar');
    setLoading(true);
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase.default.storage().ref().child(`avatar/${uid}`);
    return ref.put(blob);
  };

  const updatePhotoURL = () => {
    const response = firebase.default
      .storage()
      .ref(`avatar/${uid}`)
      .getDownloadURL()
      .then(async (response) => {
        await firebase.default
          .auth()
          .currentUser.updateProfile({ photoURL: response });
        setLoading(false);
      })
      .catch(() => toastRef.current.show('Error al actualizar el avatar'));
  };

  const showImageModal = () => {
    setShowModal(true);
  };

  return (
    <View style={styles.viewUserInfo}>
      <Avatar
        rounded
        size="large"
        containerStyle={styles.avatarUserInfo}
        source={
          photoURL
            ? { uri: photoURL }
            : require('../../../assets/img/avatar-default.jpg')
        }
        onPress={showImageModal}
      >
        <Avatar.Accessory size={24} activeOpacity onPress={changeAvatar} />
      </Avatar>
      <View>
        <Text style={styles.displayName}>
          {displayName ? displayName : 'Nombre de Usuario'}
        </Text>
        <Text>{email ? email : 'email@mail.com'}</Text>
      </View>
      <Modal isVisible={showModal} setIsVisible={setShowModal}>
        <ShowImage photoURL={photoURL} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    paddingVertical: 30,
  },
  avatarUserInfo: {
    marginRight: 20,
  },
  displayName: {
    fontWeight: 'bold',
  },
});
