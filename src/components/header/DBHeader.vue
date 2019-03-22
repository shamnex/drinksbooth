<template     
>
  <v-toolbar
    :dark="!isWhite"
    class="db-navbar"
    height="90"
    color="transparent"
    :class="{'fixed': isWhite}"
    flat
    fixed
  >
    <v-toolbar-side-icon
      flat
      v-bind:style="{ color: isWhite? '#23B5DA': '#23B5DA',  }"
      @click.stop="toggleDrawer($event)"
      class="hidden-md-and-up"
    ></v-toolbar-side-icon>
    <v-toolbar-title center>
      <img
        @click="goHome"
        v-show="!isWhite"
        class="db-navbar__brand"
        src="/graphics/new_logo.png"
        alt
        srcset
      >
      <img
        @click="goHome"
        v-show="isWhite"
        class="db-navbar__brand"
        src="/graphics/new_logo.png"
        alt
        srcset
      >
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items
      v-bind:class="{'white': isWhite }"
      class="db-navbar-link-wrapper hidden-sm-and-down"
    >
      <router-link class="db-navbar-link" exact to="/">Home</router-link>

      <router-link class="db-navbar-link" to="/shop/">Shop</router-link>

      <a
        target="_blank"
        class="db-navbar-link"
        v-bind:class="{ 'link-primary': isWhite }"
        href="https://chat-with-agatha.firebaseapp.com/"
      >chat</a>

      <router-link class="db-navbar-link" to="/planner">Party Planner</router-link>
      <v-spacer></v-spacer>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-spacer></v-spacer>

      <v-menu transition="slide-y-transition" bottom>
        <v-btn slot="activator" flat>
          <v-layout>
            <div
              class="link text-bold text-secondary"
              v-bind:style="{ color: isWhite? '#23B5DA': '#23B5DA',  }"
            >Hi! {{getUser.first_name || "Guest"}}</div>
            <!-- <v-avatar size="28"  :color="!isWhite?'primary': '#fff'"> -->
            <!-- <span
              v-bind:style="{ color: !isWhite? '#23B5DA': 'white',  }"
              class="headline"
            >
            {{getUser[0].first_name}}
            </span>-->
            <!-- </v-avatar> -->
          </v-layout>

          <!-- <v-icon flat v-else :color="isWhite?'primary': '#fff'">account_circle</v-icon> -->
        </v-btn>

        <v-list>
          <v-list-tile v-if="!getUser">
            <v-list-tile-title>
              <router-link class="link" to="/login">Login/Signup</router-link>
            </v-list-tile-title>
          </v-list-tile>
          <v-list-tile v-if="getUser">
            <v-list-tile-title>
              <div class="link" @click="signOut">Sign Out</div>
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

      <!-- <v-btn @click="toggleSearch" :flat="isWhite" icon>
        <v-icon :color="isWhite?'primary': '#fff'">search</v-icon>
      </v-btn>-->

      <v-btn @click="toggleOpenCart" :flat="isWhite" icon>
        <span
          v-if="$store.state.itemsInCart.length > 0"
          class="cart-badge"
        >{{$store.state.itemsInCart.length}}</span>
        <v-icon :color="isWhite?'primary': '#fff'">shopping_cart</v-icon>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapGetters } from "vuex";
import AuthService from "@/services/auth";
export default {
  name: "DbHeader",
  components: {},

  data() {
    return {
      isDrawerOpen: false,
      isCartOpen: false,
      scrollOffset: null,

      userMenuItems: [
        { title: "Login / Signup", link: "/login" }
        // { title: "Favorites", link: "/favorites" }
      ]
    };
  },

  methods: {
    goHome() {
      this.$router.push("/");
    },
    toggleDrawer(event) {
      this.isDrawerOpen = !this.isDrawerOpen;
      this.$emit("drawerToggle", this.isDrawerOpen);
    },
    toggleOpenCart(event) {
      this.$store.commit("toggleCart");
    },
    toggleSearch(event) {
      this.$store.commit("toggleSearch");
    },

    signOut() {
      AuthService.signOut();
      this.$router.push("/shop");
      this.$store.commit("setUser", "");
    },
    // onScroll(e) {
    //   this.scrollOffset =
    //     window.pageYOffset || document.documentElement.scrollTop;
    // },
    navigato(e) {
      let route = `${e.target.textContent
        .replace(/&nbsp;/g, " ")
        .replace(" ", "")
        .split()
        .join()
        .toString()
        .toLocaleLowerCase()}`;

      switch (route) {
        case "home":
          {
            route = "/";
          }
          break;
        case "partyplanner":
          {
            route = "/planner";
          }
          break;
        case "shop":
          {
            route = "/shop";
          }
          break;
        case "chat":
          {
            route = "/chat";
          }
          break;
        default: {
          null;
        }
      }
      this.$router.push(route);
    }
  },

  watch: {
    $route(to, from) {}
  },
  mounted() {
    console.log(this.getUser);
  },
  created() {},

  props: {
    isWhite: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    ...mapGetters({
      lastItemIncart: "lastItemIncart",
      getUser: "getUser"
    })
  }
};
</script>

