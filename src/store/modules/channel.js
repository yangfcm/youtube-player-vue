import axios from "../../settings";
import {
  FETCH_MY_CHANNELS,
  FETCH_CHANNEL_SUBSCRIPTION,
  FETCH_CHANNEL_INTRO,
  SUBSCRIBE_CHANNEL,
  UNSUBSCRIBE_CHANNEL,
  CATCH_CHANNEL_ERROR,
} from "../types";
import parseError from "../helpers/parseError";

const state = {
  myChannels: null, // channels subscribed by authed user
  channelIntro: null,
  subscriptionId: null, // Give a channel id, record its subscription id(if subscribed), or empty string(not subscribed)
  channelError: null,
};

const getters = {
  channelErrorMessage: (state) =>
    parseError(state.channelError, "Failed to fetch channel"),
};

const mutations = {
  FETCH_MY_CHANNELS: (state, payload) => {
    state.myChannels = payload;
    state.channelError = null;
  },
  FETCH_CHANNEL_SUBSCRIPTION: (state, payload) => {
    state.subscriptionId = payload;
  },
  FETCH_CHANNEL_INTRO: (state, payload) => {
    state.channelIntro = payload;
    state.channelError = null;
  },
  SUBSCRIBE_CHANNEL: (state, payload) => {
    state.subscriptionId = payload; // If a channel is subscribed successfully, save its subscription id
  },
  UNSUBSCRIBE_CHANNEL: (state) => {
    state.subscriptionId = ""; // If a subscribed channel is unsubscribed, set its subscriptionId as empty string
  },
  CATCH_CHANNEL_ERROR: (state, payload) => {
    state.channelError = payload;
  },
};

const actions = {
  /** Get the channels subscribed by authed user */
  fetchMyChannels: async (context, pageToken) => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const response = await axios.get("/subscriptions", {
        headers: {
          Authorization: accessToken,
        },
        params: {
          ...axios.defaults.params,
          part: "snippet",
          maxResults: 50,
          order: "alphabetical",
          mine: true,
          pageToken,
        },
      });
      context.commit(FETCH_MY_CHANNELS, response.data);
    } catch (err) {
      context.commit(CATCH_CHANNEL_ERROR, err);
    }
  },

  /** Get the channel info by id */
  fetchChannelIntro: async (context, channelId) => {
    try {
      const response = await axios.get("/channels", {
        params: {
          ...axios.defaults.params,
          part: "snippet,statistics",
          id: channelId,
        },
      });
      context.commit(FETCH_CHANNEL_INTRO, response.data);
    } catch (err) {
      context.commit(CATCH_CHANNEL_ERROR, err);
    }
  },

  /** Check if the channel with channel id is subscribed by authed user */
  fetchChannelSubscription: async (context, channelId) => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const response = await axios.get("/subscriptions", {
        headers: {
          Authorization: accessToken,
        },
        params: {
          ...axios.defaults.params,
          part: "snippet",
          forChannelId: channelId,
          mine: true,
        },
      });
      const subscribedChannel = response.data.items[0];
      context.commit(
        FETCH_CHANNEL_SUBSCRIPTION,
        subscribedChannel ? subscribedChannel.id : ""
      );
    } catch (err) {
      context.commit(CATCH_CHANNEL_ERROR, err);
    }
  },

  /** Subscribe a channel */
  subscribeChannel: async (context, channelId) => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const response = await axios.post(
        "/subscriptions",
        {
          snippet: {
            resourceId: {
              kind: "youtube#channel",
              channelId,
            },
          },
        },
        {
          headers: {
            Authorization: accessToken,
          },
          params: {
            part: "snippet",
          },
        }
      );
      context.commit(SUBSCRIBE_CHANNEL, response.data.id);
    } catch (err) {
      context.commit(CATCH_CHANNEL_ERROR, err);
    }
  },

  /** Unsubscribe a channel */
  unsubscribeChannel: async (context, subscriptionId) => {
    try {
      const accessToken = localStorage.getItem("access_token");
      // const { subscriptionId } = context.state;
      await axios.delete("/subscriptions", {
        headers: {
          Authorization: accessToken,
        },
        params: {
          id: subscriptionId,
        },
      });
      context.commit(UNSUBSCRIBE_CHANNEL);
    } catch (err) {
      context.commit(CATCH_CHANNEL_ERROR, err);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
