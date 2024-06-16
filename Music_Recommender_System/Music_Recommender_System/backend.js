// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyD47xy0hH1WxZEnzyy0q9k3jhhcDeR3Zlw",
  authDomain: "musicapp-e0ade.firebaseapp.com",
  databaseURL: "https://musicapp-e0ade-default-rtdb.firebaseio.com",
  projectId: "musicapp-e0ade",
  storageBucket: "musicapp-e0ade.appspot.com",
  messagingSenderId: "886489959584",
  appId: "1:886489959584:web:afaaea3e3ce9453270cdc5",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();

const db = getDatabase();

export { db };
export { auth };


