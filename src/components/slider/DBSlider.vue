<template>
  <div ref="slideshow" class="slideshow">
    <div class="slides">
      <div class="slide slide--current">
        <!-- <div
          class="slide__img image-overlay"
          style="background-image: url('./images/3.jpg')"
        ></div> -->
        <video-bg
          class="slide__img slide__video image-overlay"
          :sources="videos"
          img="/images/2.jpg"
        ></video-bg>
        <div class="slider__info--center layout column wrap align-center">
          <p class="slide__title stylish-header color-white">ROWKET MARKET</p>
          <p class="slide__desc color-primary text-center">
            A Decentralized Community-Driven NFTs Marketplace Centered Around
            The Distribution Of Unique Art In The Form Of NFTs
          </p>
          <a class="slide__link" href="http://bit.ly/RowketCommunity"
            >Join Us</a
          >
        </div>
      </div>

      <div class="slide">
        <div
          class="slide__img image-overlay"
          style="background-image: url('./images/1.jpg')"
        ></div>
        <!-- <video-bg  class="slide__img image-overlay" :sources="videos" img="videos/drip_4.png"></video-bg> -->
        <div class="slider__info--center layout column wrap align-center">
          <p class="slide__title stylish-header color-white text-center">
            ARTIST INCUBATION
          </p>
          <p class="slide__desc color-white text-center">
            Rowket is going to be the first artist incubator for the rising NFTs
            artists on BSC. The aim is to connect digital collectors with
            creators while giving maximum exposure to creators.
          </p>

          <a
            class="slide__link"
            target="_blank"
            href="https://forms.gle/J1w5iVLx6o8oHinb8"
            >Apply As Artist</a
          >
        </div>
      </div>

      <div class="slide">
        <div
          class="slide__img image-overlay"
          style="background-image: url('./images/5.jpg')"
        ></div>
        <!-- <video-bg  class="slide__img image-overlay" :sources="videos" img="videos/drip_4.png"></video-bg> -->
        <div class="slider__info--center layout column wrap align-center">
          <p class="slide__title stylish-header color-white text-center">
            NFT TOKEN
          </p>
          <p class="slide__desc color-white text-center">
            $KET is a deflationary instant yield token with an adjustable tax
            rate of 3% on transactions which will give a 1% frictionless yield
            to hodlers and burns the other 2% for an ever-increasing price
            floor.
          </p>

          <a class="slide__link" target="_blank" href="#">LEARN MORE</a>
        </div>
      </div>
    </div>
    <nav class="slidenav">
      <v-btn
        style="top: 50%; position: absolute"
        v-on:click="nextSlide"
        class="slidenav__item slidenav__item--prev"
        icon
      >
        <v-icon color="white">keyboard_arrow_left</v-icon>
      </v-btn>

      <v-btn
        style="top: 50%; position: absolute; right: 0"
        v-on:click="prevSlide"
        class="slidenav__item slidenav__item--next"
        icon
      >
        <v-icon color="white">keyboard_arrow_right</v-icon>
      </v-btn>
    </nav>
  </div>
</template>

<script>
import anime from "animejs";
import VideoBg from "vue-videobg";

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this;

    var args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

