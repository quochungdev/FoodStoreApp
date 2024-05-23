import { initializeApp, getApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCxIG0T1osd0m1AptBx6N7Qr6s2RUaQnHs',
  authDomain: 'chatfoodapp-2fdd4.firebaseapp.com',
  projectId: 'chatfoodapp-2fdd4',
  storageBucket: 'chatfoodapp-2fdd4.appspot.com',
  messagingSenderId: '220016713101',
  appId: '1:220016713101:web:8d5f694addd65ea492f1c4',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = initializeFirestore(app, {experimentalForceLongPolling: true});

export { db, auth };
