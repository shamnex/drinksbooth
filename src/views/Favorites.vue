<template>
    <v-app class="chat-wrapper" >
        
            <div class="header">
            </div>
    


       <v-content class="chat">

                   
           <v-container  fill-height>
               
           </v-container>
       </v-content>
    </v-app>
  </template>

<script>
import ShopHeader from "../components/shop-header/ShopHeader";
import VideoBg from "vue-videobg";

export default {
  components: {
    ShopHeader,
    VideoBg
  },

  data() {
    return {
      message: "",
      videos: ["videos/drip_4.mp4"],
      chatMessages: [
          {
              message: "hello",
              isBot: true,
          },
          {
              message: "I'm Alex",
              isBot: true,
          },
          {
              message: "whats up with you alex",
              isBot: false,
          },
          {
              message: "I just dey oh",
              isBot: false,
          },
          {
              message: "Nice one ",
              isBot: true,
          }
      ]
    };
  },

  watch: {
    $route(to, from) {
      this.route = to;
    }
  },

  computed: {
    routeName: function() {
      return this.$route.params.category === undefined
        ? "Shop"
        : this.$route.params.category;
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

.videoBG {
}

.chat {
  &-wrapper {
    height: 100vh;
    min-height: 100px;
  }

  //   &-background {
  //     content: "skhskhskhs";
  //     position: absolute;
  //     height: 100vh;
  //     width: 100vw;
  //     z-index: 1;
  //     background-image: linear-gradient(
  //       to bottom,
  //       rgba($color-primary, 0.9) 10%,
  //       rgba($color-primary, 0.8) 30%,
  //       rgba($color-white, 0)
  //     );
  //   }
  &-header {
    box-shadow: $box-shadow;
    background: $color-white;
    z-index: 100;
    avatar {
      img {
        border: solid 3px #fff;
      }
    }

    .chat-bot-name {
      span {
        display: block;
        font-size: 12px;
        font-weight: 300;
        color: $color-black;
      }
    }
  }
  position: absolute;
  top: 18%;
  z-index: 20;
  &-card {
    overflow: hidden;
    position: relative;
    box-shadow: $box-shadow;
    height: 70vh;
    min-height: 600px;
    width: inherit;
    top: 0;
    max-width: 1000px;
    background-color: transparent;
    &-footer {
      position: absolute;
      bottom: 0;
      width: 100%;
      z-index: 10;
      overflow: hidden;
      background: $color-white;

      .input {
        background-color: white;
        height: 100%;
        width: 100%;
        padding: 20px;
        &:focus,
        &:active {
          border: solid 0 transparent;
          outline: none;
        }
      }
    }
    &-body {
      height: 70vh;
      overflow-y: scroll;
      position: relative;
      //   background-color: rgba($color-background, 0.6);
      //   background-color: rgba($color-background, 0.6);

      &-background {
        position: absolute;
        padding: 0;
        // overflow: hidden;
        // @include absolutecenter;

        width: 100%;
        * {
          max-height: 600px;
          // transform: scale(0.8)
        }
      }

      &-messages {
        position: absolute;
        z-index: 10;
        padding: 20px;
        display: flex;
        flex-direction: column;
        width: 100%;

        .speech-bubble {
          display: inline-block;
          position: relative;
          background: $color-white;
          border-radius: 2px;
          padding: 10px;
          margin-top: 20px;
          max-width: 250px;
          text-align: left;
              align-self:flex-start;

          &-right {
            display: inline-block;
            position: relative;
            background: $color-white;
            border-radius: 2px;
            padding: 10px;
            margin-top: 20px;
            max-width: 250px;
            text-align: right;
            align-self:flex-end;

            &::after {
              content: "";
              position: absolute;
              right: 1px;
              top: 50%;
              width: 0;
              height: 0;
              border: 10px solid transparent;
              border-left: $color-white solid 30px;
              border-right: 0;
              margin-top: -10px;
              margin-right: -10px;
              z-index: -2;
              @include shadow;
            }
          }
        }

        .speech-bubble:after {
          content: "";
          position: absolute;
          left: 1px;
          top: 50%;
          width: 0;
          height: 0;
          border: 10px solid transparent;
          border-right: $color-white solid 30px;
          border-left: 0;
          margin-top: -10px;
          margin-left: -10px;
          z-index: -2;
          @include shadow;
        }
      }

      //   .video-wrapper {
      //       position: relative;
      //       height: 100%;
      //       width: 100%;
      //   }
    }
  }
}

.container {
  position: relative;
}
</style>
