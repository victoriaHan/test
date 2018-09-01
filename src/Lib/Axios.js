import Axios from 'axios'

let AxiosInstance = Axios.create({
  baseURL: '/api',
  withCredentials: true,
  crossDomain: true
})

AxiosInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// // Intercept Axios response so can redirect user to Login page if token is not valid anymore
// AxiosInstance.interceptors.response.use((response) => response)

export default AxiosInstance
