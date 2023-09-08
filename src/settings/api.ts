import axios from 'axios'
import { GOOGLE_AUTH_API_URL, YOUTUBE_DATA_API_URL } from './constants'

const axiosInstance = axios.create({
  baseURL: YOUTUBE_DATA_API_URL,
  params: {
    key: import.meta.env.VITE_API_KEY,
  },
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data?.error?.message) {
      // Preferably use error message from response.
      error.message = error.response.data.error.message
    }
    return Promise.reject(error)
  },
)

export const appAxios = axiosInstance

export const gAuthAxios = axios.create({
  baseURL: GOOGLE_AUTH_API_URL,
})
