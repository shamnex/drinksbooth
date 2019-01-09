<template>
<v-app>
<shop-header

 :title="routeName"
 :hasSearch="true"
 height="40vh"
 image="/images/champagne.jpg"

></shop-header>
 <div   class="categories-header">

         <!-- <router-link  :key="index" v-for="(cat, index) of categories"
           class="categories-header__link" :to="'/shop/'+cat" append @click="goTo(cat)">{{cat}}</router-link> -->

     <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide class="categories-header__link"  :key="index" v-for="(cat, index) of categories">
            <router-link
           class="categories-header__link" :to="'/shop/'+cat" append @click="goTo(cat)">{{cat}}</router-link>
        </swiper-slide>
    </swiper>
  </div>

    <router-view></router-view>

</v-app>
</template>

<script>
import ShopHeader from '../../components/shop-header/ShopHeader'
import 'swiper/dist/css/swiper.css'
import ItemCard from '../../components/item_card/ItemCard'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  data: () => ({
    items: ['Most Popular', 'Best Seller', 'Lowest Price', 'Highest Price'],
    page: 1,
    swiperOption: {
      freeMode: false,
      slidesPerView: 'auto',
      loop: true,

      pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true
      }
    },
    categories: [
      'Cognac',
      'Champagne',
      'Whisky',
      'Wines',
      'Sparkling Wine',
      'Beers & Ciders',
      'Spirits',
      'Mixers & Soft Drinks',
      'Promos & Gift Ideas',
      'Spirit Magazine'
    ]
  }),
  components: {
    ShopHeader,
    ItemCard,
    swiper,
    swiperSlide
  },
  methods: {
    search () {
      console.log('search')
    },
    goTo (link) {
      this.$router.push(route)
    }
  },
  watch: {
    $route (to, from) {
      this.route = to
    }
  },

  computed: {
    routeName: function () {
      return this.$route.params.category === undefined
        ? 'Shop'
        : this.$route.params.category
    },
   
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/abstract/_variables";

.categories-header {
  margin-top: 5px;
  font-size: 12px;
  justify-content: center;
  align-items: center;
  overflow-y: hidden;
  overflow-x: hidden;
  background-image: linear-gradient(
    to right,
    #232f32,
    #414355,
    $color-secondary
  );

  &__link {
    padding: 15px 0;
    color: rgba(#fff, 0.7);
    margin: 0 10px;
    cursor: pointer;
    text-align: center;
    width: 250px;
    @include respond(sm) {
        width: 140px;
    }
    height: 100%;
    &:hover {
      color: $color-white;
    }
    position: relative;
    color: rgba($color-white, 0.5);
    &.router-link-exact-active,
    &.router-link-active {
      color: $color-white;
      font-weight: 700;
      content: "";
      text-align: center;
      height: 100%;
    }
  }
}
</style>
