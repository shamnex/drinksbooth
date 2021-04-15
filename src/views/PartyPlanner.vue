<template>
  <v-app>
    <shop-header
      title="LITE PAPER"
      :hasSearch="false"
      image="/images/5.jpg"
      height="40vh"
    ></shop-header>

    <v-container class="stepper-wrapper">
      <v-layout>
        <v-flex align-center justify-center> </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>b

<script>
import ShopHeader from "../components/shop-header/ShopHeader.vue";

export default {
  components: {
    ShopHeader,
  },

  data() {
    return {};
  },

  methods: {},
  watch: {
    chips: {
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/abstract/_variables";
@import "../scss/abstract/_mixins";

.stepper {
  top: 20%;
  box-shadow: $box-shadow !important;
  &-wrapper {
    @include absolutecenter;
  }

  &-body {
    min-height: 500px;
  }
  &-footer {
    position: absolute;
    bottom: 0;
    background: $color-white;
    width: 100%;
    display: flex;
    justify-content: center;
    border-top: solid 0.05px rgba($color-primary, 0.1);
  }
  &-header {
    background-color: $color-background;
    box-shadow: none !important;
  }
  &-items {
    background-color: $color-white;
  }
}
</style>
