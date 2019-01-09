import axios from 'axios'

// var username = 'roots'
// var password = 'pass1234'
// axios.defaults.baseURL = 'http://159.89.30.225:8000/api-v1'
// axios.defaults.headers.common['Authorization'] = 'Basic ' + btoa(username + ':' + password)

export default {
  getProducts () {
    return axios.get('/products')
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
