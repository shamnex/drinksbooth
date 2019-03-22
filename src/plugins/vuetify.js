import Vue from 'vue'
import Vuetify, {
} from 'vuetify/lib'

import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, {
    theme: {
        primary: '#23B5DA',
        secondary: '#5F86AD',
        accent: '#6AA2BC',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
    },
    iconfont: 'md'
})
