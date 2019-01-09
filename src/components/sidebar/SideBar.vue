
<template>

    <div  class="sidebar-cart">

        <div @click="toggleMenu($event)" ref="sideBarCartBG"   class="sidebar-cart__bg">
        </div>
        <div  ref="sideBarCart" class="sidebar-cart-content">
            <v-btn class="sidebar-cart__close" flat color="primary" large  icon>
        <v-icon v-if= "blurConfig.isBlurred" @click ="toggleMenu" color="#fff" large>close</v-icon>
            </v-btn>

            <v-container>
                <v-layout justify-center="">
                    You cart is empty
                </v-layout>
            </v-container>
        </div>

    </div>

</template>

<script>

export default {

  props: {

  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/abstract/variables";
@import "../../scss/abstract/mixins";

.sidebar-cart {

    &-content {
        position: fixed;
        z-index: 39;
        right: 0;
        width: 70vw;
        height: 100vh;
        background-color: $color-white;
        transform:translateX(100vw);
        @include respond(sm) {
            width: 100vw;

        }
        box-shadow: -20px 0 100px rgba($color-primary, .1);

    }

    &__bg {
        height: 100%;
        position: fixed;
        z-index: 20;
        width: 100vw;
        right: 0;
        opacity: 0.3;
        top: 0;
        transform:translateX(100vw);
        background-image: $color-gradient;

    }

    &__close {
        position: absolute;
        left: -5rem;
    }

}

</style>
