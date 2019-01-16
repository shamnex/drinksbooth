import Vue from 'vue'
import Vuex from 'vuex'
import OrdersApi from '@/services/order'

Vue.use(Vuex)
function save (state) {
  const parsed = JSON.stringify(state.itemsInCart)
  localStorage.setItem('drinks-booth-cart', parsed)
}

export default new Vuex.Store({
  state: {
    cartOpen: false,
    searchOpen: false,
    currentProduct: null,
    order: '',
    user: '',
    itemsInCart: [

    ],
    favorites: [

    ],
    cartTotal: 0.0,
    products: []
  },
  mutations: {
    toggleCart (state) {
      state.cartOpen = !state.cartOpen
    },
    toggleSearch (state) {
      state.searchOpen = !state.searchOpen
    },
    deleteItem (state, index) {
      state.itemsInCart.splice(index, 1)
      save(state)
    },

    setItemsInCart (state, cart) {
      state.itemsInCart = cart
    },

    getCartTotal (state) {
      state.cartTotal = state.itemsInCart.map((item) =>
        parseInt(item.cart_product_amount * item.cart_product_quantity)
      ).reduce((acc, curr) => acc + curr, 0)
    },

    setProduct (state, product) {
      state.currentProduct = product
    },
    setUser (state, user) {
      state.user = user
    },
    setAllProducts (state, product) {
      state.products = product
    }

  },
  actions: {
    addItem (context, item) {
      OrdersApi.getOrder()
        .then(order => {
          context.state.order = order
          OrdersApi.addItemToCart(order, item)
            .then(_ => {
              OrdersApi.getCart(order).then(cart => {
                context.state.itemsInCart = cart
                context.commit('getCartTotal')
                return context.state.itemsInCart
              })
            })
        })
    }
  },
  getters: {
    cartOpen (state) {
      return state.cartOpen
    },
    lastItemIncart (state) {
      return state.itemsInCart
    },
    searchOpen (state) {
      return state.searchOpen
    },
    getProduct (state) {
      return state.currentProduct
    },
    getAllProducts (state) {
      return state.products
    },
    getUser (state) {
      return state.user
    }
  }
})
