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

// var username = 'roots'
// var password = 'pass1234'
// Dev Service baseURL
// axios.defaults.baseURL = 'http://localhost:8000/api-v1'
// production Service baseURL
axios.defaults.baseURL = 'http://159.89.30.225:8000/api-v1'
axios.defaults.headers.common['Authorization'] = 'Token 8f7fce4045aebd9d542da69124546bd325b04c3b'
// axios.defaults.headers.common['Authorization'] = 'Basic ' + btoa(username + ':' + password)

Vue.config.productionTip = false
Vue.use(vBlur, axios, VueAxios)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
