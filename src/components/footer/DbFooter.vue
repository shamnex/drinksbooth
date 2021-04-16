<template>
  <v-footer class="db__footer" height="200px">
    <v-container>
      <v-layout>
        <v-spacer></v-spacer>
        <v-btn-toggle class="social" v-model="text">
          <a href="http://bit.ly/RowketCommunity" target="_blank" class="btn">
            TELEGRAM
          </a>
          <a
            href="https://twitter.com/RowketMarket"
            target="_blank"
            class="btn"
          >
            TWITTER
          </a>
          <a
            href="https://github.com/Rowket/Rowket-Token"
            target="_blank"
            class="btn"
          >
            GITHUB
          </a>
          <a
            href="https://rowketmarket.medium.com/"
            target="_blank"
            class="btn"
          >
            MEDIUM
          </a>
        </v-btn-toggle>
        <v-spacer></v-spacer>
      </v-layout>
      <v-layout>
        <v-flex pt-2>
          <p class="text-xs-center color-white">© 2021 Rowket Community</p>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex pt-2>
          <p class="text-xs-center color-white">
            Built With ❤️ On Binance Smart Chain.
          </p>
        </v-flex>
      </v-layout>
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
        case "LITE PAPER":
          {
            route = "/lite";
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
    },
  },
};
</script>

<style  lang="scss" scoped>
@import "../../scss/abstract/variables";
.db__footer {
  background: $color-gradient-2 !important;

  .social {
    background: transparent;
    .btn {
      padding: 20px 16px;
      color: white;
      background: transparent;
      :hover {
        background-color: yellow;
      }
    }
  }
}
</style>

