import firebase from 'firebase';
import 'firebase/firestore';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyDSeaUF3yZCu5tAIVR6MH7GvaBlb4VbeQo',
  authDomain: 'hackkingsimage.firebaseapp.com',
  databaseURL: 'https://hackkingsimage.firebaseio.com',
  projectId: 'hackkingsimage',
  storageBucket: 'hackkingsimage.appspot.com',
  messagingSenderId: '89731623705',
};

firebase.initializeApp(config);

export default firebase;
