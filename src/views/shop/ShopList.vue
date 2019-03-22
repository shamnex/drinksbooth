<template>
  <v-app>
    <v-container
      v-bind:fluid="$vuetify.breakpoint.mdAndDown"
      justify-center
      align-start
      class="shop"
    >
      <v-layout row v-if="products.length > 0">
        <!-- <v-flex md-0 class="shop-filter hidden-sm-and-down pa-2 xs3" >
                <v-layout column>
                    <v-flex class=" mb-2 ">
                            <p class="mb-2 shop-filter-header">Filter</p>
                          <v-divider></v-divider>
                    </v-flex>
                    <v-flex class="mb-2 shop-filter-body">
                        <v-expansion-panel class="no-shadow "
                            v-model="panel"
                            expand
                            >
                            <v-expansion-panel-content

                            >
                                <div slot="header">Categories</div>
                                <v-card>
                                <v-card-text>
                                    <v-checkbox
                                     v-model="selected"
                                     label="Drinks"
                                      value="Drinks">
                                    </v-checkbox>

                                    <v-checkbox
                                    v-model="selected"
                                    label="Champagne"
                                     value="Champagne">
                                   </v-checkbox>
                                </v-card-text>
                                </v-card>
                            </v-expansion-panel-content>

                            </v-expansion-panel>
                        </v-flex>
                </v-layout>
        </v-flex>-->
        <v-flex class="shop-main" xs12>
          <v-layout
            :column="$vuetify.breakpoint.smAndDown"
            v-if="routeName !== 'Shop'"
            class="shop-header shop-header-category"
            align-center
            mb-4
          >
            <v-flex class="shop-header-category__title">
              <div
                class="normal-header"
                v-bind:class="{'normal-header--border-bottom': $vuetify.breakpoint.smAndDown }"
              >{{category.cat_name}}</div>
            </v-flex>

            <v-flex
              class="shop-header-category__description text-md-left text-xs-center"
            >{{category.cat_discrip}}</v-flex>
          </v-layout>
          <v-layout class="shop-header" align-center justify-space-between>
            <v-flex class="shop-header__breadcrumbs" xs12>Showing of {{count}} items</v-flex>

            <v-select
              style="transform:translateY(12px)"
              flat
              solo
              background-color="#fff"
              height="20px"
              :items="items"
              label="Filter By"
            ></v-select>
          </v-layout>
          <div class="shop-body">
            <v-container v-bind="{ [`grid-list-xl`]: true }" fluid>
              <v-layout row wrap>
                <v-flex v-for="(product) in products" :key="product.id" xs12 sm6 md4 lg3>
                  <item-card
                    size="lg"
                    :id="product.id"
                    :name="product.prod_name"
                    :price="product.prod_price"
                    :image="product.prod_image"
                    :type="$vuetify.breakpoint.xsOnly? 3:1"
                  ></item-card>
                </v-flex>
              </v-layout>
            </v-container>
          </div>
          <paginate
            :page-count="pages_"
            :page-range="3"
            :margin-pages="2"
            :click-handler="clickCallback"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :container-class="'pagination'"
            :page-class="'page-item'"
          ></paginate>
        </v-flex>
      </v-layout>

      <v-layout class="pa-5 ma-5" v-else justify-center align-center>
        <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
      </v-layout>
      <div class="text-xs-center">
        <!-- <p class="mt-5">Showing 12 of 1929 drinks</p> -->
        <v-container v-if="products && products.length > 0">
          <v-layout justify-center>
            <v-flex xs12>
              <!-- <infinite-loading @infinite="infiniteHandler"></infinite-loading> -->

              <!-- <div class="shop-footer">
                <v-pagination v-model="currentPage" :length="pages"></v-pagination>
              </div>-->
            </v-flex>
          </v-layout>
        </v-container>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import ShopHeader from "../../components/shop-header/ShopHeader";
import ItemCard from "../../components/item_card/ItemCard";
import ProductsApi from "@/services/products";
import { mapGetters } from "vuex";
import InfiniteLoading from "vue-infinite-loading";
import Paginate from "vuejs-paginate";

