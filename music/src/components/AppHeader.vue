<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link
        class="text-white font-bold uppercase text-2xl mr-4"
        :to="{ name: 'home'}"
        exact-active-class="no-active"
        >
        Music
      </router-link>

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li>
            <router-link
              class="px-2 text-white"
              :to="{ name: 'about'}"
              >
              {{ $t("header.about") }}
            </router-link>
          </li>
          <li v-if="!userStore.userLoggedIn">
            <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal">{{ $t("auth.login") }} / {{ $t("auth.register") }}</a>
          </li>
          <template v-else>
            <li>
              <router-link
              class="px-2 text-white"
              :to="{ name: 'manage'}"
              >
              {{ $t("header.manage") }}
            </router-link>
            </li>
            <li>
              <a
                class="px-2 text-white"
                href="#"
                @click.prevent="signOut"
                >
                {{ $t("auth.logout") }}
              </a>
            </li>
          </template>
        </ul>
        <ul class="ml-auto">
          <li>
            <a class="px-2 text-white" href="#" @click.prevent="changeLocale">
              {{ currentLocale }}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapStores, mapWritableState } from "pinia"
import useModalStore from "@/stores/modal"
import useUserStore from "@/stores/user"

export default {
  name: "AppHeader",
  computed: {
    ...mapStores(useModalStore, useUserStore),
    ...mapWritableState(useModalStore, ["isOpen"]),
    currentLocale() {
      return this.$i18n.locale === "de" ? "Deutsch" : "English";
    },
  },
  methods: {
    toggleAuthModal() {
      // this.modalStore.isOpen = !this.modalStore.isOpen; // if using mapStores
      this.isOpen = !this.isOpen; // if using mapWritableState
    },
    signOut() {
      this.userStore.signOut();

      // console.log(this.$route);
      if(this.$route.meta.requiresAuth) {
        this.$router.push({ name: 'home' });
      }
    },
    changeLocale() {
      this.$i18n.locale = this.$i18n.locale === "de" ? "en" : "de";
    },
  }
}
</script>