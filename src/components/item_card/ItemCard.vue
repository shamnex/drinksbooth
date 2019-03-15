<template>
  <div>
    <div
      v-if="type ===1  "
      @click="goto"
      class="item-card"
      :class="{
           'item-card--sm': size ==='sm',
           'item-card--lg': size ==='lg',
           }"
    >
      <div class="item-card__image">
        <img :src="image" alt srcset>
      </div>

      <v-layout
        class="item-card__info"
        row
        fill-height
        align-end
        justify-space-between
        align-content-end
      >
        <v-flex>
          <div class="item-card__name">{{name}}</div>
          <!-- <div class="item-card__company">Drink Company</div> -->
        </v-flex>

        <v-flex>
          <p class="item-card__price text-xs-right">{{price}}</p>
        </v-flex>
      </v-layout>

      <v-layout class="item-card__ctas">
        <!-- <v-btn
          
          @click.stop="onAddToCart"
          color="white"
          flat
          class="item-card__button"
        >-->
          <div
          flat
          small
            @click.stop="onAddToCart"
            class="button button__outline ma-2 pa-3 button__outline--white button__block"
          >
            Add To Cart:
            <span class="ml-2 text-bold">{{price}}</span>
          </div>
        <!-- </v-btn> -->
      </v-layout>
    </div>
    <div v-if="type === 2 " @click="goto" class="item-card-2">
      <div class="item-card-2__image">
        <img :src="image" alt srcset>
      </div>

      <v-layout class="item-card-2__info" column align-end>
        <v-flex>
          <div class="item-card-2__name mb-1">{{name}}</div>
          <p class="item-card-2__price text-xs-right">{{price}}</p>
        </v-flex>
      </v-layout>

      <v-layout row class="item-card-2__ctas">
        <v-flex xs10>
          <v-btn outline @click.stop="onAddToCart" color="primary" flat class="item-card-2__button">
            <div>Add To Cart</div>
          </v-btn>
        </v-flex>

        <v-flex xs2></v-flex>
      </v-layout>
    </div>
    <div v-if="type ==3 " @click="goto" class="item-card-3 item-card-3--cart">
      <div class="item-card-3__image">
        <img :src="image" alt srcset>
      </div>

      <v-layout align-content-end column>
        <v-flex>
          <v-layout class="item-card-3__info" row align-start>
            <v-flex>
              <div class="item-card-3__name">{{name}}</div>
            </v-flex>
            <v-flex>
              <p class="item-card-3__price text-xs-right">{{price}}</p>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex>
          <v-layout align-center justify-space-between row class="item-card-3__ctas pa-2">
            <v-flex>
              <v-btn
                block
                outline
                color="primary"
                @click.once="onAddToCart"
                flat
                class="item-card-3__button"
              >
                <div>Add To Cart</div>
              </v-btn>
            </v-flex>
            <!-- 
             <v-flex >
                  <v-btn @click.stop="onLike" icon class="item-card-3__favorite">
                <v-icon v-if="!isFavorite" color="#fff">favorite_outline</v-icon>
                <v-icon v-if="isFavorite" color="red">favorite</v-icon>
              </v-btn>
            </v-flex>-->
          </v-layout>
        </v-flex>
      </v-layout>
    </div>
    <div v-if="type == 4 " class="item-card-4 item-card-4--cart">
      <div class="item-card-4__image">
        <img :src="image" alt srcset>
      </div>

      <v-layout class="item-card-4__info" column align-baseline>
        <v-flex>
          <div @click="goto" class="item-card-4__name link">{{name}}</div>
        </v-flex>
        <v-flex>
          <v-layout class="item-card-4__price--btn" align-baseline>
            <v-flex>
              <div class="item-card-4__price">{{price}}</div>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>

      <v-layout align-baseline justify-space-between class="item-card-4__ctas">
        <v-flex>
          <v-btn
            style="z-index: 200"
            la
            @click="quantity--"
            :disabled="quantity === 1"
            color="primary"
            flat
            icon
            back="#fff"
          >
            <v-icon>remove</v-icon>
          </v-btn>
        </v-flex>
        <v-flex>
          <span>{{quantity}}</span>
        </v-flex>
        <v-flex>
          <v-btn dark color="primary" icon flat back="#fff">
            <v-icon @click="quantity++">add</v-icon>
          </v-btn>
        </v-flex>
        <!-- <v-flex xs2>
                                <v-btn icon flat back="#fff">
                     <v-icon color="primary"  small>delete</v-icon>
                                </v-btn>
        </v-flex>-->
      </v-layout>
      <v-btn @click="$emit('onRemove' )" class="item-card-4-delete" icon flat back="#fff">
        <v-icon color="#FF5252">delete</v-icon>
      </v-btn>
    </div>

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
        <span class="text-bold">{{ name }}</span>
        to the cart
      </div>
      <v-btn class="button button__primary" flat @click="$store.commit('toggleCart')">View Cart</v-btn>

      <v-btn flat color="primary" button @click="snackbar = false">close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      snackbar: false
    };
  },

  props: {
    id: {
      type: Number,
      //   required: true,
      default: 0
    },
    name: {
      type: String,
      //   required: true,
      default: "Drink 1"
    },
    size: {
      type: String,
      //   required: true,
      default: "sm"
    },
    type: {
      type: Number,
      //   required: true,
      default: 1
    },
    price: {
      type: String,
      //   required: true,
      default: "20,000"
    },
    quantity: {
      type: Number,
      //   required: true,
      default: 1
    },
    image: {
      type: String,
      default: "images/drinks/1.png"

      //   required: true,
    },
    isFavorite: {
      type: Boolean,
      default: true
      //   required: true,
    }
  },

  methods: {
    onHover(e) {},
    onLike() {
      this.isFavorite = !this.isFavorite;
    },
    onAddToCart() {
      const payload = {
        name: this.name,
        isFavorite: this.isFavorite,
        price: this.price,
        image: this.image,
        id: this.id
      };
      // console.log(payload)
      this.$store.dispatch("addItem", payload);
      this.$store.commit("toggleCart", true);
    },
    goto() {
      this.$router.push(`/buy/${this.id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/abstract/variables";
@import "../../scss/abstract/mixins";

.item-card {
  background-color: #fff;
  cursor: pointer;
  margin-left: 10px;
  margin-right: 10px;
  margin: 0 auto;
  max-height: 400px;
  position: relative;
  padding: 20px;
  max-width: 300px;
  transition: all 0.3s ease;

  &--lg {
    height: 400px;
  }

  &--sm {
    height: 200px;
    width: 200px;


      &.item-card__ctas {
    opacity: 0;
    position: absolute;
    z-index: 4;
    bottom: 0;
    left: 50%;
    padding: 20px;
    margin: 0 auto;

    transform: translateX(-50%);
    & .button {
      width: 20% !important;
      overflow: hidden;
      margin: 0 auto;
    }
  }
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    height: 100%;
    width: 100%;
    z-index: 2;
    transition: all 0.3s ease;
    background-image: linear-gradient(
      to bottom right,
      rgba($color-primary, 0.5),
      rgba(#4a5378, 0.5),
      rgba($color-secondary, 0.5)
    );
  }

  &:hover::before {
    opacity: 1;
  }

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 20%;
    width: 70%;
    z-index: 1;
    opacity: 0;
    background-color: transparent;
    transition: all 0.3s ease;
    // box-shadow: 0 0 40px  darken($color-secondary, 10);
    box-shadow: 0 30px 50px -30px darken($color-secondary, 10);
  }

  &:hover::after {
    opacity: 1;
  }

  &:hover &__info {
    opacity: 0;
    transition: all 0.3s ease;
  }

  &__image {
    img {
      position: absolute;
      height: 60%;
      @include absolutecenter;
    }
  }

  &__info {
    color: $color-primary;
    opacity: 1;
    transition: all 0.3s ease;
  }
  &__price {
    color: $color-primary;
    position: relative;
    transform: translateY(14px);

    &::before {
      position: absolute;
      content: "";
      width: 40%;
      height: 100%;
      right: -10%;
      background-color: rgba($color-secondary, 0.15);
    }
  }
  &__name {
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
  //   &__button {
  //     color: rgba($color-primary, 0.7);
  //     font-size: 80%;
  //   }

  &__ctas {
    opacity: 0;
    position: absolute;
    z-index: 4;
    bottom: 0;
    left: 50%;
    padding: 20px;
    margin: 0 auto;
    padding-bottom: 20px;
    width: 100%;
    text-align: center;

    transform: translateX(-50%);
    & .button {
      width: 90%;
      overflow: hidden;
      margin: 0 auto;
    }
  }

  &:hover &__ctas {
    opacity: 1;
  }
}
.item-card-2 {
  //   background-color: #fff;
  cursor: pointer;
  margin-left: 10px;
  margin-right: 10px;
  margin: 0 auto;
  position: relative;
  height: 220px;
  max-width: 220px;
  transition: all 0.3s ease;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    height: 150px;
    bottom: 0;
    width: 100%;
    z-index: 0;
    background-color: #fff;
  }

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 50%;
    width: 60%;
    z-index: 1;
    opacity: 0;
    background-color: transparent;
    transition: all 0.3s ease;
    // box-shadow: 0 0 40px  darken($color-secondary, 10);
    box-shadow: 0 30px 50px -30px darken($color-secondary, 10);
  }

  &:hover::after {
    opacity: 1;
  }

  &__image {
    img {
      position: absolute;
      height: 100%;
      left: 0;
      bottom: 0;
      transform: translateX(-30%);
    }
  }

  &__info {
    position: absolute;
    color: $color-primary;
    opacity: 1;
    z-index: 10;
    transform: translate(0%, 75px);
    transition: all 0.3s ease;
    padding-right: 20px;
    right: 0%;
  }
  &__price {
    color: $color-primary;
    position: relative;
    font-size: 16px;
    font-weight: 700;
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
    position: absolute;
    color: rgba($color-primary, 0.7);
    right: 0;
    top: 20px;
    &:hover {
      color: rgba($color-primary, 0.7);
      font-size: 80%;
      position: absolute;
      color: rgba($color-primary, 0.7);
      right: 0;
      top: 20px;
    }
  }
  &__button {
    color: rgba($color-primary, 0.7);
    font-size: 90%;
  }

  &__ctas {
    opacity: 1;
    position: absolute;
    z-index: 4;
    bottom: 10px;
    right: 0;
    // left: 50%;
  }
}
.item-card-3 {
  overflow: hidden;
  background-color: #fff;
  cursor: pointer;
  margin-left: 10px;
  margin: 10px;
  position: relative;
  height: 300px;
  max-width: 250px;
  transition: all 0.3s ease;
  margin-bottom: 40px;
  box-shadow: $box-shadow;

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
    height: 50%;
    width: 60%;
    z-index: 1;
    opacity: 0;
    background-color: transparent;
    transition: all 0.3s ease;
    // box-shadow: 0 0 40px  darken($color-secondary, 10);
    box-shadow: 0 30px 50px -30px darken($color-secondary, 10);
  }

  &:hover::after {
    opacity: 1;
  }

  &__image {
    img {
      height: 60%;
      position: absolute;
      @include absolutecenter;
      //   background-image: linear-gradient(
      //     to bottom right,
      //     rgba($color-primary, 0.2),
      //     rgba(#4a5378, 0.5),
      //     rgba($color-secondary, 0.1)
      //   );

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
    width: 100%;
    color: $color-primary;
    opacity: 1;
    z-index: 10;
    transition: all 0.3s ease;
    padding: 10px;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      width: 100%;
      left: 50%;
      transform: translate3d(-50%, 10%, 0);
      border-bottom: solid 0.2px rgba($color-primary, 0.9);
    }
  }
  &__price {
    color: $color-primary;
    position: relative;
    font-size: 16px;
    font-weight: 700;
    &::before {
      position: absolute;
      content: "";
      width: 40%;
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
    position: absolute;
    bottom: 2%;
    left: 12px;
    width: 80%;
    // background: $color-gradient-2;
    // background-image: linear-gradient(
    //   to bottom right,
    //   rgba($color-primary, 0.3),
    //   rgba(#4a5378, 0.1),
    //   rgba($color-primary, 0.3),
    //   rgba(#4a5378, 0.1),
    //   rgba($color-primary, 0.3),
    //   rgba($color-secondary, 0.3)
    // );

    // opacity: 1;
    // bottom: 10px;
    // right: 10%;
    // width: 100%;
    // left: 50%;
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
