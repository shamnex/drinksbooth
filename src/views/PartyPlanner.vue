<template>
<v-app>
<shop-header

 title="Party Planner"
 :hasSearch="false"
 image="/images/planner.jpg"
 height="40vh"

>

</shop-header>

<v-container class="stepper-wrapper">
    <v-layout>

        <v-flex align-center justify-center>
            <v-stepper class="stepper" v-model="e1">
        <v-stepper-header class="stepper-header" >
        <v-stepper-step @click="e1 = 1" :complete="e1 > 1" step="1">Get Started</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step @click="e1 = 2"  :complete="e1 > 2" step="2">Budget</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step @click="e1 = 3"  :complete="e1 > 3" step="3">Guests</v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step @click="e1 = 4"  :complete="e1 > 4" step="4">Drinks</v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step @click="e1 = 5" :complete="e1 > 5" step="5">Buy</v-stepper-step>

        </v-stepper-header>

        <v-stepper-items class="stepper-items">
        <v-stepper-content class="stepper-body" step="1">
                <v-layout column justify-center align-center="">
                    <v-flex xs12>
                       
                            <v-layout class="text-xs-center" column="" justify-space-between>
                                                    <div class="stylish-header stylish-header--sm stylish-header--border-bottom ">Let us plan with you</div>

                                        <p class="pl-5 pr-5  text-xs-center">     Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius deserunt nisi cumque laudantium enim? Quia officia neque, error esse provident id hic reiciendis earum ducimus adipisci totam repudiandae praesentium distinctio?
                                        </p>

                            </v-layout>
                    </v-flex>
                    <v-flex class="stepper-footer">
                            <v-btn
                    class="button__primary"
                    flat large color="#fff"
                    @click="e1 = 2"
                    >
                    Get Started
                    </v-btn>

                    </v-flex>
                </v-layout>

        </v-stepper-content>

        <v-stepper-content class="stepper-body" step="2">
                     <v-layout column justify-center align-center="">
                    <v-flex xs12>
                      
                            <v-layout column="" justify-space-between align-center="">
                                                    <div class="stylish-header stylish-header--sm d-block stylish-header--border-bottom ">

                                                        How deep is your pocket?
                                                    </div>

                                        <p class="pl-5 pr-5 text-xs-center">     Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius deserunt nisi cumque mus adipisci totam repudiandae praesentium distinctio?
                                        </p>

                            <v-radio-group  v-model="budget" class="mt-5 d-flex" column>
                            <v-radio  label="N100,000" value="100k"></v-radio>
                            
                            <v-radio label="N150,000" value="150k"></v-radio>
                            <v-radio label="N1 Million" value="1M"></v-radio>
                            </v-radio-group>

                            </v-layout>
                    </v-flex>
                    <v-flex class="stepper-footer">

                     <v-btn flat  class=""  large color="" @click="e1 = 1">Go Back</v-btn>

                <v-btn
                    class="button__primary "
                    flat large color="#fff"
                    @click="e1 = 3"
                    >
                    Continue
                </v-btn>

                    </v-flex>
                </v-layout>
        </v-stepper-content>

        <v-stepper-content class="stepper-body" step="3">
         <v-layout column justify-center align-content-space-between="" align-center="">
            <v-flex xs12 fill-height>
                 
                    <v-layout column="" align-center="" justify-space-between>
                                            <div class="stylish-header stylish-header--sm d-block stylish-header--border-bottom ">How many guests are you expecting</div>

                                <p class="pl-5 pr-5">     Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius deserunt nisi cumque laudantium enim? Quia officia neque, error esse provident id hic reiciendis earum ducimus adipisci totam repudiandae praesentium distinctio?
                                </p>
            <v-radio-group   v-model="guests" class="mt-5 d-flex" column>
                            <v-radio  label="10 People" value="10"></v-radio>
                            <v-radio label="20 People" value="20"></v-radio>
                            <v-radio label="100 People" value="100"></v-radio>
                            </v-radio-group>

                    </v-layout>
            </v-flex>
            
            <div class="stepper-footer">
                <v-btn flat class=""  large color="" @click="e1 = 2">Go Back</v-btn>

                        <v-btn
                class="button__primary "
                flat large color="#fff"
                @click="e1 = 4"
                >
                Continue
                </v-btn>
            </div>
        </v-layout>
        </v-stepper-content>
        <v-stepper-content class="stepper-body" step="4">
                           <v-layout column justify-center align-center="">
                    <v-flex xs12>
                     
                            <v-layout column="" justify-space-between>
                                        <div class="stylish-header stylish-header--sm text-xs-center d-block stylish-header--border-bottom ">Category of Drinks</div>

                                        <p class="pl-5 pr-5 text-xs-center">     Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius deserunt nisi cumque laudantium enim? Quia officia neque, error esse provident id hic reiciendis earum ducimus adipisci totam repudiandae praesentium distinctio?
                                        </p>


                            </v-layout>
                    </v-flex>
                             <v-combobox 
                            class="mt-3"
                            v-model="chips"
                            :items="interests"
                            label="Category of Drinks"
                            chips
                            clearable
                            prepend-icon="filter_list"
                            solo
                            multiple>
                            <template slot="selection" slot-scope="data">
                            <v-chip
                                :selected="data.selected"
                                close
                                @input="remove(data.item)"
                            >
                                <strong>{{ data.item }}</strong>&nbsp;
                            </v-chip>
                            </template>
                        </v-combobox>
                    <v-flex class="stepper-footer">
                        <v-btn flat  large 
  @click="e1 = 3">Go Back</v-btn>

                                    <v-btn flat
                        class="button__primary"
                             large color="#fff"
                            @click="e1 = 5"
                            >
                            Continue
                            </v-btn>
                    </v-flex>
                </v-layout>

        </v-stepper-content>
        <v-stepper-content class="stepper-body" step="5">
                            <v-layout column justify-center align-center="">
                    <v-flex xs12>
                    
                            <v-layout column="" justify-space-between>
                                                    <div class="stylish-header stylish-header--sm d-block stylish-header--border-bottom ">Here's what you can do with your budget</div>

                                        <p class="pl-5 pr-5 text-xs-center">     Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius deserunt nisi cumque laudantium enim? Quia officia neque, error esse provident id hic reiciendis earum ducimus adipisci totam repudiandae praesentium distinctio?
                                        </p>

                            </v-layout>
                    </v-flex>
                    <v-flex class="stepper-footer">

                         <v-btn flat  large color="" @click="e1 = 4">Go Back</v-btn>

                            <v-btn
                    class="button__primary"
                    flat large color="#fff"
                    >
                    Buy
                    </v-btn>
                    </v-flex>
                </v-layout>
        </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
        </v-flex>
    </v-layout>
</v-container>

</v-app>
  </template>b

<script>
import ShopHeader from "../components/shop-header/ShopHeader.vue";


export default {
  components: {
    ShopHeader
  },

  data() {
    return {
      e1: 1,
      budget: [],
      guests: [],
      chips: [],
      interests: [],
      items: [
        "cognac",
        "champagne",
        "whisky",
        "wines",
        "sparkling Wine",
        "beers & Ciders",
        "spirits",
        "mixers & soft drinks",
        "promos & gift ideas",
        "spirit magazine"
      ]
    };
  },

  methods: {
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1);
      this.chips = [...this.chips];
    }
  },
  watch: {
    chips: {
      handler: function(val, oldVal) {
        val.forEach(item => {
          if (this.items.includes(item)) return false;
          else this.remove(item);
        });
      },
      deep: true
    }
  }
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
