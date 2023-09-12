import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyA7ZDcEHZ4dQHiii2kXXdPhjauq9A74TKo",
  authDomain: "asset-tracer.firebaseapp.com",
  projectId: "asset-tracer",
  storageBucket: "asset-tracer.appspot.com",
  messagingSenderId: "1016987004677",
  appId: "1:1016987004677:web:0026804c85c4580b22916c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

export { auth, provider, storage };