import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';

import UserGuest from './UserGuest';
import UserLogged from './UserLogged';
import Loading from '../../components/Loading';

export default function Account() {
  const [logged, setLogged] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      !user ? setLogged(false) : setLogged(true);
    });
  }, []);

  if (logged === null) return <Loading isVisible={true} text="Cargando..." />;

  return logged ? <UserLogged /> : <UserGuest />;
}
