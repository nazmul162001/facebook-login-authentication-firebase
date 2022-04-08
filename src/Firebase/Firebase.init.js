import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyDUMkli1XOopa-G4UU9mf-qK24C14bNDaw",
  authDomain: "email-auth-pracitce.firebaseapp.com",
  projectId: "email-auth-pracitce",
  storageBucket: "email-auth-pracitce.appspot.com",
  messagingSenderId: "128632964436",
  appId: "1:128632964436:web:1aa5d963ed77eeed5974c1"
};

const app = initializeApp(firebaseConfig);

export default app;