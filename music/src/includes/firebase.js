import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore, collection } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB3H50lfA12i2slUTuucP8YgNxLYNJGOUI",
  authDomain: "music-5eadf.firebaseapp.com",
  projectId: "music-5eadf",
  storageBucket: "music-5eadf.appspot.com",
  appId: "1:685671300810:web:10101ba984124fc6f03e33"
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

const auth = getAuth()
const db = getFirestore()

const usersCollection = collection(db, "users")

// export as named exports
export { auth, db, usersCollection }
export default firebaseApp