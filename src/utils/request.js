import QueryString from 'qs';
import config from '../configuration';
import Auth from './auth';

export function APIError(json) {
  this.name = 'APIError';
  this.data = json;
  this.stack = (new Error()).stack;
}
APIError.prototype = Object.create(Error.prototype);
APIError.prototype.constructor = APIError;

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

const request = async (url, method, body, customHeaders = {}) => {
  let endpoint = url;
  if (!url.startsWith('http')) {
    endpoint = config.apiUrl + url;
  }
  const headers = {
    ...defaultHeaders,
    ...customHeaders,
  };

  const token = Auth.getToken();
  if (token) {
    headers['Authorization'] = token;
  }

  let data = null;
  if (body) {
    if (headers['Content-Type'] === 'application/json') {
      data = JSON.stringify(body);
    } else {
      delete headers['Content-Type'];
      data = body;
    }
  } else {
    delete headers['Content-Type'];
  }

  const fetchOpts = {
    method,
    headers,
  };
  if (method !== 'HEAD' && method !== 'GET') {
    fetchOpts.body = data;
  }

  const response = await fetch(endpoint, fetchOpts);
  let json = await response.json();

  if (response.status < 200 || response.status >= 300) {
    if (json) {
      throw new APIError(json);
    } else {
      throw new Error(response.statusText);
    }
  }

  return json;
};

export const get = (endpoint, params) => {
  let url = endpoint;
  if (params) {
    url += `?${QueryString.stringify(params)}`;
  }
  return request(url, 'GET');
};

export const post = (endpoint, body, headers = {}) => (
  request(endpoint, 'POST', body, headers)
);

export const put = (endpoint, body) => (
  request(endpoint, 'PUT', body)
);

export const del = (endpoint, body) => (
  request(endpoint, 'DELETE', body)
);

export default {
  get,
  post,
  put,
  del
};
