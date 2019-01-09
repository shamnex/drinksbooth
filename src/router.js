import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },

    {
      path: '/buy/:buydrink',
      component: () => import(/* webpackChunkName: "product" */ './views/Product.vue')
    },
    {
      path: '/shop',
      component: () => import(/* webpackChunkName: "shopeHome" */ './views/shop/ShopHome.vue'),
      children: [
        {
          path: '',
          component: () => import(/* webpackChunkName: "ShopList" */ './views/shop/ShopList.vue')
        },
        {
          path: ':category',
          component: () => import(/* webpackChunkName: "category" */ './views/shop/ShopList.vue')
        }
      ]
    },
    {
      path: '/planner',
      name: 'planner',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "Planner" */ './views/PartyPlanner.vue')
    },
    {
      path: '/checkout',
      name: 'checkout',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "checkout" */ './views/Checkout.vue')
    },
    {
      path: '/chat',
      name: 'chat',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "chat" */ './views/Chat.vue')
    },
    {
      path: '/favorites',
      name: 'favorites',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "favorites" */ './views/Favorites.vue')
    },
    {
      path: '/search',
      name: 'search',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "favorites" */ './views/Search.vue')
    },
    {
      path: '/login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "login" */ './views/auth/Login.vue')
    }

  ]
})
