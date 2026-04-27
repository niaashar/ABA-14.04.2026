// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  orderBy 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBF1STGhIQAyK4cUzddeXdDqMqpExf_y9o",
  authDomain: "aba-pro-cabinets.firebaseapp.com",
  projectId: "aba-pro-cabinets",
  storageBucket: "aba-pro-cabinets.firebasestorage.app",
  messagingSenderId: "166721320978",
  appId: "1:166721320978:web:f8488ac6a6125c924ac0cb"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { 
  auth, db, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  doc, setDoc, getDoc, 
  collection, addDoc, query, where, getDocs, orderBy 
};
