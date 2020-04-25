import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-5ca0e.firebaseio.com/'
});

export default instance;