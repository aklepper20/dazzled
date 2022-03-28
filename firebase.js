// import firebase from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

// import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA7aDFbqqApIGMxEviEGPDhx8tpgK2FckU",
  authDomain: "dazzled-77c54.firebaseapp.com",
  projectId: "dazzled-77c54",
  storageBucket: "dazzled-77c54.appspot.com",
  messagingSenderId: "844913763789",
  appId: "1:844913763789:web:072c58271badf63ce85084",
};

// const app = initializeApp(firebaseConfig);

// !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
// export default firebase;

// const app = initializeApp(firebaseConfig);

// const db = getFirestore();

// export const auth = getAuth(app);
// export default db;
const app = initializeApp(firebaseConfig);

export const db = getFirestore();
const auth = getAuth(app);
export default auth;
// export default db;
