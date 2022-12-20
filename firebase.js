// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, getDocs } from "firebase/firestore";


import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB-qbWr36HlFTXNwhliW3XsH6uBRHpEE-4",
  authDomain: "amzn-clone-8ece7.firebaseapp.com",
  projectId: "amzn-clone-8ece7",
  storageBucket: "amzn-clone-8ece7.appspot.com",
  messagingSenderId: "1066560714557",
  appId: "1:1066560714557:web:c4fd7b088ecaf1439a3754",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

export const db = app.firestore();
export const getDb = getDatabase(app)

// const app = initializeApp(firebaseConfig);

// export const db = getFirestore(app);

// const colRef = collection(db, "books");

// getDocs(colRef).then((snapshot) => {
//   let books = [];

//   snapshot.docs.forEach((doc) => {
//     books.push({
//       ...doc.data(),id: doc.id,
//     });
//   });
//   console.log(books);
// });

// const colRef = collection(db, "orders");

// getDocs(colRef).then((snapshot) => {
//   console.log(snapshot.docs);
// });
