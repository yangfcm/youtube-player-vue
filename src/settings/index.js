import axios from "axios";

export const apiBaseUrl = "https://www.googleapis.com/youtube/v3";

export default axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
  params: {
    key: process.env.VUE_APP_API_KEY,
  },
});
