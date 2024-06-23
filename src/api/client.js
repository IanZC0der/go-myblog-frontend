import axios from 'axios'
import { Message } from '@arco-design/web-vue'

var instance = axios.create({
  // the backend url
  baseURL: '',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// define a response interceptor here

instance.interceptors.response.use(
  (res) => {
    console.log(res)
  },
  (error) => {
    let msg = error.message
    if (error.response.data && error.response.data.message) {
      msg = error.response.data.message
      // use switch case to handle the self-defined error code

      switch (error.response.data.code) {
        case 5000:
          //   Message.error('auth failed')
          break
        case 5001:
          // token expired, redirect to login page
          Message.error('token expired')
          window.location.assign('/login')
          break
        case 6000:
          Message.error('permission denied')
          break
        default:
          break
      }
    }
    Message.error(`${msg}`)
    return Promise.reject(error.response.data)
  }
)

export default instance
