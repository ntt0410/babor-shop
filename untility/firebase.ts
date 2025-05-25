import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCpQERI4_Mae1xalLMb5EjfxzVLO_Bim9Y",
  authDomain: "fir-react-1dad7.firebaseapp.com",
  projectId: "fir-react-1dad7",
  storageBucket: "fir-react-1dad7.firebasestorage.app",
  messagingSenderId: "315501459723",
  appId: "1:315501459723:web:01738ae334014dd8518a0e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const fs = getFirestore(app);

export { auth, fs };

