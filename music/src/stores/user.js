import { defineStore } from 'pinia';
import { auth, usersCollection } from "@/includes/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { addDoc } from "firebase/firestore"

export default defineStore('user', {
  state: () => ({
    userLoggedIn: false,
  }),
  actions: {
    async register(values) {
      await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      );

      await addDoc(usersCollection, {
        name: values.name,
        email: values.email,
        age: values.age,
        country: values.country,
        user_type: values.user_type,
      });

      this.userLoggedIn = true;
    }
  }
});