 /* eslint-disable */ 
import axios from 'axios'

export default {
  getProducts (page = 1) {
    return axios.get('/products', {
      page: page
    })
  },
  getCategories (page = 1) {
    return axios.get('/categories', {
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
  },
  getProduct(id, page = 1) {
    return axios.get('/product/'+id, {
      page: page
    })
  },
  getProductByCategory (cId, page = 1) {
    return axios.get('/products-by-category/'+cId, {
      page: page
    })
  },
  queryProduct (queryParams, page = 1) {
    return axios.get('/search?q='+queryParams, {
      page: page
    })
  }
}
