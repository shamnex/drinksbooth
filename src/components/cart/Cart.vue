<template>
  <div class="sidebar-cart">
    <!-- <div v-show="this.blurConfig.isBlurred" class="sidebar-cart"> -->
    <div @click="toggleCart" ref="sideBarCartBG" class="sidebar-cart__bg"></div>
    <div ref="sideBarCartHead" class="sidebar-cart-header">
      <v-btn
        v-show="isCartOpen"
        @click="toggleCart"
        class="sidebar-cart__close"
        flat
        color="primary"
        large
        icon
      >
        <v-icon color="#fff" large>close</v-icon>
      </v-btn>

      <div
        class="sidebar-cart-title heading-secondary heading-secondary--bold ml-5 text-center"
      >SHOPPING CART</div>
    </div>
    <div ref="sideBarCart" class="sidebar-cart-content">
      <v-container class="sidebar-cart-body">
        <div class="sidebar-cart-content-main">
          <v-layout v-if="itemsInCart.length === 0" justify-center column align-center>
            <v-flex class="sidebar-cart-content-main-empty text-xs-center">
              <v-layout></v-layout>
              <p class="heading-secondary">YIKES!!!</p>
              <p>Your Cart is Empty, Lets help you fix that</p>
              <img class="sidebar-cart-content-empty__image" src="/graphics/empty-cart.svg" alt>
              <v-btn
                @click="goto('shop')"
                flat
                large
                dark
                class="button button__primary mt-5"
              >GO SHOPPING</v-btn>
            </v-flex>
          </v-layout>
          <v-layout class="sidebar-cart-content-list mt-3" column v-else>
            <v-flex>
              <v-flex ref="itemInCart" class="mb-4" v-for="(item, i) in itemsInCart" :key="i">
                <!-- <item-card
                  @onRemove="removeItem(i)"
                  :type="4"
                
                  :name="item.name"
                  :price="item.price"
                  :isFavorite="item.isFavorite"
                  :image="item.image"
                ></item-card>-->
                <div class="item-card-4 item-card-4--cart">
                  <div class="item-card-4__image">
                    <img :src="item.cart_product.prod_image" alt srcset>
                  </div>

                  <v-layout class="item-card-4__info" column align-baseline>
                    <v-flex>
                      <!-- <router-link  ></router-link> -->
                      <div
                        @click="goto('buy/'+item.cart_product.id)"
                        class="item-card-4__name link"
                      >{{item.cart_product.prod_name}}</div>
                    </v-flex>
                    <v-flex>
                      <v-layout class="item-card-4__price--btn" align-baseline>
                        <v-flex>
                          <div class="item-card-4__price">{{item.cart_product.prod_price}}</div>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>

                  <v-layout align-baseline justify-space-between class="item-card-4__ctas">
                    <v-flex>
                      <v-btn
                      :disabled="item.cart_product_quantity ===1"
                        @click="decrement(item)"
                        style="z-index: 200"
                        la
                        color="primary"
                        flat
                        icon
                        back="#fff"
                      >
                        <v-icon>remove</v-icon>
                      </v-btn>
                    </v-flex>
                    <v-flex>
                      <span>{{item.cart_product_quantity}}</span>
                    </v-flex>
                    <v-flex>
                      <v-btn @click="increment(item)" dark color="primary" icon flat back="#fff">
                        <v-icon>add</v-icon>
                      </v-btn>
                    </v-flex>
                    <!-- <v-flex xs2>
                                <v-btn icon flat back="#fff">
                     <v-icon color="primary"  small>delete</v-icon>
                                </v-btn>
                    </v-flex>-->
                  </v-layout>
                  <v-btn
                    @click="deleteFromCart(item)"
                    class="item-card-4-delete"
                    icon
                    flat
                    back="#fff"
                  >
                    <v-icon color="#FF5252">delete</v-icon>
                  </v-btn>
                </div>
              </v-flex>
            </v-flex>
            <v-flex>
              <v-divider></v-divider>
            </v-flex>
          </v-layout>
        </div>
      </v-container>
    </div>
    <v-layout
      v-show="itemsInCart.length > 0"
      column
      align-content-center
      ref="sideBarCartFooter"
      class="sidebar-cart-footer pa-4"
    >
      <!-- <v-layout class="mt-2" align-content-space-between row>
        <v-flex>
          <p>Sub-total</p>
        </v-flex>
        <v-flex class="text-xs-right">200,000</v-flex>
      </v-layout>-->
      <!-- <v-divider></v-divider> -->
      <v-layout class="mt-2" align-content-space-between row>
        <v-flex class="text-bold">
          <p>Total</p>
        </v-flex>
        <v-flex class="text-xs-right">
          <span class="text-bold">‎₦</span>
          {{cartTotal}}
        </v-flex>
      </v-layout>
      <v-btn @click="goto('checkout')" flat block dark class="button button__primary">Checkout</v-btn>
    </v-layout>
  </div>
