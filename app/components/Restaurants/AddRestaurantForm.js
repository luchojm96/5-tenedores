import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Alert, Dimensions } from 'react-native';
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

export default function AddRestaurantForm(props) {
  const { toastRef, setIsLoading, navigation } = props;
  const [formData, setFormData] = useState(initialFormValues());
  const [selectedImages, setSelectedImages] = useState([]);

  const onInputChange = (text, name) => {
    setFormData({ ...formData, [name]: text });
  };

  const saveRestaurant = () => {
    console.log(formData);
    console.log(selectedImages);
  };

  return (
    <ScrollView style={styles.scrollView}>
      <FormAdd onInputChange={onInputChange} />
      <UploadImage
        toastRef={toastRef}
        setSelectedImages={setSelectedImages}
        selectedImages={selectedImages}
      />
      <Button
        title="Crear Restaurante"
        onPress={saveRestaurant}
        buttonStyle={styles.btn}
      />
    </ScrollView>
  );
}

function FormAdd(props) {
  const { onInputChange } = props;

  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Nombre del restaurante"
        onChangeText={(text) => onInputChange(text, 'name')}
      />
      <Input
        placeholder="Dirección"
        onChangeText={(text) => onInputChange(text, 'address')}
      />
      <Input
        placeholder="Descripción del restaurante..."
        multiline={true}
        inputContainerStyle={styles.textArea}
        onChangeText={(text) => onInputChange(text, 'description')}
      />
    </View>
  );
}

function UploadImage(props) {
  const { toastRef, setSelectedImages, selectedImages } = props;

  const imageSelect = async () => {
    const resultPermissions = await Permissions.askAsync(
      Permissions.MEDIA_LIBRARY
    );
    if (resultPermissions === 'denied') {
      toastRef.current.show(
        'Es necesario aceptar los permisos de la galeria',
        3000
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (result.cancelled) {
        toastRef.current.show(
          'Has cerrado la galeria sin seleccionar ninguna imagen',
          3000
        );
      } else {
        setSelectedImages([...selectedImages, result.uri]);
      }
    }
  };

  return (
    <View style={styles.viewImages}>
      <Icon
        type="material-community"
        name="camera"
        color="#7a7a7a"
        containerStyle={styles.containerIcon}
        onPress={imageSelect}
      />
    </View>
  );
}

function initialFormValues() {
  return {
    name: '',
    address: '',
    description: '',
  };
}

const styles = StyleSheet.create({
  scrollView: {
    height: '100%',
  },
  viewForm: {
    marginHorizontal: 10,
  },
  textArea: {
    height: 100,
    width: '100%',
    padding: 0,
    margin: 0,
  },
  btn: {
    backgroundColor: '#00a680',
    margin: 20,
  },
  viewImages: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 30,
  },
  containerIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    height: 70,
    width: 70,
    backgroundColor: '#e3e3e3',
  },
});
