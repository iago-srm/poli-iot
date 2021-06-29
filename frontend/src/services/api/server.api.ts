import axios from 'axios'

const cloudHost = axios.create({
  baseURL: 'http://localhost:3006/api/v1/users',
})

export const CloudApi = () => cloudHost.get<any[]>('/')