</template>

<script>
import anime from "animejs";
import ItemCard from "../item_card/ItemCard";
import OrdersApi from "@/services/order";

export default {
  components: {
    ItemCard
  },
  name: "Cart",
  computed: {
    isCartOpen() {
      return this.$store.state.cartOpen;
    },
    itemsInCart() {
      return this.$store.state.itemsInCart;
    },
    cartTotal() {
      return this.$store.state.cartTotal;
    }
  },
  created() {
    this.getCart();
  },
  data() {
    return {
      snackbar1: false,
      sideBarElement: null,
      drawer: null,
      route: ""
    };
  },
  watch: {
    isCartOpen() {
      this.onToggleCart();
    }
  },
  mounted() {
    this.sideBarElement = this.$refs.sideBarCart;
    this.sideBarElementBg = this.$refs.sideBarCartBG;
  },
  methods: {
    getCart() {
      OrdersApi.getOrder()
        .then(order => {
          OrdersApi.getCart(order).then(cart => {
            this.$store.commit("setItemsInCart", cart);
            this.$store.commit("getCartTotal");
          });
        })
        .catch(err => console.log(err));
    },

    deleteFromCart(item) {
      OrdersApi.deleteItemFromCart(item).then(_ => this.getCart());
    },
    increment(item) {
      OrdersApi.getOrder().then(order => {
        item.cart_product_quantity++;
        OrdersApi.modifyItem(order, item)
          .then(_ => {
            this.getCart();
          })
          .catch(err => console.log(err));
      });
    },
    decrement(item) {
      item.cart_product_quantity--;
      OrdersApi.getOrder().then(order => {
        OrdersApi.modifyItem(order, item).then(_ => {
          this.getCart();
        });
      });
    },
    // removeItem(index) {
    //   this.$store.commit("deleteItem", index);
    //   this.snackbar = true;
    // },
    toggleCart() {
      this.$store.commit("toggleCart");
    },
    goto(route) {
      this.$router.push(`/${route}`);
      this.toggleCart();
    },
    onToggleCart(e) {
      anime({
        targets: [this.$refs.sideBarCart],
        translateX: this.isCartOpen ? "20vw" : "120vw",
        duration: 200,
        easing: "easeInOutQuint"
      });

      anime({
        targets: [this.$refs.sideBarCartHead, this.$refs.sideBarCartFooter],
        translateX: this.isCartOpen ? "0" : "100%",
        duration: 400,
        easing: "easeInOutQuint",
        delay: function(el, i, l) {
          return i * 50;
        }
      });

      anime({
        targets: [this.$refs.sideBarCartBG],
        translateX: this.isCartOpen ? "0" : "100vw",
        duration: 1
      });

      if (!!this.$refs.itemInCart) {
        return anime({
          targets: [this.$refs.itemInCart],
          translateY: this.isCartOpen ? "0" : "10vw",
          opacity: this.isCartOpen ? "1" : "0",
          easing: "easeInOutQuint",
          elasticity: 0,
          duration: 800,
          delay: function(el, i, l) {
            return i * 50;
          }
        }).finished;
      } else {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve();
          }, 300);
        });
      }
    }
  }
};
</script>

<style  lang="scss" scoped>
@import "../../scss/abstract/variables";

