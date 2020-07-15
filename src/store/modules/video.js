import axios from "../../settings";
import { FETCH_VIDEOS, CATCH_ERROR, FETCH_VIDEO } from "../types";
import parseError from "../helpers/parseError";

const state = {
  videos: null,
  video: null,
  videoError: null,
};

const getters = {
  videos: (state) => state.videos,
  video: (state) => state.video,
  videoError: (state) => {
    return parseError(state.videoError, "Failed to fetch video");
  },
};

const mutations = {
  FETCH_VIDEOS: (state, payload) => {
    state.videos = payload;
    state.videoError = null;
  },
  FETCH_VIDEO: (state, payload) => {
    state.video = payload;
    state.videoError = null;
  },
  CATCH_ERROR: (state, payload) => {
    state.videoError = payload;
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
    } catch (err) {
      context.commit(CATCH_ERROR, err);
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
    } catch (err) {
      // console.log("error-==================", e);
      context.commit(CATCH_ERROR, err);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
