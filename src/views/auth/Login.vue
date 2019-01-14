<template>
  <v-app>
    <div justify-center align-center class="login">
      <div class="header"></div>

      <v-container v-if="!isLogin" column class="login-card">
        <v-layout align-center>
          <v-flex :xs8="!$vuetify.breakpoint.smAndDown">
            <div class="login-form pt-5 pb-5 pl-sm-1 pr-sm-1">
              <div
                class="stylish-header stylish-header--sm  pb-3 stylish-header--border-bottom text-xs-center"
              >Sign up</div>
              <form>
                <v-text-field
                  append-icon="email"
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
                  append-icon="lock"
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
                  append-icon="lock"
                  flat
                  border
                  color="secondary"
                  type="password"
                  v-model="confPassword"
                  :error-messages="passwordErrors"
                  
                  label="Confirm Password"
                  required
                  @input="$v.confPassword.$touch()"
                ></v-text-field>
                <!-- <v-text-field
                  class="mb-0 shadow"
                  append-icon="lock"
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
                  flat
                  block
                  class="mt-0 mb-3 mt-2 button button--block button__primary"
                  @click="submit"
                >{{!isLogin? "Register": "Login"}}</v-btn>
                <v-layout align-end just>
                  <v-flex xs6>
                    <v-checkbox v-model="checkbox" label="Remember me?" class="mt-0"></v-checkbox>
                  </v-flex>
                </v-layout>
              </form>
            </div>

            <div class="login-image"></div>
             <div>Already have an account?
              <div @click="isLogin = !isLogin" class="link">{{isLogin? "Register": "Login"}}</div>
            </div>
          </v-flex>
        </v-layout>
      </v-container>

      <v-container v-if="isLogin" column class="login-card">
        <v-layout align-center>
          <v-flex :xs8="!$vuetify.breakpoint.smAndDown">
            <div class="login-form pt-5 pb-5 pl-4 pr-4">
              <div
                class="stylish-header stylish-header--sm mb-5 stylish-header--border-bottom text-xs-center"
              >welcome back</div>
              <form>
                <v-text-field
                  append-icon="email"
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
                  append-icon="lock"
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
                  append-icon="lock"
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
              <div @click="isLogin = !isLogin" class="link">{{isLogin? "Register": "Login"}}</div>
            </div>
          </v-flex>
          
        </v-layout>
      </v-container>
    </div>
  </v-app>
</template>

<script>
import { required, maxLength, email } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";

export default {
  mixins: [validationMixin],

  validations: {
    password: { required, minLength: maxLength(6) },
    confPassword: { required, minLength: maxLength(6) },
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
    confPassword: "",
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
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    }
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
  background: $color-white;
  z-index: 1;
  height: 100px;
  box-shadow: $box-shadow;
  width: 100vw;
}

.container {
  position: relative;
}

.login {
  height: 100vh;
  &-card {
    width: 80%;
    max-width: 800px;
    max-height: 600px;

    position: relative;
    background-color: $color-white;
    box-shadow: $box-shadow;
    @include absolutecenter;
    margin-top: 50px;

    overflow: hidden;
  }

  &-form {
    z-index: 1;
    @include respond(sm) {
    }
  }

  .remember-me {
    transform: translateY(-30px);
  }

  &-image {
    position: absolute;
    right: 0;
    background-image: url("/images/26.jpg");
    height: 60vh;
    top: 0;
    width: 40%;
    background-size: cover;
    z-index: -10;
    background-position: right center;
    @include respond(sm) {
      width: 70%;
      opacity: 0.2;
    }
  }
}
</style>
