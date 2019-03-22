<template>
  <v-footer style="background-color:#333541 " class="db__footer">
    <v-container>
      <p class="text-sm-center color-white">Copyright 2019</p>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: "DbFooter",
  methods: {
    navigato(e) {
      let route = e.target.firstChild.innerText;
      switch (route) {
        case "HOME":
          {
            route = "/";
          }
          break;
        case "PARTY PLANNER":
          {
            route = "/planner";
          }
          break;
        case "SHOP":
          {
            route = "shop";
          }
          break;
        default: {
          null;
        }
      }
      this.$router.push(route);
    }
  }
};
</script>

<style  lang="scss" scoped>
@import "../../scss/abstract/variables";
.db__footer {
  background-color: $color-gradient-2;
}
</style>
