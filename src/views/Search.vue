<template>
  <v-app>
    <div justify-center align-center class="login">
      <div class="header"></div>

      <v-container v-if="!isLogin" column class="login-card">
        <v-layout align-center>
          <v-flex :xs8="!$vuetify.breakpoint.smAndDown">
        
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
@import "../scss/abstract/_variables";
@import "../scss/abstract/_mixins";
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
