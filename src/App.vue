<template>
  <div v-bind:class="{ 'disableScroll': isCartOpen || isSearchOpen }">
    <v-app class="body" id="#app">
      <cart></cart>

      <transition name="fade">
        <div v-show="isSearchOpen" class="search-wrapper">
          <div class="search">
            <div ref="searchBackground" class="search-background"></div>
            <div class="search-content">
              <v-btn
                v-if="isSearchOpen"
                @click="$store.commit('toggleSearch')"
                flat
                large
                color="#fff"
                icon
                class="search-close-btn"
              >
                <v-icon ref="closeBtn" flat large>close</v-icon>
              </v-btn>

              <div
                ref="searchTitle"
                class="stylish-header search-title stylish-header--sm stylish-header--border-bottom-white color-white text-xs-center"
              >Search</div>
              <v-container>
                <v-layout class="search-body" ref="searchBody" column>
                  <v-flex class="pa-5">
                    <v-text-field
                      color="#fff"
                      flat
                      append-icon="search"
                      dark
                      v-model="search"
                      @keyup="searchInput($event)"
                      placeholder="E.g Moet & Chandon"
                    ></v-text-field>
                  </v-flex>
                  <!-- <v-container  v-bind="{ [`grid-list-xl`]: true }" fluid>
                    <v-layout row wrap>
                        <v-flex
                        v-for="n in 12"
                        :key="n"
                        xs12
                        sm6
                        md4
                        lg4

                        >
                        <item-card
                        size="lg"
                        :type=1

                        ></item-card>
                        </v-flex>
                    </v-layout>
                  </v-container>-->
                </v-layout>
              </v-container>
            </div>
          </div>
        </div>
      </transition>

      <db-header
        v-if="!$route.fullPath.includes('/chat')"
        @drawerToggle="drawer = !drawer"
        :isWhite="isHeaderDark || scrollOffset > 300"
      ></db-header>
      <v-navigation-drawer class="drawer" v-model="drawer" absolute temporary>
        <v-layout column class="drawer-items-list">
          <img class="drawer-logo" src="/graphics/logo_white.svg" alt srcset>
          <v-list-tile class="drawer-item-wrapper">
            <router-link class="drawer-item" to="/">
              <v-list-tile-content>
                <v-list-tile-title>Home</v-list-tile-title>
              </v-list-tile-content>
            </router-link>
          </v-list-tile>

          <v-list-tile class="drawer-item-wrapper">
            <router-link class="drawer-item" to="/shop">
              <v-list-tile-content>
                <v-list-tile-title>Shop</v-list-tile-title>
              </v-list-tile-content>
            </router-link>
          </v-list-tile>

          <v-list-tile class="drawer-item-wrapper">
            <router-link class="drawer-item" to="/planner">
              <v-list-tile-content>
                <v-list-tile-title>Planner</v-list-tile-title>
              </v-list-tile-content>
            </router-link>
          </v-list-tile>

          <v-list-tile class="drawer-item-wrapper">
            <router-link class="drawer-item" to="/chat">
              <!-- <router-link class="drawer-item" to="/chat" target="_blank"> -->
              <v-list-tile-content>
                <v-list-tile-title>Chat</v-list-tile-title>
              </v-list-tile-content>
            </router-link>
          </v-list-tile>
        </v-layout>
      </v-navigation-drawer>

      <router-view v-blur="blurConfig"/>
      <div v-if="!isHeaderDark" class="sponsors">
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide class="swiper-slide" v-for="(sponsor, i) in sponsors" :key="i">
            <img class="sponsor__image" :src="sponsor.image">
          </swiper-slide>

          <!-- <div class="swiper-pagination" slot="pagination"></div> -->
        </swiper>
      </div>
      <db-footer v-if="!$route.fullPath.includes('/chat')"></db-footer>
      <v-snackbar
        color="white"
        class="box-shadow"
        v-model="snackbar"
        multi-line
        right
        top
        :timeout="6000"
      >
        <div class="color-primary">
          You added
          <span class="text-bold">{{ itemInCart }}</span>
          to the cart
        </div>
        <v-btn class="button button__primary" flat @click="viewCart">View Cart</v-btn>

        <v-btn flat color="primary" button @click="snackbar = false">close</v-btn>
      </v-snackbar>
    </v-app>
  </div>
</template>

<script>
import DbHeader from "./components/header/DBHeader";
import DbFooter from "./components/footer/DbFooter";
import ItemCard from "./components/item_card/ItemCard";
import Cart from "./components/cart/Cart";
import WebFontLoader from "webfontloader";
import anime from "animejs";
import store from "./store.js";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { mapGetters } from "vuex";

import AuthService from "@/services/auth";

