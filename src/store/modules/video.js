import axios from "../../settings";
import { FETCH_VIDEOS, CATCH_ERROR, FETCH_VIDEO } from "../types";

const state = {
  videos: null,
  video: null,
  error: null,
};

const getters = {
  videos: (state) => state.videos,
  video: (state) => state.video,
  error: (state) => {
    if (state.error.error) {
      /** Parse the error returned from google API */
      return {
        code: state.error.error.code,
        message: state.error.error.message,
      };
    } else {
      return state.error;
    }
  },
};

const mutations = {
  FETCH_VIDEOS: (state, payload) => {
    state.videos = payload;
    state.error = null;
  },
  FETCH_VIDEO: (state, payload) => {
    state.video = payload;
    state.error = null;
  },
  CATCH_ERROR: (state, payload) => {
    state.error = payload;
  },
};

const actions = {
  /** Fetch a list of videos by filter */
  fetchVideos: async (context, filter, pageToken) => {
    try {
      const response = await axios.get("/videos", {
        params: {
          ...axios.defaults.params,
          ...filter,
          part: "snippet,statistics",
          maxResults: 15,
          pageToken,
        },
      });
      context.commit(FETCH_VIDEOS, response.data);
    } catch (e) {
      context.commit(CATCH_ERROR, e.response.data);
    }
  },

  /** Fetch a video by id */
  fetchVideo: async (context, videoId) => {
    try {
      const response = await axios.get("/videos", {
        params: {
          ...axios.defaults.params,
          part: "snippet,statistics",
          id: videoId,
        },
      });
      // console.log(response);
      context.commit(FETCH_VIDEO, response.data);
    } catch (e) {
      // console.log("error-==================", e);
      context.commit(CATCH_ERROR, e.response.data);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
