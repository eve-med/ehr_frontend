import axios from 'axios'
window.axios = axios
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:8000/'
} else {
  axios.defaults.baseURL = 'https://backend.evemed.ar/'
}
