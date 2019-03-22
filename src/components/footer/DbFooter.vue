<template>
  <v-footer class="db__footer" height="300px">
    <v-container>
      <p class="text-sm-center color-white">Footer Stuff here</p>
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
  background: $color-background;
}
</style>
