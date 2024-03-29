<template>
  <!-- Registration Form -->
  <div
    class="text-white text-center fornt-bold p-4 rounded mb-4"
    v-if="reg_show_alert"
    :class="reg_alert_variant"
  >
    {{ reg_alert_msg }}
  </div>
  <vee-form
    :validation-schema="schema"
    @submit="register"
    :initial-values="userData">
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <vee-field
        type="text"
        name="name"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        :placeholder="$t('register.enter_name')"
      />
      <ErrorMessage class="text-red-600" name="name"/>
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        type="email"
        name="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        :placeholder="$t('register.enter_email')"
      />
      <ErrorMessage class="text-red-600" name="email"/>
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t("register.age") }}</label>
      <vee-field
        type="number"
        name="age"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        :placeholder="$t('register.enter_age')"
      />
      <ErrorMessage class="text-red-600" name="age"/>
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t("register.password") }}</label>
      <vee-field name="password" :bails="false" v-slot="{ field, errors }">
        <input class="block w-full py-1.5 px-3 text-gray-800 border
          border-gray-300 transition duration-500 focus:outline-none
          focus:border-black rounded"
          type="password"
          :placeholder="$t('register.enter_password')"
          v-bind="field" />
        <div class="text-red-600" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </vee-field>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t("register.confirm_password") }}</label>
      <vee-field
        type="password"
        name="confirm_password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        :placeholder="$t('register.confirm_password')"
      />
      <ErrorMessage class="text-red-600" name="confirm_password"/>
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t("register.country") }}</label>
      <vee-field as="select" name="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="USA">{{ $t("register.country_usa") }}</option>
        <option value="Mexico">{{ $t("register.country_mexico") }}</option>
        <option value="Germany">{{ $t("register.country_germany") }}</option>
        <option value="Antarctica">{{ $t("register.country_antarctica") }}</option>
      </vee-field>
      <ErrorMessage class="text-red-600" name="country"/>
    </div>
    <!-- UserType -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t("register.user_type") }}</label>
      <vee-field as="select" name="user_type"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="listener">{{ $t("register.user_type_a") }}</option>
        <option value="artist">{{ $t("register.user_type_b") }}</option>
        <option value="label">Label</option>
      </vee-field>
      <ErrorMessage class="text-red-600" name="user_type"/>
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <vee-field type="checkbox" name="tos" value="1"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded inline-block" />
      <i18n-t class="inline-block" keypath="register.accept" tag="label">
        <a href="#">{{ $t("register.tos") }}</a>
      </i18n-t>
      <ErrorMessage class="text-red-600 block" name="tos"/>
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="reg_in_submission"
    >
      {{ $t("song.submit_btn") }}
    </button>
  </vee-form>
</template>

<script>
import { mapActions } from "pinia"
import useUserStore from "@/stores/user"

export default {
  name: "RegisterForm",
  data() {
    return {
      tab: "login",
      schema: {
        name: "required|min:3|max:100|alpha_spaces",
        email: "required|min:3|max:100|email",
        age: "required|min_value:18|max_value:100",
        password: "required|min:9|max:100|excluded:password",
        confirm_password: "passwords_mismatch:@password",
        country: "required|country_excluded:Antarctica",
        user_type: "required|user_type_excluded:label",
        tos: "tos",
      },
      userData: {
        country: 'USA',
        user_type: 'listener',
      },
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_variant: "bg-blue-500",
      reg_alert_msg: "Please wait! Your account is being created.",
    };
  },
  methods: {
    ...mapActions(useUserStore, {
      createUser: "register",
    }),
    async register(values) {
      this.reg_show_alert = true;
      this.reg_in_submission = true;
      this.reg_alert_variant = "bg-blue-500";
      this.reg_alert_msg = "Please wait! Your account is being created.";

      try {
        await this.createUser(values);
      } catch (error) {
        this.reg_in_submission = false;
        this.reg_alert_variant = 'bg-red-500';
        this.reg_alert_msg = 'An unexpected error occured. Please try again later.';
        return;
      }

      this.reg_alert_variant = "bg-green-500";
      this.reg_alert_msg = "Success! Your account has been created.";
      window.location.reload();
    },
  },
}
</script>