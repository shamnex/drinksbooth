<template>
  <div>
    <v-content>
      <db-slider></db-slider>

      <div class="section__planner">
        <!-- <v-parallax height="100%" src="images/planner.jpg" >
        </v-parallax>-->
        <div class="section__planner__background"></div>
        <div class="section__planner__content">
          <v-container>
            <p class="stylish-header text-xs-center">ONE FAMILY</p>
            <v-layout align-center justify-center row wrap>
              <v-flex justify-center align-content-center>
                <p class="text-xs-center mb-4 description">
                  Our community is the basis for Rowket Market. We have
                  Collectors, NFT Artsts, Marketers and all in all amazing
                  people. Join our Telegram channel or follow us on Twitter. And
                  don’t forget to share.
                </p>

                <div class="text-center">
                  <a
                    class="button"
                    target="_blank"
                    href="http://bit.ly/RowketCommunity"
                    >Join the community</a
                  >
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </div>
      </div>
    </v-content>
  </div>
</template>

<script>
import DbSlider from "../components/slider/DBSlider";
import ItemCard from "../components/item_card/ItemCard";

export default {
  components: {
    DbSlider,
    ItemCard,
  },

  data() {},

  methods: {
    submit() {},
    navigateTo(route) {
      this.$router.push(`/${route}`);
    },
  },

  mounted() {},

  created() {},
};
</script>

<style lang="scss" >
@import "../scss/abstract/_variables";
@import "../scss/abstract/_mixins";

.section__new {
  //   position: relative;
  min-height: 100vh;

  .swiper-slide {
    max-width: 400px;
    // margin: 0 40px;
    margin-bottom: 80px;
    @include respond(sm) {
      width: 300px;
    }
  }

  .swiper-pagination {
    bottom: 0;
  }
  .container {
    position: absolute;
  }
}

.section__planner {
  min-height: 70vh;
  color: #fff;
  position: relative;

  background-size: cover;
  &__background {
    background-color: #fff;
    // background-image: url("/images/4.jpg");
    background-size: cover;
    height: 70vh;
    background-attachment: fixed;
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    opacity: 1;
    &::before {
      content: "";
      width: 100%;
      position: absolute;
      left: 0;
      height: 100%;
      opacity: 0.8;
    }
    background-blend-mode: multiply;
  }
  &__content {
    .stylish-header {
      color: $color-secondary;
    }

    position: absolute;
    margin: 0 auto;
    width: 100%;
    font-size: 16px;
    color: #000;
    @include absolutecenter;

    .button {
      position: relative;
      text-align: right;
      color: white;
      background-color: $color-secondary;
      //   display: block;
      font-weight: 700;
      padding: 16px 34px;
      transition: color 0.3s, background 0.3s;
      border: solid 2px $color-secondary;
      border-radius: 30px;
      margin: 40px 40px;
    }
  }
}

.section__subscribe {
  padding: 10vh 0;
  position: relative;
  background-size: cover;
  position: relative;

  p {
    max-width: 400px;
    margin: 0 auto;
  }
}
</style>
