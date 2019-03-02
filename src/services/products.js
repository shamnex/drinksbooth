import axios from 'axios'

export default {
  getProducts (page = 1) {
    return axios.get('/products', {
      page: page
    })
  },
  getProductById (id) {
    return new Promise((resolve, reject) => {
      this.getProducts()
        .then(res => {
          const found = res.data.results.find(element => element.id === parseInt(id))
          resolve(found)
        })
        .catch(err => reject(err))
    })
    // return axios.get('/product/' + id)
  }
}