export default {
  name: "DbSlider",
  data() {
    return {
      DOM: "",
      settings: {},
      videos: ["videos/video_bg.mp4"],
    };
  },

  components: {
    VideoBg,
  },

  mounted: function () {
    const el = this.$refs.slideshow;

    this.DOM = {};
    this.DOM.el = el;
    this.settings = {
      animation: {
        slides: {
          duration: 600,
          easing: "easeOutQuint",
        },
        shape: {
          duration: 300,
          easing: { in: "easeOutQuad", out: "easeOutQuad" },
        },
      },
      frameFill: "#6C6C58",
    };
    this.init();
  },
  methods: {
    nextSlide() {},
    prevSlide() {},

    init() {
      this.DOM.slides = Array.from(
        this.DOM.el.querySelectorAll(".slides > .slide")
      );

      this.slidesTotal = this.DOM.slides.length;
      this.DOM.nav = this.DOM.el.querySelector(".slidenav");
      this.DOM.nextCtrl = this.DOM.nav.querySelector(".slidenav__item--next");
      this.DOM.prevCtrl = this.DOM.nav.querySelector(".slidenav__item--prev");
      this.current = 0;
      this.createFrame();
      this.initEvents();
    },

    createFrame() {
      this.rect = this.DOM.el.getBoundingClientRect();
      this.frameSize = this.rect.width / 12;
      this.paths = {
        initial: this.calculatePath("initial"),
        final: this.calculatePath("final"),
      };
      this.DOM.svg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      this.DOM.svg.setAttribute("class", "shape");
      this.DOM.svg.setAttribute("width", "100%");
      this.DOM.svg.setAttribute("height", "100%");
      this.DOM.svg.setAttribute(
        "viewbox",
        `0 0 ${this.rect.width} ${this.rect.height}`
      );
      this.DOM.svg.innerHTML = `<path fill="${this.settings.frameFill}" d="${this.paths.initial}"/>`;
      this.DOM.el.insertBefore(this.DOM.svg, this.DOM.nav);
      this.DOM.shape = this.DOM.svg.lastElementChild;
    },
    updateFrame() {
      this.paths.initial = this.calculatePath("initial");
      this.paths.final = this.calculatePath("final");
      this.DOM.svg.setAttribute(
        "viewbox",
        `0 0 ${this.rect.width} ${this.rect.height}`
      );
      this.DOM.shape.setAttribute(
        "d",
        this.isAnimating ? this.paths.final : this.paths.initial
      );
    },
    calculatePath(path = "initial") {
      if (path === "initial") {
        return `M 0,0 0,${this.rect.height} ${this.rect.width},${this.rect.height} ${this.rect.width},0 0,0 Z M 0,0 ${this.rect.width},0 ${this.rect.width},${this.rect.height} 0,${this.rect.height} Z`;
      } else {
        return {
          next: `M 0,0 0,${this.rect.height} ${this.rect.width},${
            this.rect.height
          } ${this.rect.width},0 0,0 Z M ${this.frameSize},${this.frameSize} ${
            this.rect.width - this.frameSize
          },${this.frameSize / 2} ${this.rect.width - this.frameSize},${
            this.rect.height - this.frameSize / 2
          } ${this.frameSize},${this.rect.height - this.frameSize} Z`,
          prev: `M 0,0 0,${this.rect.height} ${this.rect.width},${
            this.rect.height
          } ${this.rect.width},0 0,0 Z M ${this.frameSize},${
            this.frameSize / 2
          } ${this.rect.width - this.frameSize},${this.frameSize} ${
            this.rect.width - this.frameSize
          },${this.rect.height - this.frameSize} ${this.frameSize},${
            this.rect.height - this.frameSize / 2
          } Z`,
        };
      }
    },
    initEvents() {
      this.DOM.nextCtrl.addEventListener("click", () => this.navigate("next"));
      this.DOM.prevCtrl.addEventListener("click", () => this.navigate("prev"));

      window.addEventListener(
        "resize",
        debounce(() => {
          this.rect = this.DOM.el.getBoundingClientRect();
          this.updateFrame();
        }, 20)
      );

      document.addEventListener("keydown", (ev) => {
        const keyCode = ev.keyCode || ev.which;
        if (keyCode === 37) {
          this.navigate("prev");
        } else if (keyCode === 39) {
          this.navigate("next");
        }
      });
    },

    navigate(dir = "next") {
      if (this.isAnimating) return false;
      this.isAnimating = true;

      const animateShapeIn = anime({
        targets: this.DOM.shape,
        duration: this.settings.animation.shape.duration,
        easing: this.settings.animation.shape.easing.in,
        d: dir === "next" ? this.paths.final.next : this.paths.final.prev,
      });

      const animateSlides = () => {
        return new Promise((resolve, reject) => {
          const currentSlide = this.DOM.slides[this.current];
          anime({
            targets: currentSlide,
            duration: this.settings.animation.slides.duration,
            easing: this.settings.animation.slides.easing,
            translateX: dir === "next" ? -1 * this.rect.width : this.rect.width,
            complete: () => {
              currentSlide.classList.remove("slide--current");
              resolve();
            },
          });

          this.current =
            dir === "next"
              ? this.current < this.slidesTotal - 1
                ? this.current + 1
                : 0
              : this.current > 0
              ? this.current - 1
              : this.slidesTotal - 1;

          const newSlide = this.DOM.slides[this.current];
          newSlide.classList.add("slide--current");
          anime({
            targets: newSlide,
            duration: this.settings.animation.slides.duration,
            easing: this.settings.animation.slides.easing,
            translateX: [
              dir === "next" ? this.rect.width : -1 * this.rect.width,
              0,
            ],
          });

          const newSlideImg = newSlide.querySelector(".slide__img");
          newSlideImg.style.transformOrigin =
            dir === "next" ? "-10% 50%" : "110% 50%";
          anime.remove(newSlideImg);
          anime({
            targets: newSlideImg,
            duration: this.settings.animation.slides.duration * 4,
            easing: "easeOutElastic",
            elasticity: 350,
            scale: [1.2, 1],
            rotate: [dir === "next" ? 4 : -4, 0],
          });

          anime({
            targets: [
              newSlide.querySelector(".slide__title"),
              newSlide.querySelector(".slide__desc"),
              newSlide.querySelector(".slide__link"),
            ],
            duration: this.settings.animation.slides.duration,
            easing: this.settings.animation.slides.easing,
            delay: (t, i, total) =>
              dir === "next" ? i * 100 + 750 : (total - i - 1) * 100 + 750,
            translateY: [dir === "next" ? 300 : -300, 0],
            rotate: [15, 0],
            opacity: [0, 1],
          });
        });
      };

      const animateShapeOut = () => {
        anime({
          targets: this.DOM.shape,
          duration: this.settings.animation.shape.duration,
          delay: 150,
          easing: this.settings.animation.shape.easing.out,
          d: this.paths.initial,
          complete: () => (this.isAnimating = false),
        });
      };

      animateShapeIn.finished.then(animateSlides).then(animateShapeOut);
    },
  },
};
</script>

<style src="./DBSlider.scss"  lang="scss">
</style>
