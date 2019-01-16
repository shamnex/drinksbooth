import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

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
      name: 'product',
      path: '/buy/:buydrink',
      component: () => import(/* webpackChunkName: "product" */ './views/Product.vue')
    },
    {
      name: 'shop',
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
      meta: {
        requiresAuth: true
      },

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
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "login" */ './views/auth/Login.vue'),
      meta: {
        guest: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('drinksBoothJwt') === null) {
      next({
        path: '/login',
        query: { nextUrl: '/checkout' }
      })
    }
  } else {
      next();
  }
  if (to.name === 'login') {
  }

//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (localStorage.getItem('jwt') == null) {
//       next({
//         path: '/login',
//         params: { nextUrl: to.fullPath }
//       })
//     } else {
//       let user = JSON.parse(localStorage.getItem('user'))
//       if (to.matched.some(record => record.meta.is_admin)) {
//         if (user.is_admin === 1) {
//           next()
//         } else {
//           next({ name: 'userboard' })
//         }
//       } else {
//         next()
//       }
//     }
//   } else if (to.matched.some(record => record.meta.guest)) {
//     if (localStorage.getItem('jwt') == null) {
//       next()
//     } else {
//       next({ name: 'userboard' })
//     }
//   } else {
//     next()
//   }
})

export default router
