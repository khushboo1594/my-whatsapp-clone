// // ye bhi karke dekh liya. isse bhi error aa rahi hai
// // import firebase from "firebase/app";
// // import "firebase/auth";
// // import "firebase/firestore";

// // isme aa raha hai k module not found
// import * as firebase from "firebase";
// // package re-install karke bhi dekh liya

// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAxXYfPSiSH6yUvlmLSp3IYPPV1u7zELh4",
//   authDomain: "whatsapp-clone-e8081.firebaseapp.com",
//   projectId: "whatsapp-clone-e8081",
//   storageBucket: "whatsapp-clone-e8081.appspot.com",
//   messagingSenderId: "212511697708",
//   appId: "1:212511697708:web:ebda213d2caadeb9969a89",
//   measurementId: "G-247RQN1Y37",
// };

// const firebaseApp = firebase.initializeApp(firebaseConfig);
// const db = firebaseApp.firestore();
// const auth = firebase.auth();
// const provider = new firebase.auth.GoogleAuthProvider();

// export { auth, provider };
// export default db;

//
import * as firebase from "firebase";

// old key
// const firebaseConfig = {
//   apiKey: "AIzaSyAxXYfPSiSH6yUvlmLSp3IYPPV1u7zELh4",
//   authDomain: "whatsapp-clone-e8081.firebaseapp.com",
//   projectId: "whatsapp-clone-e8081",
//   storageBucket: "whatsapp-clone-e8081.appspot.com",
//   messagingSenderId: "212511697708",
//   appId: "1:212511697708:web:ebda213d2caadeb9969a89",
//   measurementId: "G-247RQN1Y37",
// };

// new key
const firebaseConfig = {
  apiKey: "AIzaSyDqeN3ujOt9ebAx0ZNU-zg5rnSSzctSH_g",
  authDomain: "whats-42cd5.firebaseapp.com",
  projectId: "whats-42cd5",
  storageBucket: "whats-42cd5.appspot.com",
  messagingSenderId: "344631671319",
  appId: "1:344631671319:web:1287b10d0f3cbeee0dba52",
  measurementId: "G-XFEBYDY1RV",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider }; // when to put {} and when to not
export default db;
