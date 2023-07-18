import { defineStore } from 'pinia';
import { auth, usersCollection } from "@/includes/firebase"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { setDoc, doc } from "firebase/firestore"

export default defineStore('user', {
  state: () => ({
    userLoggedIn: false,
  }),
  actions: {
    async register(values) {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      );

      const newDocument = doc(usersCollection, userCred.user.uid)

      await setDoc(newDocument, {
        name: values.name,
        email: values.email,
        age: values.age,
        country: values.country,
        user_type: values.user_type,
      });

      await updateProfile(userCred.user, {
        displayName: values.name
      })

      this.userLoggedIn = true;
    }
  }
});