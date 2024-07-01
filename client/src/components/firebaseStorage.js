import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = initializeApp({
  apiKey: "AIzaSyANuQ_g1XkLFF4DyDQ9gQRp7GBpOYKEhXA",
  authDomain: "university-4c2c8.firebaseapp.com",
  projectId: "university-4c2c8",
  storageBucket: "university-4c2c8.appspot.com",
  messagingSenderId: "979960293475",
  appId: "1:979960293475:web:97d54bd8b5e8f0824ff056",
  measurementId: "G-K9WRN9F378",
});

const storage = getStorage(firebaseConfig);
export default storage;
