<template>
  <v-app >
    <div class="product__wrapper">
          <div class="header"></div>
      <v-content v-if="product !== null">
        <div class="product">
          <v-container>
            <v-layout justify-space-between>
              <v-flex sm7 class="product-content">
                <p class="heading-primary product-content__title">{{product.prod_name}}</p>
                <!-- <v-rating readonly color="orange" v-model="rating"></v-rating> -->
                <p class="product-content__description mt-3">{{product.prod_description}}</p>

                <p class="product-content__price mt-5">₦ {{product.prod_price}}</p>
                <div class="product-content__ctas">
                  <div class="product-content__increment">
                    <v-btn :disabled="quantity === 1" @click="quantity--" flat icon back="#fff">
                      <v-icon>remove</v-icon>
                    </v-btn>
                    <span class="product-content__increment__quantity">{{quantity}}</span>

                    <v-btn @click="quantity++" icon flat back="#fff">
                      <v-icon>add</v-icon>
                    </v-btn>
                  </div>

                  <v-btn color="#fff" large flat class="item-card__button button__primary">
                    <div>Add To Cart</div>
                  </v-btn>
                </div>
              </v-flex>
              <v-flex md4 sm5 xs12 class="product__image">
                <img :src="product.prod_image">
              </v-flex>
            </v-layout>
          </v-container>
          <div class="product-footer__wrapper">
            <v-container class="product-footer">
              <v-layout align-center align-content-end justify-space-between>
                <v-flex xs12 sm10 class="product-footer-content">
                  <v-flex align-self-end class="product-footer-info">
                    <p>Wine Type</p>
                    <p>Red Wine</p>
                  </v-flex>
                  <v-flex class="product-footer-info">
                    <p>Alcohol (%)</p>
                    <p>20</p>
                  </v-flex>
                  <v-flex class="product-footer-info">
                    <p>Category</p>
                    <p>Alcoholic Drink</p>
                  </v-flex>

                  <v-flex class="product-footer-info">
                    <p>Litres</p>
                    <p>750ml</p>
                  </v-flex>

                  <v-flex class="product-footer-info">
                    <p>Litres</p>
                    <p>750ml</p>
                  </v-flex>

                  <v-flex lign-self-start class="product-footer-info">
                    <p>Litres</p>
                    <p>750ml</p>
                  </v-flex>
                </v-flex>
              </v-layout>
              <v-container></v-container>
            </v-container>
          </div>
        </div>
        <div class="section-related-items">
          <v-container>
            <div class="heading-primary">Related Items</div>
          </v-container>
          <v-container>
            <v-layout>
              <swiper :options="swiperOption" ref="mySwiper">
                <swiper-slide class="swiper-slide" v-for="(item, i) in items" :key="i">
                  <item-card
                    :name="item.name"
                    :price="item.price"
                    :isFavorite="item.isFavorite"
                    :image="item.image"
                  ></item-card>
                </swiper-slide>

                <div class="swiper-pagination" slot="pagination"></div>

                <!-- <div class="swiper-button-prev" slot="button-prev"></div> -->
                <!-- <div class="swiper-button-next" slot="button-next"></div> -->
              </swiper>
            </v-layout>
          </v-container>
        </div>
        <div class="section-related-items">
          <v-container>
            <div class="heading-primary">Customers also bought</div>
          </v-container>
          <v-container>
            <v-layout>
              <swiper :options="swiperOption" ref="mySwiper">
                <swiper-slide class="swiper-slide" v-for="(item, i) in items" :key="i">
                  <item-card
                    :name="item.name"
                    :price="item.price"
                    :isFavorite="item.isFavorite"
                    :image="item.image"
                  ></item-card>
                </swiper-slide>

                <div class="swiper-pagination" slot="pagination"></div>

                <!-- <div class="swiper-button-prev" slot="button-prev"></div> -->
                <!-- <div class="swiper-button-next" slot="button-next"></div> -->
              </swiper>
            </v-layout>
          </v-container>
        </div>
        <!-- <div class="section-reviews">
        <v-container>
          <div class="heading-primary mb-5">User Reviews</div>

          <v-layout class="section-reviews-item" column>
            <v-flex xs12 class="mb-3">
              <v-layout class="mb-2" justify-space-between>
                <div>
                  By
                  <span>Alex Lawal</span>
                  <v-rating color="orange" v-model="rating"></v-rating>
                </div>
                <div>August 20, 2018</div>
              </v-layout>
            </v-flex>
            <v-flex xs8>
              <v-layout>
                <v-flex
                  xs8
                >Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nemo dolore quaerat quasi sunt nam voluptate cupiditate quae delectus impedit nobis nisi, id odit provident. Eius cum eligendi atque eveniet.</v-flex>
              </v-layout>
            </v-flex>
          </v-layout>

          <v-layout column class="section-reviews-item">
            <v-flex xs12 class="mb-3">
              <v-layout class="mb-2" justify-space-between>
                <div>
                  By
                  <span>Alex Lawal</span>
                  <v-rating color="orange" v-model="rating"></v-rating>
                </div>
                <div>August 20, 2018</div>
              </v-layout>
            </v-flex>
            <v-flex xs8>
              <v-layout>
                <v-flex
                  xs8
                >Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nemo dolore quaerat quasi sunt nam voluptate cupiditate quae delectus impedit nobis nisi, id odit provident. Eius cum eligendi atque eveniet.</v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
        </div>-->
      </v-content>

      <v-layout class="pa-5 ma-5" v-if="!product || loading" justify-center align-center>
        <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
      </v-layout>
    </div>
  </v-app>