export default {
  name: "App",
  components: {
    DbHeader,
    Cart,
    ItemCard,
    DbFooter,
    swiper,
    swiperSlide
  },

  store,
  mounted() {
    WebFontLoader.load({
      google: {
        families: ["Montserrat:300,400,700", "Dynalight:400"]
      },
      active: this.setFontLoaded
    });

    this.blurConfig = {
      isBlurred: false, // activate and deactivate blur directive example 2
      opacity: 1,
      filter: "contrast(160%) brightness(40%)",
      transition: "all .3s linear"
    };

    window.addEventListener("scroll", this.onScroll);
  },
  data() {
    return {
      sideBarElement: null,
      drawer: null,
      route: "",
      itemInCart: "",
      snackbar: false,
      scrollOffset: 0,
      search: "",
      blurConfig: {},
      swiperOption: {
        freeMode: false,
        slidesPerView: this.$vuetify.breakpoint.smAndDown ? 2 : 5,
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        }
      },
      sponsors: [
        {
          image: "/images/sponsors/img-1.png"
        },
        {
          image: "/images/sponsors/img-2.png"
        },
        {
          image: "/images/sponsors/img-3.png"
        },
        {
          image: "/images/sponsors/img-4.png"
        },
        {
          image: "/images/sponsors/img-6.png"
        },
        {
          image: "/images/sponsors/img-9.png"
        },
        {
          image: "/images/sponsors/img-11.png"
        },
        {
          image: "/images/sponsors/img-12.png"
        },
        {
          image: "/images/sponsors/img-13.png"
        },
        {
          image: "/images/sponsors/img-14.png"
        },
        {
          image: "/images/sponsors/img-15.png"
        },
        {
          image: "/images/sponsors/img-16.png"
        },
        {
          image: "/images/sponsors/img-17.png"
        }
      ]
    };
  },
  created() {
    const user = AuthService.getUser()
    this.$store.commit('setUser', user.data[0])
  },
  methods: {
    viewCart() {
      this.$store.commit("toggleCart");
      this.snackbar = false;
    },
    searchInput(e) {
      this.$router.replace(this.$route.path + `?search=${e.target.value}`);
    },
    setFontLoaded() {
      this.$emit("font-loaded");
    },

    navigateTo(route) {
      this.$router.push("/" + route);
    },
    onScroll(e) {
      this.scrollOffset =
        window.pageYOffset || document.documentElement.scrollTop;
    }
  },

  computed: {
    ...mapGetters({
      lastItemIncart: "lastItemIncart",
      getUser: "getUser"
    }),
    isHeaderDark: {
      // getter
      get: function() {
        return (
          this.$route.fullPath.includes("/buy/") ||
          this.$route.fullPath.includes("/login") ||
          this.$route.fullPath.includes("/signup") ||
          this.$route.fullPath.includes("/chat") ||
          this.$route.fullPath.includes("/search") ||
          this.$route.fullPath.includes("/favorites") ||
          this.$route.fullPath.includes("/checkout")
        );
      }
    },

    isCartOpen() {
      return this.$store.state.cartOpen;
    },
    isSearchOpen() {
      return this.$store.state.searchOpen;
    },

    cart() {
      return this.$store.state.itemsInCart;
    }
  },
  watch: {
    isCartOpen(newCount, oldCount) {
      this.blurConfig.filter = " contrast(160%) brightness(40%)";
      this.blurConfig.isBlurred = this.isCartOpen;
    },
    isSearchOpen(newCount, oldCount) {
      this.blurConfig.isBlurred = this.isSearchOpen;
      this.blurConfig.filter = "contrast(160%) brightness(10%)";

      anime({
        targets: [this.$refs.searchTitle, this.$refs.searchBody],
        translateY: this.isSearchOpen ? "0" : "100vh",
        duration: 600,
        easing: "easeInOutQuint",
        delay: function(el, i, l) {
          return i * 200;
        }
      });

      //   this.blurConfig.filter = "blur(5px) contrast(160%) brightness(40%)";
    },
    lastItemIncart(newValue, oldValue) {},
    $route(to, from) {
      window.scrollTo(0, 0);
      //   console.log(to.query.search);
    }
  }
};
</script>

<style  lang="scss">
@import "./scss/main";

.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 1s;
}
.fade-leave {
}

.fade-leave-active {
  transition: opacity 1s;
  opacity: 0;
}

.search {
  &-wrapper {
    position: fixed;
    z-index: 99;
    left: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    background-color: transparent;
  }

  &-body,
  &-title {
    transform: translateY(100vh);
  }

  &-background {
    left: 0;
    opacity: 0.95;
    right: 0;
    width: 100vw;
    height: 100vh;
    background: $color-gradient-2;
    z-index: -1;
    position: absolute;
  }
  &-close-btn {
    color: $color-white;
    position: absolute;
    left: 90vw;
    width: 100%;
    display: none;
    margin-right: 20px;
    transform: scale(1.5);
    top: 10px;
    @include respond(xs) {
      left: 80vw;
    }
  }

  &-content {
    z-index: 120;
    position: relative;
    width: 100%;
    height: 100%;
  }
}

.disableScroll {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.drawer {
  z-index: 1000 !important;
  &-logo {
    background: $color-gradient-2;
    padding: 40px 40px;
  }
}
.drawer-items-list {
  padding: 0;
}
.drawer-item {
  width: 100%;
  margin: 0 !important;
  color: lighen($color-primary, 10);
  padding: 0 15px;
  &-wrapper {
    padding: 0 0px 20px;
    position: relative;
  }
  &.router-link-exact-active {
    font-weight: 700;
    color: $color-primary !important;
    &::before {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      //   background: rgba($color-primary, 0.1);
      background: $color-background;
      right: 0;
      bottom: 0;
    }
    &::after {
      content: ""; // background-color: rgba($color-primary, 0.08);
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
    }
  }
}

.sponsors {
  overflow: hidden;
  background-color: #fff;
  padding: 60px;
  display: flex;
  justify-items: center;
}

.sponsor__image {
  cursor: pointer;
  filter: grayscale(100%);
  margin: 0 auto;
  &:hover {
    filter: grayscale(0);
  }
}
</style>