export default {
  data: () => ({
    items: ["Most Popular", "Best Seller", "Lowest Price", "Highest Price"],
    panel: [false, true, true],
    page: 1,
    count: 0,
    pages_: 1
  }),
  components: {
    ItemCard,
    InfiniteLoading,
    Paginate
  },
  methods: {
    search() {
      console.log("search");
    },
    clickCallback(pageNum) {
      console.log(pageNum);
    },
    getAllProducts() {
      let query_str = window.location.href.split("=")[1];
      // console.log(query_str)
      // console.log(typeof this.$route.params.category)
      if (typeof query_str != "undefined") {
        ProductsApi.queryProduct(query_str).then(res => {
          this.$store.commit("setAllProducts", res.data.results);
          this.count = res.data.count;
        });
      } else if (typeof this.$route.params.category != "undefined") {
        ProductsApi.getProductByCategory(this.$route.params.category).then(
          res => {
            this.$store.commit("setAllProducts", res.data.results);
            this.count = res.data.count;
          }
        );
      } else {
        ProductsApi.getProducts().then(res => {
          this.$store.commit("setAllProducts", res.data.results);
          this.count = res.data.count;
        });
      }
    },
    getAllCategories() {
      let query_str = window.location.href.split("=")[1];
      if (typeof query_str == "undefined") {
        ProductsApi.getCategories().then(res => {
          this.$store.commit("setCategories", res.data.results);
          this.getCategory();
        });
      } else {
        ProductsApi.getCategories().then(res => {
          this.$store.commit("setCategories", res.data.results);
        });
      }
    },
    getCategory() {
      console.log(this.categories);
      let cat = this.categories.filter(el => {
        return el.cat_slug == this.$route.params.category;
      });
      this.$store.commit("setCategory", cat[0]);
    },

    infiniteHandler($state) {
      // return false;
    }
  },
  created() {
    this.getAllCategories();
    this.getAllProducts();
  },

  watch: {
    $route(to, from) {
      this.route = to;
      this.getAllCategories();
      this.getAllProducts();
    }
  },

  computed: {
    routeName: function() {
      // console.log(this.$route.params)

      return this.$route.params.category === undefined
        ? "Shop"
        : this.$route.params.category;
    },

    pages: function() {
      return Math.round(this.products.length / 10);
    },
    ...mapGetters({
      products: "getAllProducts",
      categories: "getAllCategories",
      category: "getCategory"
    })
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/abstract/_variables";

.shop {
  margin-top: 30px;
  &-filter {
    background-color: $color-white;
    height: 100vh;
    min-height: 400px;
    box-shadow: 0 20px 20px rgba($color-primary, 0.075);

    &-header {
      font-size: 20px;
      font-weight: 200;
      padding: 10px;
    }

    &-body {
    }
  }
  &-header {
    padding: 0 20px 0;
    margin: 0 24px;
    font-size: 16px;
    background-color: $color-white;
    box-shadow: 0 20px 20px rgba($color-primary, 0.075);
    &__breadcrumbs {
      padding: 10px 0;
    }

    &-category {
      padding: 20px;
      &__title {
        min-width: 200px;
        position: relative;
        @include respond(md) {
          margin-bottom: 30px;
        }
        &::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          top: 50%;
          transform: translateY(-50%);
          border-right: solid 2px rgba($color-secondary, 0.2);
          @include respond(sm) {
            display: none;
          }
        }
        * {
          font-size: 50px;
          padding-right: 20px;
          line-height: 1;
          text-align: center;
        }
      }

      @include respond(sm) {
        //  flex: 1 0;
      }
      &__description {
        padding-left: 20px;
      }
    }
  }

  &-footer {
    padding: 20px 0;
    box-shadow: 0 20px 20px rgba($color-primary, 0.05);
    background-color: $color-white;
  }

  .pagination {
    list-style-type: none;
    position: relative;
  }
  .page-item {
    list-style-type: none;
  }
}
</style>
