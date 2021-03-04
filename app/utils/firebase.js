import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBWt-HfCdUKGD4jwAGVfEA_kGL9Zy4o-Vg',
  authDomain: 'testing-apps-9d27d.firebaseapp.com',
  databaseURL: 'https://testing-apps-9d27d.firebaseio.com',
  projectId: 'testing-apps-9d27d',
  storageBucket: 'testing-apps-9d27d.appspot.com',
  messagingSenderId: '1000880563371',
  appId: '1:1000880563371:web:b9daa92874c125774883ee',
  measurementId: 'G-XNQH0GY6HW',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export { firebaseApp, firebase };
