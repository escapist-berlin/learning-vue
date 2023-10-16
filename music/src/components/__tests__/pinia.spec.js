import { setActivePinia, createPinia } from "pinia";
import useUserStore from "@/stores/user";
import { describe, test, expect, toBe, beforeEach, vi } from "vitest";
import { auth as firebaseAuth } from "@/includes/firebase"

vi.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: () => Promise.resolve(),
}))

vi.mock('@/includes/firebase', () => ({
  auth: {}
}))

describe("stores", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test("authenticates user", async () => {
    const store = useUserStore();

    expect(store.userLoggedIn).not.toBe(true);
    await store.authenticate({ email: "test@example.com", password: "password" });
    expect(store.userLoggedIn).toBe(true);
  });

})