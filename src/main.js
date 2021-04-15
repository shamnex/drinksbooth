import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

import vBlur from 'v-blur'
import axios from 'axios'
import VueAxios from 'vue-axios'

// require styles
import './stylus/main.styl'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'swiper/dist/css/swiper.css'



Vue.config.productionTip = false
Vue.use(vBlur, axios, VueAxios)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
