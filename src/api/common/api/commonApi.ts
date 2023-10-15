import axios from 'axios'
const userJSON = localStorage.getItem('user')
const user = userJSON ? JSON.parse(userJSON) : ''
export const instance = axios.create({
  baseURL: 'http://dev.trainee.dex-it.ru/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + user.token,
  },
})
