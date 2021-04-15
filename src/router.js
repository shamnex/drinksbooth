import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import authService from '@/services/auth'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/lite',
            name: 'lite',

            component: () => import(/* webpackChunkName: "Planner" */ './views/PartyPlanner.vue')
        },



    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {

    } else if (to.matched.some(record => record.meta.isAuth) && authService.getUser() !== null) {
        next({
            path: '/'
        })
    } else {
        next()
    }
})

export default router
