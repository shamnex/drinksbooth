<template>
  <v-app>
    <div class="header"></div>
    <v-container class="pa-0" v-if="itemsInCart.length > 0">
      <div
        class="heading-secondary text-bold color-primary mt-4 pb-0 mb-0 text-xs-center"
      >Checkout And Paymeent</div>
      <!-- <v-divider></v-divider> -->
      <v-stepper
        style="background-color: transparent; box-shadow: none"
        class="checkout-stepper"
        v-model="e1"
      >
        <v-stepper-header style="background-color: transparent; box-shadow: none">
          <v-stepper-step :complete="e1 > 1" step="1">Overview</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 2" step="2">Delivery</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 3" step="3">Payment</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="4">Confirm Payment</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content class="pa-0" step="1">
            <v-content class="checkout-content">
              <v-container fill-height>
                <v-layout align-center justify-center>
                  <v-flex class="checkout-card">
                    <div class="checkout-card-header">
                      <div class="heading-tertiary background-gradient-2 color-white pa-4">SUMMARY</div>
                      <v-divider></v-divider>
                    </div>
                    <v-layout column class="checkout-card-body">
                      <v-flex class="mb-2">
                        <v-flex ref="item" class="mb-2" v-for="(item, i) in itemsInCart" :key="i">
                          <v-layout align-center>
                            <v-flex xs1 class="item-image">
                              <img :src="item.cart_product.prod_image" :alt="item.name">
                            </v-flex>
                            <div
                              xs2
                              @click="goto('buy/'+item.cart_product.id)"
                              class="item-name link ml-4"
                            >{{item.cart_product.prod_name}}</div>
                            <v-flex></v-flex>
                            <v-flex xs2 class="text-xs-right item-price">
                              {{item.cart_product_quantity}} x
                              <span
                                class="text-bold color-primary"
                              >‎₦</span>
                              {{item.cart_product.prod_price}}
                            </v-flex>
                          </v-layout>
                          <v-divider></v-divider>
                        </v-flex>
                      </v-flex>
                    </v-layout>

                    <v-layout column class="checkout-card-footer">
                      <!-- <v-layout class="mt-2 pl-3 pr-3" align-content-space-between row>
                        <v-flex>
                          <p>Sub-total</p>
                        </v-flex>
                        <v-flex class="text-xs-right">N {{total}}</v-flex>
                      </v-layout>-->
                      <!-- <v-divider></v-divider> -->
                      <v-layout class="mt-2 pl-3 pr-3" justify-end align-center row>
                        <v-flex xs2>
                          <div class="text-bold pa-2">Total</div>
                        </v-flex>
                        <v-flex style="font-size: 22px;" class="text-xs-right pa-2 color-primary">
                          <span class="text-bold">‎₦</span>
                          {{cartTotal}}
                        </v-flex>
                      </v-layout>
                      <v-divider></v-divider>
                      <v-layout justify-space-between align-center>
                        <v-btn
                          @click="$store.commit('toggleCart')"
                          class="text-xs-center"
                          small
                          flat
                          color="primary"
                        >Edit Order</v-btn>
                        <v-btn
                          class="text-xs-center button__primary"
                          flat
                          large
                          color="#fff"
                          @click="e1 = 2"
                        >Continue</v-btn>
                      </v-layout>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-content>
          </v-stepper-content>

          <v-stepper-content class="pa-0" step="2">
            <v-content class="checkout-content">
              <v-container fill-height>
                <v-layout aalign-center justify-center>
                  <v-flex class="checkout-card">
                    <div class="checkout-card-header">
                      <div
                        class="heading-tertiary background-gradient-2 color-white pa-4"
                      >DELIVERY METHOD</div>
                      <v-divider></v-divider>
                    </div>
                    <v-divider></v-divider>
                    <v-layout column class="delivery-method-wrapper">
                      <div
                        @click="doorDelivery = true"
                        :class="{'active': doorDelivery}"
                        class="delivery-method"
                      >
                        <v-icon large color="white" class="delivery-method-icon">check_mark</v-icon>
                        <v-layout column fill-height align-center justify-center>
                          <div
                            class="stylish-header stylish-header--sm stylish-header--border-bottom color-primary"
                          >Home Delivery</div>

                          <div
                            style="font-size: 18px"
                            class="text-center color-primary pa-2"
                          >Your order will be delivered to the address you will specify</div>
                        </v-layout>
                      </div>
                      <div
                        @click="doorDelivery = false"
                        :class="{'active': !doorDelivery}"
                        class="delivery-method"
                      >
                        <v-icon large color="white" class="delivery-method-icon">check_mark</v-icon>
                        <v-layout column fill-height align-center justify-center>
                          <div
                            class="stylish-header stylish-header--sm stylish-header--border-bottom color-primary"
                          >Pick-up</div>

                          <div
                            style="font-size: 18px"
                            class="text-center color-primary pa-2"
                          >You Will pick up item from our address at.</div>
                        </v-layout>
                      </div>
                    </v-layout>
                    <v-layout justify-space-between class="checkout-card-footer">
                      <v-btn
                        @click="e1 = 1"
                        class="text-xs-center"
                        flat
                        large
                        color="primary"
                      >GO BACK</v-btn>
                      <v-btn
                        class="text-xs-center button__primary"
                        flat
                        large
                        color="#fff"
                        @click="e1 = 3"
                      >Continue</v-btn>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-content>
          </v-stepper-content>

          <v-stepper-content class="pa-0" step="3">
            <v-content class="checkout-content">
              <v-container fill-height>
                <v-layout aalign-center justify-center>
                  <v-flex class="checkout-card">
                    <div class="checkout-card-header">
                      <div
                        class="heading-tertiary background-gradient-2 color-white pa-4"
                      >PAYMENT METHOD</div>
                      <v-divider></v-divider>
                    </div>
                    <v-divider></v-divider>
                    <v-layout column class="delivery-method-wrapper">
                      <div
                        @click="payStack = true"
                        :class="{'active': payStack}"
                        class="delivery-method"
                      >
                        <v-icon large color="white" class="delivery-method-icon">check_mark</v-icon>
                        <v-layout column fill-height align-center justify-center>
                          <div
                            class="stylish-header stylish-header--sm stylish-header--border-bottom color-primary"
                          >Paystack</div>The fastest, simplest way to make online payments
                          <div
                            style="background-image:url(/images/paystack.jpg)"
                            class="delivery-method-bg"
                          ></div>
                        </v-layout>
                      </div>
                      <div
                        @click="payStack = false"
                        :class="{'active': !payStack}"
                        class="delivery-method"
                      >
                        <v-icon large color="white" class="delivery-method-icon">check_mark</v-icon>
                        <v-layout column fill-height align-center justify-center>
                          <div
                            class="stylish-header stylish-header--sm stylish-header--border-bottom color-primary"
                          >Cash</div>
                          <div
                            slot="activator"
                            style="font-size: 18px"
                            class="text-center color-primary pa-2"
                          ></div>
                          <span v-show="doorDelivery" class="delivery-method-info">
                            <v-icon
                              class="text-xs-center"
                              style="display: block"
                              large
                              color="error"
                            >warning</v-icon>Cash Payments is only possible with when
                            <span
                              class="text-bold"
                            >PICK DELIVERY</span> is selected
                          </span>
                        </v-layout>
                      </div>
                    </v-layout>

                    <v-layout justify-space-between class="checkout-card-footer">
                      <v-btn
                        @click="e1 = 2"
                        class="text-xs-center"
                        flat
                        large
                        color="primary"
                      >GO BACK</v-btn>
                      <v-btn
                        class="text-xs-center"
                        :class="{'button__primary': payStack || !doorDelivery}"
                        :flat="!doorDelivery"
                        :disabled="doorDelivery && !payStack"
                        large
                        @click="e1 = 4"
                      >Continue</v-btn>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-content>
          </v-stepper-content>
          <v-stepper-content class="pa-0" step="4">
            <v-content class="checkout-content">
              <v-container fill-height>
                <v-layout aalign-center justify-center>
                  <v-flex class="checkout-card">
                    <div class="checkout-card-header">
                      <div class="heading-tertiary background-gradient-2 color-white pa-4">CONFIRM</div>
                      <v-divider></v-divider>
                    </div>
                    <v-divider></v-divider>

                    <v-layout column class="delivery-method-wrapper">
                      <div
                        @click="payStack = true"
                        :class="{'active': payStack}"
                        class="delivery-method"
                      >
                        <v-icon large color="white" class="delivery-method-icon">check_mark</v-icon>
                        <v-layout column fill-height align-center justify-space-around>
                          <div
                            class="stylish-header stylish-header--sm stylish-header--border-bottom color-primary"
                          >Normal Payment</div>
                          <flex style="font-size: 18px" class="text-center color-primary pa-2">
                            You will pay the full sum of
                            <span class="text-bold">‎₦</span>
                            <span class="text-bold">{{cartTotal}}</span>
                          </flex>
                        </v-layout>
                      </div>
                      <div
                        @click="payStack = false"
                        :class="{'active': !payStack}"
                        class="delivery-method pl-4 pr-4"
                      >
                        <v-icon large color="white" class="delivery-method-icon">check_mark</v-icon>
                        <v-layout fill-height justify-space-around>
                          <v-flex xs12>
                            <v-layout justify-space-around fill-height column>
                              <div
                                class="text-center stylish-header stylish-header--sm stylish-header--border-bottom color-primary"
                              >Split Payment</div>
                              <v-flex>
                                <v-layout justify-end align-baseline>
                                  <v-layout  column>
                                    <div
                                      style="font-size: 16px"
                                      class="text-center color-primary pa-2"
                                    >
                                      YOU PAY
                                      <span class="text-bold">‎(₦)</span>
                                      <!-- <span class="text-bold">{{splitAmount}}</span> -->
                                    </div>
                                    <v-text-field
                                      outline
                                      v-model="splitAmount"
                                      class="mt-0"
                                      hide-details
                                      single-line
                                      label="You Pay"
                                      :max="total"
                                    ></v-text-field>
                                  </v-layout>
                                  <v-flex xs5>
                                    <v-slider style="transform: translateY(50px)" v-model="splitSlider"></v-slider>
                                  </v-flex>
                                  <v-layout column>
                                   <div
                                      style="font-size: 16px"
                                      class="text-center color-primary pa-2"
                                    >
                                      YOUR PARTNER PAYS
                                      <span class="text-bold">(‎₦)</span>
                                      <!-- <span class="text-bold">{{splitAmount}}</span> -->
                                    </div>
                                    <v-text-field
                                      outline
                                      :value="remainingAmount"
                                      class="mt-0 text-xs-center"
                                      hide-details
                                      flatn
                                      label="Your Partner Pays"
                                      v-model="remainingAmount"
                                      single-line
                                      disabled
                                      readonly
                                    ></v-text-field>
                                  </v-layout>
                                </v-layout>
                              </v-flex>
                              <div style="font-size: 18px" class="text-center color-primary pa-2">
                                  <v-text-field
                                      class="mt-0 text-xs-center"
                                      flat
                                      hint="Please epeci"
                                      label="Partner's email"
                                      single-line
                                    ></v-text-field>
                              </div>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </div>
                    </v-layout>
                    <v-layout justify-space-between class="checkout-card-footer">
                      <v-btn
                        @click="e1 = 3"
                        class="text-xs-center"
                        flat
                        large
                        color="primary"
                      >GO BACK</v-btn>
                      <v-btn
                        style="width: 00px"
                        class="text-xs-center button__primary"
                        flat
                        large
                        color="#fff"
                        @click="e1 = 3"
                      >PAY N{{ splitAmount }}</v-btn>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-content>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-container>
    <v-container v-else>
      <v-layout fill-height justify-center column align-center mt-5>
        <v-flex class="sidebar-cart-content-main-empty text-xs-center">
          <p class="heading-secondary">YIKES!!!</p>
          <p>Your Cart is Empty, Lets help you fix that</p>
          <img class="sidebar-cart-content-empty__image" src="graphics/empty-cart.svg" alt>
          <v-btn
            @click="goto('shop')"
            flat
            large
            dark
            class="button button__primary mt-5"
          >GO SHOPPING</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import ItemCard from "../components/item_card/ItemCard";
