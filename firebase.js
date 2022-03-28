// import firebase from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

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

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = getFirestore();

export const auth = getAuth(app);
export default db;
