import axios from 'axios'


var instance = axios.create({
    // the backend url
    baseURL: '',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default instance
