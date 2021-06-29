import axios from 'axios'
import { User } from '../../domain'
import { parseCookies } from 'nookies'
import { getAPIClient } from './axios'

const authost = axios.create({
  baseURL: 'http://localhost:3003/api/v1',
})

export const login = ({ email, password }) =>
  authost.post<{ refreshToken: string; accessToken: string; user: any }>(
    'sessions',
    { email, password }
  )
export const register = ({ email, password, confirmPassword }) =>
  authost.post('users', { email, password, confirmPassword })
export const getUser = ({ userId }) => authost.get<any>(`users/${userId}`)

// const apiCall = async (call: Promise<any>) => {
//   try {
//     const data = await call
//     return {
//       data,
//       error: null,
//     }
//   } catch (e) {
//     return {
//       data: null,
//       error: e,
//     }
//   }
// }
