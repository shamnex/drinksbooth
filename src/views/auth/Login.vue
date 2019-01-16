<template>
  <v-app>
    <div justify-center align-center class="login">
      <div class="header"></div>

      <v-container v-if="!isLogin" column class="login-card">
        <v-layout align-center>
          <v-flex :xs6="!$vuetify.breakpoint.smAndDown">
            <div class="login-form pb-3 pl-3">
              <div
                class="stylish-header stylish-header--sm pb-1 stylish-header--border-bottom text-xs-center"
              >Sign up</div>

              <p v-if="isCheckout" class="color-error text-xs-center">
                Please Sign up 
                to continue
              </p>

              <form>
                <v-text-field
                  flat
                  border
                  color="secondary"
                  v-model="firstName"
                  class="mb-0"
                  :error-messages="nameErrors"
                  label="Name"
                  required
                  @input="$v.firstName.$touch()"
                ></v-text-field>

                <!-- <v-text-field
                  flat
                  border
                  color="secondary"
                  
                  v-model="otherNames"
                  class="mb-0 "
                  :error-messages="otherNamesErrors"
                  label="Other Names"
                  required
                  @input="$v.otherNames.$touch()"
                ></v-text-field>-->
                <v-text-field
                  flat
                  border
                  color="secondary"
                  v-model="phone"
                  class="mb-0"
                  :error-messages="phoneErrors"
                  label="Phone Number"
                  type="phone"
                  required
                  @input="$v.phone.$touch()"
                ></v-text-field>

                <v-text-field
                  flat
                  border
                  color="secondary"
                  v-model="email"
                  class="mb-0"
                  :error-messages="emailErrors"
                  label="E-mail"
                  required
                  @input="$v.email.$touch()"
                ></v-text-field>

                <v-text-field
                  class="mb-0 shadow"
                  flat
                  border
                  color="secondary"
                  type="password"
                  v-model="password"
                  :error-messages="passwordErrors"
                  label="Password"
                  required
                  @input="$v.password.$touch()"
                ></v-text-field>

                <v-text-field
                  class="mb-0 shadow"
                  flat
                  border
                  color="secondary"
                  type="password"
                  v-model="confPassword"
                  :error-messages="confPasswordErrors"
                  label="Confirm Password"
                  required
                  @input="$v.confPassword.$touch()"
                ></v-text-field>

                <v-btn
                  flat
                  block
                  class="mt-0 mb-3 mt-2 button button--block button__primary"
                  @click="submit"
                >{{!isLogin? "Register": "Login"}}</v-btn>
              </form>
            </div>

            <div class="login-image signup"></div>
            <div>Already have an account?
              <div @click="isLogin = !isLogin" class="link text-bold">{{isLogin? "Register": "Login"}}</div>
            </div>
          </v-flex>
        </v-layout>
      </v-container>

      <v-container v-if="isLogin" column class="login-card">
        <v-layout align-center>
          <v-flex :xs7="!$vuetify.breakpoint.smAndDown">
            <div class="login-form pt-2 pb-5 pl-2">
              <div
                class="stylish-header stylish-header--sm mb-3 stylish-header--border-bottom text-xs-center"
              >Welcome back</div>

                <p v-if="isCheckout" class="color-error text-xs-center">
                Please  Login
                to continue
              </p>
              <form>
                <v-text-field
                  flat
                  border
                  color="secondary"
                  v-model="email"
                  class="mb-0"
                  :error-messages="emailErrors"
                  label="E-mail"
                  required
                  @input="$v.email.$touch()"
                ></v-text-field>

                <v-text-field
                  class="mb-0 shadow"
                  flat
                  border
                  color="secondary"
                  type="password"
                  v-model="password"
                  :error-messages="passwordErrors"
                  label="Password"
                  required
                  @input="$v.password.$touch()"
                ></v-text-field>
                <!-- <v-text-field
                  class="mb-0 shadow"
                  flat
                  border
                  color="secondary"
                  type="password"
                  v-model="password"
                  :error-messages="passwordErrors"
                  :background-color="$vuetify.breakpoint.smAndDown?'rgba(255,255,255,0.9)': ''"
                  :="!$vuetify.breakpoint.smAndDown"
                  label="Password"
                  required
                  @input="$v.password.$touch()"
                ></v-text-field>-->
                <v-btn
                :disabled="!$v.anyDirty && $v.anyError"
                  flat
                  block
                  class="mt-0 mb-3 button button--block button__primary"
                  @click="submit"
                >{{!isLogin? "Register": "Login"}}</v-btn>

                <v-layout class="remember-me" align-center justify-space-between>
                  <v-flex class="mt-4">
                    <v-checkbox v-model="checkbox" label="Remember me?" class="mt-0"></v-checkbox>
                  </v-flex>
                  <span class="link">Forgot Password??</span>
                </v-layout>
              </form>
            </div>

            <div class="login-image"></div>
            <div>Don't have an account?
              <div @click="isLogin = !isLogin" class="link text-bold">{{isLogin? "Sign Up": "Login"}}</div>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </v-app>
