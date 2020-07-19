import axios from "../../settings";
import {
  FETCH_PLAY_LIST,
  FETCH_PLAY_LIST_DETAIL,
  CATCH_PLAYLIST_ERROR,
  FETCH_MY_PLAY_LIST,
} from "../types";
import parseError from "../helpers/parseError";

const state = {
  playlist: null, // playlist of a particular channel
  myPlaylist: null, // playlist owned by authed user
  playlistDetail: null,
  playlistError: null,
};

const getters = {
  playlistErrorMessage: (state) =>
    parseError(state.playlistError, "Failed to fetch playlist videos"),
};

const mutations = {
  FETCH_PLAY_LIST: (state, payload) => {
    state.playlist = payload;
    state.playlistError = null;
  },
  FETCH_MY_PLAY_LIST: (state, payload) => {
    state.myPlaylist = payload;
    state.playlistError = null;
  },
  FETCH_PLAY_LIST_DETAIL: (state, payload) => {
    state.playlistDetail = payload;
    state.playlistError = null;
  },
  CATCH_PLAYLIST_ERROR: (state, payload) => {
    state.playlistError = payload;
  },
};

const actions = {
  /** Fetch the playlist of authed user */
  fetchMyPlaylist: async (context, pageToken = null) => {
    const accessToken = localStorage.getItem("access_token");
    try {
      const response = await axios.get("/playlists", {
        headers: {
          Authorization: accessToken,
        },
        params: {
          part: "snippet,contentDetails",
          maxResults: 12,
          pageToken,
          mine: true,
        },
      });
      context.commit(FETCH_MY_PLAY_LIST, response.data);
    } catch (err) {
      context.commit(CATCH_PLAYLIST_ERROR, err);
    }
  },

  /** Fetch the playlist that belongs to a channel */
  fetchPlaylist: async (context, channelId, pageToken = null) => {
    try {
      const response = await axios.get("/playlists", {
        params: {
          ...axios.defaults.params,
          part: "snippet,contentDetails",
          maxResults: 12,
          channelId,
          pageToken,
        },
      });
      context.commit(FETCH_PLAY_LIST, response.data);
    } catch (err) {
      context.commit(CATCH_PLAYLIST_ERROR, err);
    }
  },

  /** Fetch the videos in a playlist */
  fetchPlaylistDetail: async (context, playlistId, pageToken = null) => {
    try {
      const response = await axios.get("/playlistItems", {
        params: {
          ...axios.defaults.params,
          part: "snippet,contentDetails",
          maxResults: 10,
          playlistId,
          pageToken,
        },
      });
      context.commit(FETCH_PLAY_LIST_DETAIL, response.data);
    } catch (err) {
      context.commit(CATCH_PLAYLIST_ERROR, err);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
