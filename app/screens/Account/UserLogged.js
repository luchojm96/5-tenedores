import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Toast from 'react-native-easy-toast';

import { firebase } from '../../utils/firebase';
import Loading from '../../components/Loading';
import InfoUser from '../../components/Account/InfoUser';

export default function UserLogged() {
  const toastRef = useRef();
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    (async () => {
      const user = await firebase.auth().currentUser;
      setUserInfo(user);
      console.log(InfoUser);
    })();
  }, []);

  return (
    <View style={styles.viewUserInfo}>
      {userInfo && <InfoUser userInfo={userInfo} />}
      <Text>Account Options...</Text>
      <Button
        title="Cerrar Sesión"
        buttonStyle={styles.btnLogout}
        titleStyle={styles.btnLogoutText}
        onPress={() => firebase.auth().signOut()}
      />
      <Toast ref={toastRef} position="center" opacity={0.9} />
      <Loading isVisible={loading} text={loadingText} />
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    minHeight: '100%',
    backgroundColor: '#f2f2f2',
  },
  btnLogout: {
    marginTop: 30,
    borderRadius: 0,
    borderTopWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#e3e3e3',
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
    paddingVertical: 10,
  },
  btnLogoutText: {
    color: '#00a680',
  },
});
