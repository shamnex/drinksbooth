<template>
  <v-app>
    <shop-header
      title="LITE PAPER"
      subHead="NFTs Market place and Incubation"
      :hasSearch="false"
      image="/images/5.jpg"
      height="50vh"
    ></shop-header>

    <v-container class="stepper">
      <v-layout>
        <v-spacer></v-spacer>
        <v-flex xs12 md8>
          <div class="heading-tertiary text-bold pb-2 pt-5 color-primary">
            INSTANT YIELD & DEFLATIONARY
          </div>
          <v-divider></v-divider>
          <p class="pl-5 pt-3 pb-5">
            KET is a deflationary instant yield token with a tax rate of 3%,
            which gives 1% to holders and burns the other 2% per transaction.
            The tax is adjustable, so the percentages can be changed if needed.
            KET will be the base currency of our NFTs marketplace, users will
            need it to buy and sell NFTs.
          </p>
        </v-flex>
        <v-spacer></v-spacer>
      </v-layout>
      <v-layout>
        <v-spacer></v-spacer>
        <v-flex xs12 md8>
          <div class="heading-tertiary text-bold py-2 color-primary">
            NFTS MARKETPLACE
          </div>
          <v-divider></v-divider>
          <p class="pl-5 pt-3 pb-5">
            Rowket Market is a decentralized community-driven NFTs marketplace
            built on the Binance Smart Chain. When it comes to NFTs, Binance
            Smart Chain is barely starting and there isn’t enough infrastructure
            yet to utilize its full potential. Rowket will be introducing its
            own in-house NFTs marketplace where users will be able to mint, buy
            and sell exclusive NFTs for a fraction of the cost of what the
            competitors are charging. In our marketplace, there will be
            different categories for different art forms and all of them would
            be curated except the “Independent Artists” category where anyone
            can mint and sell their own personal NFTs without being incubated.
            We will also introduce bidding for the sales of our NFTs to let
            market decide the best price feasible.
          </p>
        </v-flex>
        <v-spacer></v-spacer>
      </v-layout>
      <v-layout>
        <v-spacer></v-spacer>
        <v-flex xs12 md8>
          <div class="heading-tertiary text-bold py-2 color-primary">
            ARTIST INCUBATION
          </div>
          <v-divider></v-divider>
          <p class="pl-5 pt-3 pb-1">
            The aim is to connect digital collectors with creators while giving
            maximum exposure to the creators. Rowket Market will serve as a
            launchpad for rising artists to showcase their work while becoming
            the go-to place for the NFTs collectors on BSC. We will incubate the
            artists in a way where they will be getting doxxed while proving the
            authentication of their original work.
          </p>

          <p class="pl-5 pb5">
            Then we will showcase the artist and their exclusive work with
            bidding on our limited edition curated list right on our homepage
            which will cycle through different artists every 72 hours. Artists
            will need to apply through our website to get incubated with
            relevant information and we will get in touch with them. Keep in
            mind not every artist will get accepted, we will handpick only the
            best ones to ensure quality for our NFTs collectors.
          </p>
        </v-flex>
        <v-spacer></v-spacer>
      </v-layout>

      <v-layout>
        <v-spacer></v-spacer>
        <v-flex xs12 md8>
          <div class="heading-tertiary text-bold py-2 color-primary">
            NFTS LENDING
          </div>
          <v-divider></v-divider>
          <p class="pl-5 pt-3 pb-1">
            NFTs lending is the next big thing and to improve the speed and
            liquidity of NFT loans, we will be leveraging NFT20 and NFTX
            solutions for our NFT Loans.
          </p>
          <p class="pl-5 pb-1">
            The NFT20 and NFTX protocols bring fungibility to non-fungible
            tokens. It enables the pooling of NFT assets, which are then
            represented by newly-minted BEP20 tokens. These BEP20 tokens, each
            having a claim on a share of the pool, are fungible and can be
            freely traded on the open market via decentralized exchanges like
            Pancakeswap.
          </p>
          <p class="pl-5 pb-5">
            By implementing this NFT20, NFTX mechanism, platform users will be
            able to stake their NFT assets and instantly convert them to an
            BEP20 equivalent, which can in turn be staked as collateral. This
            eliminates the need for a case-by-case evaluation by lenders and
            spreads individual NFT valuations and risks across the NFT20, NFTX
            pools.
          </p>
        </v-flex>
        <v-spacer></v-spacer>
      </v-layout>
      <v-parallax src="/images/4.jpg" class="image-overlay">
        <p class="heading-tertiary px-5 color-white text-centre">
          We are aiming to become the go-to NFTs platform on the BSC network. By
          adapting to the ever changing market and with an experienced dev who
          took his past project to over $50 million market cap, we are set to
          become the next big thing on BSC.
        </p>
      </v-parallax>
    </v-container>
  </v-app>
</template>

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
  top: 30%;
  //   box-shadow: $box-shadow !important;
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
