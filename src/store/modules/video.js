import axios from "../../settings";
import { FETCH_VIDEOS, CATCH_ERROR } from "../types";

const state = {
  videos: null,
  video: null,
  error: null,
};

const getters = {
  videos: (state) => state.videos,
  video: (state) => state.video,
  error: (state) => {
    if (state.error && state.error.error) {
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
    // if (state.videos.items && state.videos.items.length > 0) {
    //   state.videos = {
    //     ...state.videos,
    //     items: state.videos.items.concat(payload.items),
    //     nextPageToken: payload.nextPageToken,
    //   };
    // }
    state.videos = payload;
    state.error = null;
  },
  CATCH_ERROR: (state, payload) => {
    state.error = payload;
  },
};

const actions = {
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
      console.log(e);
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