<style  lang="scss" scoped>
@import "../../scss/abstract/_variables";

.db-navbar {
  z-index: 3;
  max-width: 1440px;
  margin: 0 auto;
  left: 50%;
  position: fixed;
  transform: translateX(-50%) !important;

  &.fixed {
    position: fixed;
    transition: all 0.3s ease;
    &::before {
      box-shadow: 0 20px 20px rgba($color-primary, 0.1) !important;
      content: "";
      background: $color-gradient-3;
      width: 305vw !important;
      height: 100%;
      position: absolute;
      left: -40%;
    }

    a {
      text-decoration: none;
      text-align: center !important;

      &.router-link-exact-active,
      &.router-link-active {
        transition: all 0.4s ease;
        font-weight: 700;
        color: $color-primary;
        &::before {
          content: "";
          padding: 15px 10px;
          width: 10px;
          border-bottom: solid 2px $color-primary;
          position: absolute;
          text-align: center;
          height: 100%;
          margin: 0 auto;
          border-bottom: solid 2px $color-primary;
        }

        &.link-primary {
          &::before {
            content: "";

            border-bottom: solid 2px $color-primary;
            padding: 5px;
          }
          font-weight: 700;
          color: $color-primary;
        }
      }
    }
  }

  &-link {
    text-transform: uppercase;
    padding: 10px 20px;
    position: relative;
    transition: all 0.4s ease;

    &::before {
      content: "";
      border-bottom: solid 2px #fff;
      position: absolute;
      text-align: center;
      height: 100%;
      margin: 0 auto;
      border-bottom: solid 2px #fff;
      width: 0%;
      transition: all 0.4s ease;
    }

    &:hover {
      background: rgba($color-primary, 0.1);
      color: $color-white;

      &::before {
        width: 30%;
      }
    }

    &-wrapper {
      align-content: center;
      display: flex;
      flex-direction: row;
      align-items: center;
      background-color: transparent !important;
    }
  }

  &__brand {
    height: 40px;
    cursor: pointer;
    margin-top: 20px;
    @include respond(sm) {
      margin-top: 15px;
      height: 30px;
    }
    @include respond(xs) {
      margin-top: 12.5px;
      height: 25px;
    }
    position: relative;
  }

  a {
    color: rgba(white, 0.4);
    text-decoration: none;
    text-align: center !important;

    &.router-link-exact-active,
    &.router-link-active {
      transition: all 0.4s ease;
      font-weight: 700;
      color: #fff;
      &::before {
        content: "";
        padding: 15px;
        width: 10px;
        border-bottom: solid 2px #fff;
        position: absolute;
        text-align: center;
        height: 100%;
        margin: 0 auto;
        border-bottom: solid 2px #fff;
      }

      &.link-primary {
        &::before {
          content: "";

          border-bottom: solid 2px $color-primary;
          padding: 5px;
        }
        font-weight: 700;
        color: $color-primary;
      }
    }
  }
}

.white {
  a {
    color: rgba($color-white, 0.5);
    text-decoration: none;
    text-align: center !important;

    &.router-link-exact-active,
    &.router-link-active {
      padding: 15px;
      &::before {
        content: "";
        padding: 15px;
        width: 10px;
        position: absolute;
      }
    }
  }
}

.cart-badge {
  background-color: red;
  transform: translate(10px, -10px);
  border-radius: 100%;
  color: #fff;
  font-size: 12px;
  width: 20px;
  height: 20px;
  position: absolute;
}
</style>
