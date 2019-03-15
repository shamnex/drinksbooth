import axios from 'axios'

export default {
  login (payload) {
    return new Promise((resolve, reject) => {
      axios.post('/account-login', payload)
        .then(res => {
          if (res.data.status === 'success') {
            const parsed = JSON.stringify(res.data)
            localStorage.setItem('drinks-booth-user-id', parsed)
            return resolve(res.data.data)
          } else {
            reject(res.data)
          }
        })
        .catch(err => reject(err))
    })
  },
  register (payload) {
    return new Promise((resolve, reject) => {
      axios.post('/accounts', payload)
        .then(res => {
          console.log(res)
          if (res.data) {
            let saved = {}
            let dt = []
            dt[0] = res.data
            saved.status = 'success'
            saved.data = dt
            let parsed = JSON.stringify(saved)
            localStorage.setItem('drinks-booth-user-id', parsed)
            return resolve(res.data)
          } else {
            reject(res.data)
          }
        })
        .catch(err => reject(err))
    })
  },

  getUser () {
    return JSON.parse(localStorage.getItem('drinks-booth-user-id'))
  },

  signOut () {
    return localStorage.removeItem('drinks-booth-user-id')
  }

}
