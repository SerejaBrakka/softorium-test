import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA1lfOLVCNSCE1qkPW5l4njkbSl6dP858k",
  authDomain: "test-task-softorium.firebaseapp.com",
  projectId: "test-task-softorium",
  storageBucket: "test-task-softorium.appspot.com",
  messagingSenderId: "1060349600149",
  appId: "1:1060349600149:web:2f6732758e22fccc65569c",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
