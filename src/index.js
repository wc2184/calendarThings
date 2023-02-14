import { ColorModeScript } from '@chakra-ui/react';
import React, { createContext, StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCawvr36KWKqYsEC8fqNuAzNELEFth1yVU',
  authDomain: 'scheduleapp-ace92.firebaseapp.com',
  projectId: 'scheduleapp-ace92',
  storageBucket: 'scheduleapp-ace92.appspot.com',
  messagingSenderId: '136303779034',
  appId: '1:136303779034:web:c6debdd422c4aac17019e3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
const RefreshContext = createContext();
root.render(
  <StrictMode>
    <BrowserRouter>
      <ColorModeScript />
      <App />
    </BrowserRouter>
  </StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
