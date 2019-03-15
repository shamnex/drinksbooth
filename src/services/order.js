import axios from 'axios'

export default {
  createOrder (customer) {
    return new Promise((resolve, reject) => {
      const payload = {
        customer
      }
      axios.post('/orders', payload)
        .then(res => {
          const parsed = JSON.stringify(res.data)
          localStorage.setItem('drinks-booth-order-id', parsed)
          resolve()
        })
        .catch(err => reject(err))
    })
  },

  getOrder (customer) {
    const order = (localStorage.getItem('drinks-booth-order-id'))
    return new Promise((resolve, reject) => {
      if (order === null) {
        return this.createOrder(customer)
      } else {
        resolve(JSON.parse(order))
      }
    })
  },

  addItemToCart (order, item) {
    return new Promise(async (resolve, reject) => {
      const existingItem = await this.getCart(order)
        .then(cart => cart.find(cartItem => cartItem.cart_product.id === item.id))

      const payload = {
        'cart_status': existingItem ? '' : 'new',
        'cart_product_quantity': existingItem ? existingItem.cart_product_quantity : item.quantity || 1,
        'cart_product_amount': item.price,
        'cart_product': item.id,
        'cart_order_ref': order.id
      }

      if (existingItem) {
        payload.cart_product_quantity++
        console.log(payload)
        return axios
          .put(`/cart/${existingItem.id}/`, payload)
          .then(_ => resolve('Item Added To Cart'))
          .catch(err => reject(err))
      }

      axios
        .post('/carts', payload)
        .then(_ => resolve('Item Added To Cart'))
        .catch(err => reject(err))
    })
  },
  modifyItem (order, item) {
    const payload = {
      'cart_status': '',
      'cart_product_quantity': item.cart_product_quantity,
      'cart_product_amount': item.cart_product_amount,
      'cart_product': item.cart_product.id,
      'cart_order_ref': order.id
    }
    return new Promise((resolve, reject) => {
      axios
        .put(`/cart/${item.id}/`, payload)
        .then(_ => resolve('Item Added To Cart'))
        .catch(err => reject(err))
    })
  },

  deleteItemFromCart (item) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/cart/${item.id}`)
        .then(_ => resolve('Item Removed From Cart'))
        .catch(err => reject(err))
    })
  },

  getCart (order) {
    return new Promise((resolve, reject) => {
      axios.get(`/order-items/${order.id}`)
        .then(res => {
          resolve(res.data.carts)
        })
        .catch(err => {
          return reject(err)
        })
    })
  },

  updateOrder (payload) {
    return new Promise((resolve, reject) => {
      axios.put(`/order/${payload.id}`, payload)
        .then(res => {
          // if (res.status === 'success') {
            resolve(res.data)
          // } else {
          //   reject(res)
          // }
        })
        .catch(err => reject(err))
    })
  }

  //   getOrderTotal (order) {
  //     return new Promise((resolve, reject) => {
  //       this.getCart(order).then(cart => {
  //           console.log(cart)
  //         cart.reduce((prev, next) => {
  //           return resolve(prev.prod_price + next.prod_price)
  //         })
  //       }).catch(err => reject(err))
  //     })
  //   }

}
