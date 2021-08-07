import axios from 'axios'

const cloudHost = axios.create({
  baseURL: 'http://localhost:3002/api/v1',
})

export const getGardensApi = (userId: number) =>
  cloudHost.get(`/gardens/${userId}`)

export const getSnapshotsApi = (gardenId: number) =>
  cloudHost.get(`/snapshots/${gardenId}`)

export interface InsertGardenParams {
  userId: string
  name: string
  description: string
  deviceCount: number
}

export const insertGardenApi = (args: InsertGardenParams) => {
  console.log(args)
  return cloudHost.post('/gardens', args)
}