</template>

<script>
import {
  required,
  maxLength,
  email,
  phone,
  minLength,
  sameAs
} from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
import authService from "@/services/auth";


export default {
  mixins: [validationMixin],

  validations: {
    password: { required, minLength: minLength(6) },
    confPassword: {
      required,
      minLength: minLength(6),
      sameAs: sameAs("password")
    },
    address: { required, minLength: minLength(6) },
    userName: { required, minLength: minLength(4) },
    firstName: { required, minLength: minLength(3) },
    otherNames: { required, minLength: minLength(3) },
    phone: { required },
    email: { required, email },
    select: { required },
    checkbox: {
      checked(val) {
        return val;
      }
    }
  },

  data: () => ({
    password: "",
    email: "",
    userName: "",
    confPassword: "",
    address: "",
    phone: "",
    otherNames: "",
    firstName: "",
    checkbox: false,
    isLogin: true
  }),

  computed: {
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required");
      !this.$v.password.minLength &&
        errors.push("Name must be at most 6 characters long");
      return errors;
    },
    confPasswordErrors() {
      const errors = [];
      if (!this.$v.confPassword.$dirty) return errors;
      !this.$v.confPassword.required && errors.push("Password is required");
      !this.$v.confPassword.minLength &&
        errors.push("Name must be at most 6 characters long");
      !this.$v.confPassword.sameAs && errors.push("Passwords does not match");
      return errors;
    },
    otherNamesErrors() {
      const errors = [];
      if (!this.$v.otherNames.$dirty) return errors;
      !this.$v.otherNames.minLength &&
        errors.push("Name must be at most 4 characters long");
      !this.$v.otherNames.required && errors.push("Name is required.");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.firstName.$dirty) return errors;
      !this.$v.firstName.minLength &&
        errors.push("Name must be at most 4 characters long");
      !this.$v.firstName.required && errors.push("Name is required.");
      return errors;
    },
    userNameErrors() {
      const errors = [];
      if (!this.$v.userName.$dirty) return errors;
      !this.$v.userName.minLength &&
        errors.push("Name must be at most 4 characters long");
      !this.$v.userName.required && errors.push("Name is required.");
      return errors;
    },
    phoneErrors() {
      const errors = [];
      if (!this.$v.phone.$dirty) return errors;
      !this.$v.phone.required && errors.push("Name is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    isCheckout() {
      return this.$route.query.nextUrl == "/checkout";
    },

    formHasErrors() {
        console.log(this.$v)
    }
  },

  mounted() {
    console.log(this.$route.query);
            console.log(this.$v)

  },

  methods: {
    submit() {
      this.$v.$touch();
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.select = null;
      this.checkbox = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/abstract/_variables";
@import "../../scss/abstract/_mixins";
.header {
  // background: $color-gradient;
  background: transparent;
  z-index: 1;
  height: 100px;
  //   box-shadow: $box-shadow;
  width: 100vw;
}

.container {
  position: relative;
}

.login {
  height: 100vh;
  &-card {
    width: 80%;
    max-width: 600px;
    // max-height: 600px;

    position: relative;
    background-color: $color-white;
    box-shadow: $box-shadow;
    @include absolutecenter;
    margin-top: 50px;

    overflow-x: hidden;
    overflow-y: hidden;
  }

  &-form {
    z-index: 1;
    @include respond(sm) {
    }
  }

  .remember-me {
    transform: translateY(-30px);
    font-size: 12px;
  }

  &-image {
    position: fixed;
    right: 0;
    background-image: url("/images/26.jpg");
    height: 100%;
    top: 0;
    width: 50%;
    z-index: -10;
    background-size: cover;
    background-position: right center;
    &.signup {
        
        z-index: -10;
        background-image: url("/images/11.jpg");
        width: 70%;
        transform: translate(5%);
    }
    @include respond(sm) {
      width: 70%;
      opacity: 0.2;
    }
  }
}
</style>
