import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { configure } from 'axios-hooks'
import Axios from 'axios'
import { ThemeProvider } from 'evergreen-ui';
import theme from 'layout/theme';
import * as serviceWorker from './serviceWorker';
import './index.css'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet';

// import classNames from 'classnames'

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const axios = Axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  
});

axios.interceptors.response.use(
  response => {
    return response;
  },
  err => {
    return new Promise(async (resolve,reject)=>{
      const { config, response } = err;
      const originalRequest = config;

      if(response && response.status === 401 && response.data.message.startsWith('jwt expired')){
        try {
          const { data } = await axios(
            `auth/refresh?refreshToken=${getRefreshToken()}`,
            {method : 'POST'}
          );
          originalRequest.headers['Authorization'] = data.token; //new token
          localStorage.setItem('accessToken', `"${data.token}"` );
          resolve(axios(originalRequest));
        } catch(err) {
          if(err.response && err.response.status === 401 && err.response.data.message.startsWith('refresh token expired')){
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.replace('/')
          }else{
            reject(err)
          }
        }
      }
      return reject(err);
    })
  }
);

axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getAccessToken()}`;
  return config;
}, (error) => {
    return Promise.reject(error);
});

function getAccessToken(){
  let accessToken = localStorage.getItem('accessToken') || '';
  return accessToken.replace(/"/g,'');
}
function getRefreshToken(){
  let refreshToken = localStorage.getItem('refreshToken') || '';
  return refreshToken.replace(/"/g,'');
}

configure({ axios })

ReactDOM.render(
    <ThemeProvider value={theme}>
      <App />
    </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
