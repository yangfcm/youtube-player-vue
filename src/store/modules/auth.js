import axios from "../../settings";
import { SIGN_IN, SIGN_OUT, CATCH_AUTH_ERROR } from "../types";

const state = {
  user: null,
};

const getters = {
  signedIn: (state) => {
    const { user } = state;
    if (user === null) {
      return null;
    }
    if (user) {
      if (Object.keys(user).length === 0) {
        return false;
      } else {
        return true;
      }
    }
  },
  user: (state) => state.user,
};

const mutations = {
  SIGN_IN: (state, payload) => {
    state.user = payload;
  },
  SIGN_OUT: (state) => {
    state.user = {};
  },
  CATCH_AUTH_ERROR: (state) => {
    state.user = {};
  },
};

const actions = {
  signIn: async (context, googleUser) => {
    try {
      const accessToken = `${googleUser.wc.token_type} ${googleUser.wc.access_token}`;
      localStorage.setItem("access_token", accessToken);
      const response = await axios.get(
        "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );
      context.commit(SIGN_IN, response.data);
    } catch (err) {
      context.commit(CATCH_AUTH_ERROR);
    }
  },
  signOut: (context) => {
    localStorage.removeItem("access_token");
    context.commit(SIGN_OUT);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
