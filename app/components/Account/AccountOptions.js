import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { map } from 'lodash';

import Modal from '../Modal';
import ChangeDisplayNameForm from './ChangeDisplayNameForm';
import ChangeEmailForm from './ChangeEmailForm';
import ChangePasswordForm from './ChangePasswordForm';

export default function AccountOptions(props) {
  const { userInfo, toastRef, setLoading, setLoadingText } = props;
  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);

  const selectedComponent = (key) => {
    switch (key) {
      case 'displayName':
        setRenderComponent(
          <ChangeDisplayNameForm
            displayName={userInfo.displayName}
            setShowModal={setShowModal}
            toastRef={toastRef}
            setLoading={setLoading}
            setLoadingText={setLoadingText}
          />
        );
        setShowModal(true);
        break;

      case 'email':
        setRenderComponent(
          <ChangeEmailForm
            email={userInfo.email}
            setShowModal={setShowModal}
            toastRef={toastRef}
            setLoading={setLoading}
            setLoadingText={setLoadingText}
          />
        );
        setShowModal(true);
        break;

      case 'password':
        setRenderComponent(
          <ChangePasswordForm
            setShowModal={setShowModal}
            toastRef={toastRef}
            setLoading={setLoading}
            setLoadingText={setLoadingText}
          />
        );
        setShowModal(true);
        break;

      default:
        setRenderComponent(null);
        break;
    }
  };

  const menuOptions = generateOptions(selectedComponent);

  return (
    <View>
      {map(menuOptions, (menu, index) => (
        <ListItem key={index} bottomDivider onPress={menu.onPress}>
          <Icon name={menu.icon} type="material-community" />
          <ListItem.Content>
            <ListItem.Title>{menu.title}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      ))}
      {renderComponent && (
        <Modal isVisible={showModal} setIsVisible={setShowModal}>
          {renderComponent}
        </Modal>
      )}
    </View>
  );
}

function generateOptions(selectedComponent) {
  return [
    {
      title: 'Cambiar Nombres y Apellidos',
      icon: 'account-circle',
      onPress: () => selectedComponent('displayName'),
    },
    {
      title: 'Cambiar Email',
      icon: 'at',
      onPress: () => selectedComponent('email'),
    },
    {
      title: 'Cambiar Contraseña',
      icon: 'lock-reset',
      onPress: () => selectedComponent('password'),
    },
  ];
}

const styles = StyleSheet.create({});
