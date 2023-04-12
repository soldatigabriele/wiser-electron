import axios from 'axios'

axios.defaults.baseURL = 'http://192.168.1.134'
axios.defaults.headers.common['SECRET'] = ""
axios.defaults.headers.common['Content-Type'] = 'application/json';

export default axios
