import axios from "../../settings";
import { SEARCH, CATCH_SEARCH_ERROR } from "../types";
import parseError from "../helpers/parseError";

const state = {
  searchResults: null,
  searchError: null,
};

const getters = {
  searchErrorMessage: (state) => {
    return parseError(state.searchError, "Failed to proceed searching");
  },
};

const mutations = {
  SEARCH: (state, payload) => {
    state.searchResults = payload;
    state.searchError = null;
  },
  CATCH_SEARCH_ERROR: (state, payload) => {
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
      context.commit(CATCH_SEARCH_ERROR, err);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