.sidebar-cart {
  font-family: "Montserrat", sans-serif;

  &-title {
    overflow-x: hidden;
    transform: translate3d(0, -30px, 0);

    @include respond(sm) {
      //   width: 80vw;
      // transform: scale(0.9);
    }
  }

  &-header {
    z-index: 100;
    width: 400px;
    position: fixed;
    right: 0;
    @include respond(md) {
        height: 100px;
    }
    background-color: transparent;
    box-shadow: $box-shadow;
    transform: translate3d(100vw, 0, 0);

    // @include shadow;
    background-image: linear-gradient(
        to right,
      rgba($color-white, 0.6),
      rgba($color-white, 1),
      rgba($color-white, 1),
      rgba($color-white, 0.6)
    );
    @include respond(sm) {
        width: 80vw;
    max-width: 400px;
      transform: translate3d(110vw, 0, 0);
    }
  }
  &-footer {
    // color: $color-white;
    padding: 20px;
    z-index: 100;
    min-height: 100px;
    width: 400px;
    position: fixed;
    right: 0;
    bottom: 0;
    transform: translate3d(100vw, 0, 0);

    @include respond(sm) {
    max-width: 400px;
      width: 80vw;
    }

    background-color: white;
    box-shadow: $box-shadow-inverse;
    // background-image: $color-gradient-2;
  }
  &-body {
    position: absolute;
    top: 120px;
    @include respond(md) {
      top: 60px;
    }
    @include respond(sm) {
      top: 70px;
    }
  }
  &-content {
    position: fixed;
    overflow-y: scroll;
    overflow-x: hidden;

    z-index: 39;
    right: 0;
    width: calc(400px + 20vw);
    height: 100vh;
    background: $color-background;
    transform: translate3d(110vw, 0, 0);
    @include respond(sm) {
    max-width: calc(400px + 20vw);
      width: 100vw;
    }
    &-main {
    max-width: 400px;
      padding-bottom: 100px;
      transform: scale(0.9) translate3d(-20px, 0, 0);
      @include respond(sm) {
          padding-right: 0;
    max-width: 400px;
        width: 85vw;
        transform: scale(0.9) translate3d(-20px, 0, 0);
      }
      &-empty {
        height: 100vh;
        position: absolute;
        top: 50%;
        transform: translate3d(0, 20%, 0);
        // img {
        //     padding: 40px;
        // }
      }
      &-empty__image {
        margin: 30px auto;
        height: 180px;
        display: block;
      }
    }

    &-list {
      margin: 0 auto;
      // overflow: scroll;
    }
  }

  &__bg {
    height: 100%;
    position: fixed;
    z-index: 20;
    width: 100vw;
    right: 0;
    opacity: 0.3;
    top: 0;
    transform: translate3d(100vw, 0, 0);
    background-image: $color-gradient;
  }

  &__close {
    left: -90px;
    @include respond(sm) {
      left: -85px;
    }
    @include respond(xs) {
      left: -85px;
    }
  }
}

.item-card-4 {
  background-color: #fff;
  //   cursor: pointer;
  margin: 10px auto 30px;
  position: relative;
  height: 100px;
  width: 100%;
  max-width: 400px;
  transition: all 0.3s ease;
  &-delete {
    position: absolute;
    right: 0;
    //   transform: translateY(-60%);
    top: 0%;
    &:hover {
      position: absolute;
      right: 0;
      top: 0%;
      //   transform: translateY(-60%);
    }
  }
  //   transform: scale(1);

  //   @include respond(sm) {
  //   }
  &::before {
    content: "";
    position: absolute;
    left: 0;
    height: 150px;
    bottom: 0;
    width: 100%;
    z-index: 0;
  }

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 70%;
    width: 60%;
    z-index: 1;
    opacity: 0;
    background-color: transparent;
    transition: all 0.3s ease;
    // box-shadow: 0 0 40px  darken($color-secondary, 10);
    box-shadow: 0 30px 50px -30px darken($color-secondary, 0);
  }

  &:hover::after {
    opacity: 1;
  }

  &__image {
    img {
      position: absolute;
      background-image: linear-gradient(
        to bottom right,
        rgba($color-primary, 0.2),
        rgba(#4a5378, 0.5),
        rgba($color-secondary, 0.1)
      );
      height: 100%;
      left: 0;
      bottom: 0;
      width: auto;

      &::before {
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        width: auto;
      }
    }
  }

  &__info {
    color: $color-primary;
    opacity: 1;
    width: calc(100% -120px);

    z-index: 10;
    transition: all 0.3s ease;
    position: absolute;
    left: 100px;
    height: 100%;
    padding: 10px;
    top: 10px;
  }
  &__price {
    color: $color-primary;
    position: relative;
    font-size: 16px;

    &::before {
      position: absolute;
      content: "";
      width: 60%;
      height: 100%;
      right: -10%;
      background-color: rgba($color-secondary, 0.2);
    }
  }
  &__name {
    font-size: 16px;
    color: $color-primary;
  }
  &__company {
    color: rgba($color-primary, 0.7);
    font-size: 80%;
  }
  &__favorite {
    color: rgba($color-primary, 0.7);
    font-size: 80%;
  }
  &__button {
    color: rgba($color-primary, 0.7);
    font-size: 90%;
  }

  &__ctas {
    opacity: 1;
    position: absolute;
    right: 0%;
    bottom: 0%;
    // left: 50%;
  }
}
</style>
