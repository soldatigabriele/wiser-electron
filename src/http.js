import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_WISER_ADDRESS
axios.defaults.headers.common['SECRET'] = process.env.VUE_APP_WISER_SECRET
axios.defaults.headers.common['Content-Type'] = 'application/json';

export default axios
