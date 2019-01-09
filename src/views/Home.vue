<template>
  <div>
    <v-content>
      <db-slider></db-slider>
      <v-container
        v-bind:fluid="$vuetify.breakpoint.mdAndDown"
        class="section__new"
        justify-center
        align-center
      >
        <p class="stylish-header stylish-header--border-bottom text-xs-center pt-4 ma-5">New Items</p>
        <v-layout class="mb-5">
          <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide class="swiper-slide" v-for="(item, i) in items" :key="i">
              <item-card
                :size="$vuetify.breakpoint.smAndDown?'sm':'lg'"
                :type="$vuetify.breakpoint.xsOnly? 3:1"
                :name="item.name"
                :price="item.price"
                :isFavorite="item.isFavorite"
                :image="item.image"
              ></item-card>
            </swiper-slide>

            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>

          <!-- <v-layout class="pa-5 ma-5" v-else justify-center align-center>
            <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
          </v-layout>-->
        </v-layout>

        <div class="text-xs-center mt-5">
          <v-btn flat large @click="$router.push('/shop')" class="button__primary">View All</v-btn>
        </div>
      </v-container>

      <div class="section__planner">
        <!-- <v-parallax height="100%" src="images/planner.jpg" >
        </v-parallax>-->
        <div class="section__planner__background"></div>
        <div class="section__planner__content">
          <v-container>
            <p class="stylish-header color-white text-xs-center">Party Planner</p>
            <v-layout align-center justify-center row wrap>
              <v-flex justify-center align-content-center>
                <div
                  class="text-xs-center mb-5"
                >Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam consequatur temporibus iure deserunt laboriosam, modi, cupiditate doloremque quidem eligendi minima iste asperiores adipisci dolores. Sint perspiciatis ab ipsa aspernatur nisi.</div>

                <div class="text-center">
                  <v-btn @click="navigateTo('planner')" flat large outline color="#fff">GET STARTED</v-btn>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </div>
      </div>

      <!-- <div  class="section__subscribe">
            <v-container justify-center align-center>
                <v-layout justify-center align-center>
                           <v-flex>
                    <div class="stylish-header text-center mb-3">
                                Drinks On Us
                    </div>

                <p class=" text-center mb-5"> Lorem ipsum dolor sitspernatur, option. </p>

                <v-layout  align-center justify-center row >
                    <v-flex justify-center  xs6>
                        <form>

                            <v-layout>

                            <v-text-field
                            placeholder="enter your email"
                            class="input__field"

                            ></v-text-field>

                            <v-btn flat large class="button button__primary" @clBick="submit">submit</v-btn>
                            </v-layout>
                        </form>
                    </v-flex>
                </v-layout>
                </v-flex>
                </v-layout>
            </v-container>

      </div>-->
      <!-- <div class="section__subscribe">
        <v-container justify-center align-center>
          <v-layout justify-center align-center>
            <v-flex>
              <div class="stylish-header text-center mb-3">Drinks On Us</div>

              <p class="text-center mb-5">Lorem ipsum dolor sitspernatur, option.</p>

              <v-layout align-center justify-center row>
                <v-flex justify-center xs6>
                  <form>
                    <v-layout>
                      <v-text-field placeholder="enter your email" class="input__field"></v-text-field>

                      <v-btn flat large class="button button__primary" @click="submit">submit</v-btn>
                    </v-layout>
                  </form>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </div>-->
    </v-content>
  </div>
</template>

<script>
import DbSlider from "../components/slider/DBSlider";
import ItemCard from "../components/item_card/ItemCard";
import { ItemModel } from "../components/item_card/ItemCard.vue";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  components: {
    DbSlider,
    ItemCard,
    swiper,
    swiperSlide
  },

  data() {
    return {
      items: [
        {
          name: "Drink 1",
          isFavorite: true,
          price: "32000",
          image: "images/drinks/1.png"
        },
        {
          name: "Drink 3",
          isFavorite: false,
          price: "32000",
          image: "images/drinks/2.png"
        },
        {
          name: "Drink 2",
          isFavorite: true,
          price: "32000",
          image: "images/drinks/3.png"
        },
        {
          name: "Drink 2",
          isFavorite: true,
          price: "32000",
          image: "images/drinks/3.png"
        },
        {
          name: "Drink 2",
          isFavorite: true,
          price: "32000",
          image: "images/drinks/3.png"
        }
      ],
      swiperOption: {
        freeMode: false,
        slidesPerView: "auto",
        loop: true,
        // autoplay: {
        //   delay: 2500,
        //   disableOnInteraction: true
        // },

        pagination: {
          el: ".swiper-pagination",
          dynamicBullets: true
        }
      }
    };
  },

  methods: {
    submit() {},
    navigateTo(route) {
      this.$router.push(`/${route}`);
    }
  },

  mounted() {},

  created() {}
};
</script>

<style lang="scss" >
@import "../scss/abstract/_variables";
@import "../scss/abstract/_mixins";

.section__new {
  //   position: relative;
  min-height: 100vh;

  .swiper-slide {
    max-width:400px;
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
  min-height: 80vh;
  color: #fff;
  position: relative;

  // background-color: red;
  background-size: cover;
  &__background {
    background-color: $color-primary;
    background-image: url("/images/6.jpg");
    background-size: cover;
    height: 80vh;
    background-attachment: fixed;
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    opacity: 0.8;
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
    position: absolute;
    margin: 0 auto;
    width: 100%;
    @include absolutecenter;
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
