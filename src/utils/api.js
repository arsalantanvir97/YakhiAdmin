import axios from "axios";

export let baseURL;
export let imageURL;

if (window.location.hostname == "localhost") {
  baseURL = "https://localhost:5089/api";
  imageURL = "https://localhost:5089/";
} else {
  baseURL = "https://yahkiawakened.store:5089/api";
  imageURL = "https://yahkiawakened.store:5089/";
}

let api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
})
api.interceptors.request.use(function (config) {
  const token = JSON.parse(localStorage.getItem('token'))
  console.log('token',token)
  //   console.log(`'tokentokentoken'.`, token?.token);
  config.headers.Authorization = token ? `Bearer ${token}` : ''
  console.log('config', config)
  return config
})

export default api;