</template>

<script>
import ItemCard from "../components/item_card/ItemCard";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import ProductsApi from "@/services/products";
import OrdersAPi from "@/services/order";

export default {
  components: {
    ItemCard,
    swiper,
    swiperSlide
  },
  created() {
    const id = this.$route.params.buydrink;
    ProductsApi.getProductById(id).then(res => {
      this.product = res;
    });

    OrdersAPi.getOrder();
  },

  data() {
    return {
      e1: 1,
      rating: 4.5,
      quantity: 1,
      loading: false,
      swiperOption: {
        freeMode: false,
        slidesPerView: "auto",
        loop: true,
        SpaceBetween: 40,
        centeredSlides: true,

        pagination: {
          el: ".swiper-pagination",
          dynamicBullets: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },

      product: "",
      items: [
        {
          name: "Drink 1",
          isFavorite: true,
          price: "32000",
          image: "/images/drinks/1.png"
        },
        {
          name: "Drink 3",
          isFavorite: false,
          price: "32000",
          image: "/images/drinks/2.png"
        },
        {
          name: "Drink 2",
          isFavorite: true,
          price: "32000",
          image: "/images/drinks/3.png"
        },
        {
          name: "Drink 4",
          isFavorite: true,
          price: "32000",
          image: "/images/drinks/3.png"
        },
        {
          name: "Drink 5",
          isFavorite: true,
          price: "32000",
          image: "/images/drinks/3.png"
        }
      ]
    };
  },

  watch: {
    routeName(to, from) {
      this.loading = true;
      this.product = null;
      const id = this.$route.params.buydrink;
      ProductsApi.getProductById(id).then(res => {
        this.loading = false;
        this.product = res;
      });
    },

    $store(newValue, OldValue) {
      console.log(newValue);
    }
  },

  mounted() {
    this.product = this.$store.state.currentProduct;
  },

  computed: {
    routeName: function() {
      return this.$route.params.buydrink;
    },

    item: function() {
      return {
        cart_product: this.product.id,
        cart_product_quantity: this.quantity,
        cart_product_amount: this.product.prod_price
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/abstract/_variables";
@import "../scss/abstract/_mixins";
.header {
  background: transparent;
  z-index: 1;
  height: 100px;
//   box-shadow: $box-shadow;
  width: 100vw;
}

.container {
  position: relative;
}

.swiper-slide {
  width: 300px;
  margin-bottom: 60px;
  @include respond(md) {
  }
}

[class^="swiper-button"] {
  color: red;
}
.product {
  &__wrapper {
    // height: calc(100vh -100px);
    // padding: 20px;
    background-color: $color-background;
    overflow: hidden;
  }

  &__image {
    img {
      transform: translate(-25%, -10%);
      z-index: 1;
      height: 80vh;
      padding: 30px;
      position: relative;
      @include respond(md) {
        padding: 30px;
        position: relative;
        height: 80vh;
      }
      @include respond(md) {
        padding: 30px;
        position: relative;
        height: 80vh;
        // transform: translateY(0%);
      }
      // transform: translateY(-30%);
      // right: 0;
    }
  }

  &-content {
    // transform: translate(0%, -50%);

    // max-width: 500px;
    &__price {
      position: relative;
      font-size: 28px;
      font-weight: 700;
      color: $color-primary;
      &::before {
        position: absolute;
        content: "";
        width: 20%;
        height: 100%;
        left: 10%;
        background-color: rgba($color-secondary, 0.15);
      }
    }

    &__ctas {
      display: flex;
      align-items: center;
    }

    &__increment {
      padding: 2px 0;
      display: inline-flex;
      align-items: center;
      background-color: $color-white;
      box-shadow: $box-shadow;
      &__quantity {
        height: 100%;
        text-align: center;
      }
    }
  }

  &-footer {
    position: relative;
    height: 30vh;
    transform: translateY(-25vh);

    &__wrapper {
      transform: translateY(-15vh);
      width: 100vw;
      &::before {
        transform: translateY(-25vh);
        background-color: $color-white;
        position: absolute;
        content: "";
        height: 30vh;
        width: 100vw;
        z-index: 0;
        box-shadow: $box-shadow;
      }
    }
    &-content {
      position: absolute;
      width: 100%;
      left: 0;
      z-index: 3;
      transform: translate(-15%, -50%);
      display: flex;
      top: 50%;
    }
    &-info {
      height: 100%;
      &:first-child p {
        font-size: 13px;
        color: lighten($color-primary, 90);
      }
    }
  }
}

.section-related-items {
  transform: translateY(-35vh);
  position: relative;
  //   max-height: 100% -20vh;
  //   margin-bottom: -15vh;

  //   width: 100%;
  //   &.glide {
  //     text-align: center !important;
  //   }
  //   [data-glide-el="controls"] {
  //     text-align: center !important;
  //   }
  //   &__ctas {
  //     margin: 60px 10px;
  //     text-align: center;
  //   }
}
.section-reviews {
  transform: translateY(-15vh);
  min-height: 40vh;
  background-color: $color-white;
  &-item {
    position: relative;
    padding: 40px 0;
    &::before {
      content: "";
      border-bottom: solid 0.3px rgba($color-primary, 0.6);
      position: absolute;
      height: 100%;
      width: 50%;
      left: 50%;
      transform: translateX(-50%);
      bottom: 0;
    }
  }
}
</style>
