import axios from "../../settings";
import { SEARCH, CATCH_ERROR } from "../types";
import parseError from "../helpers/parseError";

const state = {
  searchResults: null,
  searchError: null,
};

const getters = {
  searchResults: (state) => state.searchResults,
  searchError: (state) => {
    return parseError(state.searchError, "Failed to proceed searching");
  },
};

const mutations = {
  SEARCH: (state, payload) => {
    state.searchResults = payload;
    state.searchError = null;
  },
  CATCH_ERROR: (state, payload) => {
    state.searchError = payload;
  },
};

const actions = {
  search: async (context, keyword, pageToken) => {
    try {
      const response = await axios.get("/search", {
        params: {
          ...axios.defaults.params,
          q: keyword,
          part: "snippet",
          maxResults: 15,
          pageToken,
        },
      });
      context.commit(SEARCH, response.data);
    } catch (err) {
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
