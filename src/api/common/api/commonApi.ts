import axios from 'axios'
export const instance = axios.create({
  baseURL: 'http://dev.trainee.dex-it.ru/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
