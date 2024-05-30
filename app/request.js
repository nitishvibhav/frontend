import axios from "axios";

// const accessToken = localStorage.getItem("token");
const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0M2ZhNGExMTZiYjk3NWQzZWU3ZTZhNiIsImVtYWlsIjoiYWRtaW5AY29uc3VsdGFuY3kuY29tIiwiaWF0IjoxNjgxODk3Mzc0fQ.vEhxinEnJD4vRUrMC_eRjbLKWpRCCXo5HXcKeVbe6gM"
const url = {
      base: 
      "http://localhost:3001/api/v1/en/",
      // "https://guidance-alb-22456192.us-east-1.elb.amazonaws.com/api/v1/en/"
      // "http://54.198.50.249:3001/api/v1/en/",
      // "http://18.234.85.85:3001/api/v1/en/",
      // "https://apis.guidanceeducation.com.np/api/v1/en/",
};



console.log(accessToken, "accessToken")
const headers = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    Authorization:`Bearer ${accessToken}`,
    token: accessToken,
  },
};
 
const axiosFormDataConfig = {
  headers: {
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
    Authorization:`Bearer ${accessToken}`,
    token: accessToken,
  },
};

const updateToken = (token) => (headers.headers.token = token); 
console.log(headers.headers.token, "token");

function getConfig(header = {}) {
  // To add custom header for some request
  const config = { ...headers }; //:TODO when redo check file upload also
  config.headers = { ...config.headers, ...header };
  console.log(headers, "header under the function")
  return config;
}

const request = {
  get: (path, header = {}) => axios.get(url.base + path, getConfig(header)),
  delete: (path, header = {}) =>
    axios.delete(url.base + path, getConfig(header)),
  post: (path, data, header = {}) =>
    axios.post(url.base + path, data, getConfig(header)),
    
  put: (path, data, header = {}) =>
    axios.put(url.base + path, data, getConfig(header)),

  patch: (path, data, header = {}) =>
    axios.patch(url.base + path, data, getConfig(header)),
  // postFormData: function (url, data) { return axios.post(`${config.apiEndpoint + url}`, data, axiosFormDataConfig)},
  putFormData: function (path, data) {
    return axios.put(url.base + path, data, axiosFormDataConfig);
  },
};

export { request, updateToken };