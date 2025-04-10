// In axios.js
import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true, // Automatically sends cookies
    headers: {
        'Content-Type': 'application/json',
    }
});