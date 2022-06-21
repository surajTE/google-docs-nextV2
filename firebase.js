import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCVwKV8anbcx-TfjV55t3jhYybuOC8DJFE",
  authDomain: "docs-f3a9e.firebaseapp.com",
  projectId: "docs-f3a9e",
  storageBucket: "docs-f3a9e.appspot.com",
  messagingSenderId: "653695744494",
  appId: "1:653695744494:web:dd97607af808af6fe176ff"
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
