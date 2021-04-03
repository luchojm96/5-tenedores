import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import Toast from 'react-native-easy-toast';
import firebase from 'firebase/app';

import Loading from '../../components/Loading';
import InfoUser from '../../components/Account/InfoUser';
import AccountOptions from '../../components/Account/AccountOptions';

export default function UserLogged() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const toastRef = useRef();

  useEffect(() => {
    (async () => {
      const user = await firebase.auth().currentUser;
      setUserInfo(user);
    })();
  }, []);

  return (
    <View style={styles.viewUserInfo}>
      {userInfo && (
        <InfoUser
          userInfo={userInfo}
          toastRef={toastRef}
          setLoading={setLoading}
          setLoadingText={setLoadingText}
        />
      )}
      <AccountOptions
        userInfo={userInfo}
        toastRef={toastRef}
        setLoading={setLoading}
        setLoadingText={setLoadingText}
      />
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