import { required, maxLength, email } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";

export default {
  components: {
    ItemCard
  },

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


  data() {
    return {
      e1: 0,
      splitSlider: 50,
      total: 2000,
      doorDelivery: true,
      payStack: true
    };
  },

  watch: {
    $route(to, from) {
      this.route = to;
    },
    splitAmount(newValue) {}
  },

  methods: {
    goto(route) {
      this.$router.push(`/${route}`);
    }
  },

  computed: {
    routeName: function() {
      return this.$route.params.category === undefined
        ? "Shop"
        : this.$route.params.category;
    },
    cartTotal() {
      return this.$store.state.cartTotal;
    },
    splitAmount: {
      get: function() {
        return (this.cartTotal * this.splitSlider) / 100;
      },
      set: function(newValue) {
        if (newValue > this.total) {
          this.splitAmount = this.cartTotal;
        }
        this.splitSlider = (newValue * 100) / this.cartTotal;
      }
    },
    itemsInCart() {
      console.log(this.$store.state.itemsInCart);
      return this.$store.state.itemsInCart;
    },
    remainingAmount() {
      const x = this.cartTotal - this.splitAmount;
      return x > this.cartTotal ? this.cartTotal : x || 0;
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

.item {
  height: 60px;
  overflow: hidden;

  &-image {
    img {
      background: rgba($color-secondary, 0.1);
      height: 60px;
    }
  }
}

.checkout {
  &-card {
    position: relative;
    overflow: hidden;
    box-shadow: $box-shadow;
    max-height: 60vh;
    // max-width: 600px;
    background-color: $color-white;
    @include respond(sm) {
    }

    &-header {
      box-shadow: $box-shadow;
    }
    &-footer {
      position: absolute;
      bottom: 0;
      width: 100%;
      box-shadow: 0 -10px 100px rgba($color-primary, 0.1);
      background-color: $color-white;
      // background: $color-gradient;
    }
    &-body {
      height: 65vh;
      padding: 10px 10px 300px;
      overflow: scroll;
      position: relative;
    }
    .delivery-method {
      overflow: hidden;
      opacity: 0.4;
      position: relative;
      transition: all 0.3s ease;
      margin-bottom: 100px;
      margin-bottom: 10px;
        height: 20vh;
      position: relative;
      cursor: pointer;
      &::before {
        position: absolute;
        height: 100%;
        background: rgba($color-white, 0.1);
        width: 100%;
        content: "";
        z-index: 100;
      }

      &:hover {
        opacity: 0.5;
      }

      &-wrapper {
        height: calc(65vh - 200px);
        overflow: scroll;
        // border: solid 10px red;
        margin-bottom: 100px;
        // transform: translateY(-200px)
      }
    

      &.active {
        height: 100%;
        background: rgba($color-primary, 0.1);
        opacity: 1;
        &::before {
          opacity: 0;
          z-index: -1;
          transition: all 0.3s ease;
        }

        .v-icon {
          display: block;
        }
      }
      &-icon {
        display: none;
        padding: 25px;
        color: $color-success;
        position: absolute;
        width: 90px;
        right: 20px;
        background: $color-gradient-2;
        top: 0%;
        transform: translateY(10%) scale(0.7);
        border-radius: 50%;
        box-shadow: 5px 5px rgba($color-primary, 0.2);
        //   &::before {
        //     box-shadow: 5px 5px rgba($color-primary, 0.2);
        //     content: "";
        //     position: absolute;
        //     width: 100%;
        //     height: 100%;
        //   }
      }

      &-bg {
        height: 100%;
        width: 100%;
        opacity: 0.1;
        background-size: cover;
        position: absolute;
      }

      &-info {
        font-size: 16px;
        //   position: absolute;
        color: $color-error;
      }
    }
  }
}

.container {
  position: relative;
}
</style>
