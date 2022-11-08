import axios from "axios";

export let baseURL;
export let imageURL;

if (window.location.hostname == "localhost") {
  baseURL = "https://localhost:5089/api";
  imageURL = "https://localhost:5089/";
} else {
  baseURL = "https://dev74.onlinetestingserver.com:5089/api";
  imageURL = "https://dev74.onlinetestingserver.com:5089/";
}

const api = axios.create({
  // baseURL: 'https://dev74.onlinetestingserver.com:5021/api',
  baseURL,

  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});
//   api.interceptors.request.use((config) => {
//     document.querySelector('.spinner-container').style.display = 'block';
//     return config;
//   }, (error) => {
//     document.querySelector('.spinner-container').style.display = 'none';
//     return Promise.reject(error);
//   });

//   // Add a response interceptor
//   api.interceptors.response.use((response) => {
//     document.querySelector('.spinner-container').style.display = 'none';
//     return response;
//   }, (error) => {
//     document.querySelector('.spinner-container').style.display = 'none';
//     return Promise.reject(error);
//   });

export default api;
