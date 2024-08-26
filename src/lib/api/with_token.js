import axios from 'axios';
import { base_url } from '../constant';
import { getToken } from '../helper';


// Create an axios instance
export const apiWithToken = axios.create({
    // baseURL: base_url,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8"
    }
});

// Add a request interceptor to attach the Authorization header
apiWithToken.interceptors.request.use(config => {
    const authToken = getToken();
    if (authToken) {
        config.headers.Authorization = `${authToken}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});


// // Usage Example
// makeApiRequest.get('/endpoint')
//     .then(response => {
//         console.log('Data:', response.data);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
