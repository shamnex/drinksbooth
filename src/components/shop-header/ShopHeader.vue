<template>
  <div v-bind:style="{ height: `${height}` }" class="inner-header">
    <div class="inner-header__content">
      <div class="normal-header normal-header--sm color-white text-xs-center">{{title}}</div>
      <v-layout v-if="hasSearch" align-center justify-center row>
        <v-flex justify-center md6 xs8>
          <v-layout>
            <v-text-field
              color="#fff"
              bottom
              flat
              height="30px"
              append-icon="search"
              dark
              placeholder="Search"
              required
              v-model="search_q"
              v-on:keyup="goTo(search_q)"
            ></v-text-field>

            <!-- <v-text-field
                        color="#fff"
                        background-color="rgba(255,255,255,0.3)"
                        bottom
                        flat
                        solo
                        height="30px"
                        append-icon="search"
                        dark
                        placeholder="Search"
                        required
            ></v-text-field>-->
          </v-layout>
        </v-flex>
      </v-layout>
    </div>
    <!-- <v-parallax class="inner-header__background--parallax" src="images/planner.jpg" >
    </v-parallax>-->
    <!-- <video-bg :sources="['videos/drip_4.mp4']" img="videos/drip_4.png">
    </video-bg>-->
    <div v-bind:style="{ backgroundImage: `url(${image})` }" class="inner-header__background"></div>
  </div>
</template>

<script>
import VideoBg from "vue-videobg";

export default {
  components: {
    VideoBg
  },
  name: "ShopHeader",
  data: function() {
    return {
      search_q: ""
    };
  },
  methods: {
    goTo(cat) {
      this.$router.push("search?q=" + cat);
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    hasSearch: {
      type: Boolean,
      default: false
    },

    image: {
      type: String,
      default: "images/drinks/1.png"
    },
    height: {
      type: String,
      default: "40vh"
    }
    // ,
    // search_q: {
    //     type: String,
    //     default: ''
    // }
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/abstract/_variables";
@import "../../scss/abstract/_mixins";
.inner-header {
  padding-top: 100px;
  position: relative;

  &__content {
    z-index: 1;
    width: 100%;
    @include absolutecenter;
  }

  &__categories {
    margin-top: 5px;
    padding: 15px 30px;
    display: flex;
    font-size: 12px;
    justify-content: center;
    align-items: center;
    overflow-y: hidden;
    overflow-x: scroll;
    background-image: linear-gradient(
      to right,
      #232f32,
      #414355,
      $color-secondary
    );

    p {
      color: rgba(#fff, 0.7);
      margin: 0 10px;
      cursor: pointer;
      min-width: 100px;
      &:hover {
        color: #fff;
      }
    }
  }
  &__background {
    top: 0;
    background-size: cover;
    height: 100%;
    width: 100%;
    background-image: url("/images/champagne.jpg");
    position: absolute;
    background-position: center right;
    &::after {
      content: "";
      height: 100%;
      width: 100%;
      position: absolute;
      left: 0;
      opacity: 0.6;
      background-image: $color-gradient-2;
    }
    &::before {
      content: "";
      position: absolute;
      height: 50%;
      z-index: 2;
      width: 100%;
      background: linear-gradient(to bottom, $color-primary, rgba(red, 0));
    }
    // background: $color-gradient-2;
  }
  &__background--parallax {
    background-position: center right;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    &::before {
      content: "";
      position: absolute;
      height: 50%;
      z-index: 2;
      width: 100%;
      background: linear-gradient(to bottom, $color-primary, rgba(red, 0));
    }
  }

  &::after {
    content: "";
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0.3;
    background-image: $color-gradient-2;
  }
}
</style>
