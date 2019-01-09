<template>
  <v-app class="chat-wrapper">
    <!-- <video-bg :sources="['videos/drip_1.mp4']" img="videos/drip_4.png">
    </video-bg>-->
    <!-- <shop-header

            title="Chat"
            :hasSearch="false"
            image="images/14.jpg"
            height="40vh"

            > 
    </shop-header>-->
    <v-layout align-center justify-center>
      <v-flex class="chat-card">
        <div class="chat-header pl-4 pr-4">
          <div class="heading-tertiary color-secondary">
            <v-layout align-center>
              <v-avatar size="40">
                <!-- <v-icon>account</v-icon> -->
                <img src="images/1.jpg" alt="John">
              </v-avatar>
              <v-flex class="ma-3 text-bold chat-bot-name" xs10>
                Alex Tony
                <span>online</span>
              </v-flex>
              <v-flex class="ma-3 text-bold text-xs-right" xs10>
                <v-btn icon small flat>
                    <v-icon color="primary">more_vert</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </div>
        </div>
        <div class="chat-card-body-background">
          <video-bg class="image-overlay" :sources="videos" img="videos/drip_4.png"></video-bg>
        </div>
        <!-- <v-divider></v-divider> -->
        <!-- <v-layout column  class="chat-card-body">
                                    <v-flex >
                                            <v-flex ref="itemInCart" class="mb-4" v-for="(item, i) in itemsInCart" :key="i">
                                                <item-card  
                                                    :type="4"
                                                    :name="item.name"
                                                    :price="item.price"
                                                    :isFavorite="item.isFavorite"
                                                    :image="item.image"
                                                    >
                                                </item-card>
                                                <v-divider></v-divider>
                                            </v-flex>
                                        
                                    </v-flex>
                                
        </v-layout >-->
        <v-layout ref="chatBodyMessages" @scroll="onScroll($event)" class="chat-card-body pa-0">
          <!-- <div class="video-wrapper"> -->
          <div class="chat-card-body-messages">
            <div
              ref="chatBubble"
              v-for="(chat, index) in chatMessages"
              :key="index"
              :class="[{'speech-bubble-right': !chat.isBot}, {'speech-bubble': chat.isBot}]"
            >{{chat.message}}</div>
          </div>
          <!-- </div> -->
        </v-layout>
        <v-layout justify-center class="chat-card-footer">
          <v-flex>
            <input
              @keyup.enter="submitChat"
              class="input"
              v-model="message"
              placeholder="Enter your message..."
            >
          </v-flex>

          <v-btn
            @click="submitChat"
            class="text-xs-center ma-0 button button__primary"
            flat
            large
            color="#fff"
          >
            <v-icon>send</v-icon>
          </v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
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

  methods: {
    submitChat() {
      if (this.message.length === 0) {
        return false;
      }
      this.chatMessages.push({
        message: this.message,
        isBot: false
      });

      setTimeout(() => {
        this.chatMessages.push({
          message: this.message,
          isBot: true
        });

        this.message = "";
      }, 1000);

      setTimeout(() => {
        this.message = "";
      }, 1100);
    },

    onScroll(e) {}
  },

  data() {
    return {
      message: "",
      videos: ["videos/drip_4.mp4"],
      chatMessages: []
    };
  },

  watch: {
    $route(to, from) {
      this.route = to;
    },
    chatMessages(old, newMessage) {
      setTimeout(() => {
        this.$refs.chatBodyMessages.scrollTop = this.$refs.chatBodyMessages.scrollHeight;
      }, 10);
    }
  },

  mounted() {
    setTimeout(() => {
      this.chatMessages.push({
        message: "Hello, How are you feeling today?",
        isBot: true
      });

      setTimeout(() => {
        this.chatMessages.push({
          message: "Can I help you with something",
          isBot: true
        });
      }, 3000);
    }, 1000);
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
  position: absolute;
  z-index: 20;
  @include respond(md) {
    height: 100vh;
    width: 100vh;
    // top: 0%;
  }
  &-wrapper {
    height: 100vh;
    min-height: 100px;
    overflow: hidden;
    position: relative;

    @include respond(sm) {
      height: 100vh;
    }
  }
  &-header {
    box-shadow: $box-shadow;
    background: $color-white;
    z-index: 100;
    height: 80px;
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
  &-card {
    overflow: hidden;
    position: relative;
    box-shadow: $box-shadow;
    height: 80vh;
    min-height: 600px;
    width: inherit;
    max-width: 1000px;
    background-color: transparent;

    @include respond(md) {
      max-width: 100vw;
      height: 100vh;
      width: 100vw;
    }
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
      height: 80vh;
      overflow-y: scroll;
      position: relative;
      max-height: 800px;
      //   background-color: rgba($color-background, 0.6);
      //   background-color: rgba($color-background, 0.6);

      @include respond(md) {
        height: calc(100% - 140px);
        max-height: 100%;
        padding-bottom: 100px;
      }

      &-background {
        position: absolute;
        padding: 0;
        // overflow: hidden;
        // @include absolutecenter;

        width: 100%;

        * {
          max-height: 80vh;

          @include respond(md) {
            max-height: 100vh;
          }
          // transform: scale(0.8)
        }
      }

      &-messages {
        position: absolute;
        z-index: 10;
        padding: 20px 20px 200px;
        display: flex;
        flex-direction: column;
        width: 100%;

        @include respond(md) {
          height: 90%;
        }

        .speech-bubble {
          position: relative;
          background: #fff;
          border-radius: 0.4em;
          align-self: flex-end;
          word-wrap: break-word;
          padding: 10px;
          text-align: left;
          align-self: flex-start;
          margin: 5px;
          max-width: 40vw;
          @include respond(sm) {
            max-width: 52vw;
          }

          &:after {
            content: "";
            position: absolute;
            left: 0;
            top: 0%;
            width: 0;
            height: 0;
            border: 20px solid transparent;
            border-right-color: #fff;
            border-left: 0;
            border-bottom: 0;
            margin-left: -20px;
            transform: scaleY(-1);
            margin-top: 10px;

            @include shadow;
          }

          &-right {
            position: relative;
            background: #fff;
            max-width: 40vw;
            border-radius: 0.4em;
            margin: 5px;
            align-self: flex-end;
            word-wrap: break-word;
            padding: 10px;

            @include respond(sm) {
              max-width: 52vw;
            }

            // transform: scale(-1, 1);

            &::after {
              transform: scaleY(-1) translateY(-100%);
              content: "";
              position: absolute;
              right: 0;
              top: 0;
              width: 0;
              height: 0;
              border: 20px solid transparent;
              border-left-color: #fff;
              border-right: 0;
              border-bottom: 0;
              margin-top: -10px;
              margin-right: -20px;
            }
          }
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
