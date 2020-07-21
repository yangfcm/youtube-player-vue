import channelStore from "../../modules/channel";
import axios from "../../../settings";
import {
  FETCH_MY_CHANNELS,
  FETCH_CHANNEL_SUBSCRIPTION,
  FETCH_CHANNEL_INTRO,
  SUBSCRIBE_CHANNEL,
  UNSUBSCRIBE_CHANNEL,
  CATCH_CHANNEL_ERROR,
} from "../../types";
import {
  channelId,
  myChannelsResponse,
  channelErrorResponse,
  channelIntroResponse,
  channelSubscriptionResponse,
  channelNotSubscriptionResponse,
  channelSubscribeSuccessResponse,
} from "../fixtures/channel";
import channel from "../../modules/channel";

describe("Test store for channel module", () => {
  let accessToken, context;
  const { getters, mutations, actions } = channelStore;

  beforeEach(() => {
    accessToken = "mock_access_token";
    Object.defineProperty(global, "localStorage", {
      value: {
        getItem: jest.fn(() => accessToken),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });
    context = {
      commit: jest.fn(),
    };
  });

  it("channelErrorMessage getter should parse standard error response", () => {
    const state = { channelError: channelErrorResponse };
    const result = getters.channelErrorMessage(state);
    expect(result).toBe(state.channelError.response.data.error.message);
  });
  it("channelErrorMessage get should parse standard JS error object", () => {
    const errorMsg = "mock channel error message";
    const state = { channelError: { message: errorMsg } };
    const result = getters.channelErrorMessage(state);
    expect(result).toBe(errorMsg);
  });
  it("channelErrorMessage getter should parse any other error", () => {
    const state = { channelError: "error" };
    const result = getters.channelErrorMessage(state);
    expect(result).toBe("Failed to fetch channel");
  });

  it("fetchMyChannels action can fetch subscribed channels by authed user", async () => {
    axios.get.mockResolvedValue({
      data: myChannelsResponse,
    });
    await actions.fetchMyChannels(context, null);
    expect(axios.get).toHaveBeenCalledWith("/subscriptions", {
      headers: {
        Authorization: accessToken,
      },
      params: {
        ...axios.defaults.params,
        part: "snippet",
        maxResults: 50,
        order: "alphabetical",
        mine: true,
        pageToken: null,
      },
    });
    expect(context.commit).toHaveBeenCalledWith(
      FETCH_MY_CHANNELS,
      myChannelsResponse
    );
  });

  it("fetchMychannels can handle error", async () => {
    axios.get.mockRejectedValue(channelErrorResponse);
    await actions.fetchMyChannels(context, null);
    expect(context.commit).toHaveBeenCalledWith(
      CATCH_CHANNEL_ERROR,
      channelErrorResponse
    );
  });

  it("fetchChannelIntro action can fetch channel intro", async () => {
    axios.get.mockResolvedValue({
      data: channelIntroResponse,
    });
    await actions.fetchChannelIntro(context, channelId);
    expect(axios.get).toHaveBeenCalledWith("/channels", {
      params: {
        ...axios.defaults.params,
        part: "snippet,statistics",
        id: channelId,
      },
    });
    expect(context.commit).toHaveBeenCalledWith(
      FETCH_CHANNEL_INTRO,
      channelIntroResponse
    );
  });

  it("fetchChannelIntro action can handle error", async () => {
    axios.get.mockRejectedValue(channelErrorResponse);
    await actions.fetchChannelIntro(context, channelId);
    expect(context.commit).toHaveBeenCalledWith(
      CATCH_CHANNEL_ERROR,
      channelErrorResponse
    );
  });

  it("fetchChannelSubscription action can fetch subscription id", async () => {
    axios.get.mockResolvedValue({ data: channelSubscriptionResponse });
    await actions.fetchChannelSubscription(context, channelId);
    expect(axios.get).toHaveBeenCalledWith("/subscriptions", {
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
    expect(context.commit).toHaveBeenCalledWith(
      FETCH_CHANNEL_SUBSCRIPTION,
      channelSubscriptionResponse.items[0].id
    );
  });

  it("fetchChannelSubscription action can return empty string if channel is not subscribed", async () => {
    axios.get.mockResolvedValue({ data: channelNotSubscriptionResponse });
    await actions.fetchChannelSubscription(context, channelId);
    expect(context.commit).toHaveBeenCalledWith(FETCH_CHANNEL_SUBSCRIPTION, "");
  });

  it("fetchChannelSubscription action can handle error", async () => {
    axios.get.mockRejectedValue(channelErrorResponse);
    await actions.fetchChannelSubscription(context, channelId);
    expect(context.commit).toHaveBeenCalledWith(
      CATCH_CHANNEL_ERROR,
      channelErrorResponse
    );
  });
  it("subscribeChannel action can subscribe channel", async () => {
    axios.post.mockResolvedValue({ data: channelSubscribeSuccessResponse });
    await actions.subscribeChannel(context, channelId);
    expect(axios.post).toHaveBeenCalledWith(
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
    expect(context.commit).toHaveBeenCalledWith(
      SUBSCRIBE_CHANNEL,
      channelSubscribeSuccessResponse.id
    );
  });
  it("subscribeChannel action can handle error", async () => {
    axios.post.mockRejectedValue(channelErrorResponse);
    await actions.subscribeChannel(context, channelId);
    expect(context.commit).toHaveBeenCalledWith(
      CATCH_CHANNEL_ERROR,
      channelErrorResponse
    );
  });

  it("unsubscribeChannel action can unsubscribe channel", async () => {
    axios.delete.mockImplementation(() =>
      Promise.resolve({
        status: 204,
        data: null,
      })
    );
    const subscriptionId = channelSubscribeSuccessResponse.id;
    context = {
      ...context,
      state: {
        subscriptionId,
      },
    };
    await actions.unsubscribeChannel(context);
    expect(axios.delete).toHaveBeenCalledWith("/subscriptions", {
      headers: {
        Authorization: accessToken,
      },
      params: {
        id: subscriptionId,
      },
    });
    expect(context.commit).toHaveBeenCalledWith(UNSUBSCRIBE_CHANNEL);
  });

  it("unsubscribeChannel action can handle error", async () => {
    const subscriptionId = channelSubscribeSuccessResponse.id;
    context = {
      ...context,
      state: {
        subscriptionId,
      },
    };
    axios.delete.mockRejectedValue(channelErrorResponse);
    await actions.unsubscribeChannel(context);
    expect(context.commit).toHaveBeenCalledWith(
      CATCH_CHANNEL_ERROR,
      channelErrorResponse
    );
  });

  it("mutations for fetchMyChannels action can change state", () => {
    const state = {
      myChannels: null,
      channelError: "any error",
    };
    mutations.FETCH_MY_CHANNELS(state, myChannelsResponse);
    expect(state.myChannels).toEqual(myChannelsResponse);
    expect(state.channelError).toBe(null);
  });
  it("mutations for fetchChannelIntro action can change state", () => {
    const state = {
      channelIntro: null,
      channelError: "any error",
    };
    mutations.FETCH_CHANNEL_INTRO(state, channelIntroResponse);
    expect(state.channelIntro).toEqual(channelIntroResponse);
    expect(state.channelError).toBe(null);
  });
  it("mutations for fetchChannelSubscription action can change state", () => {
    const state = {
      subscriptionId: null,
    };
    const subscriptionId = channelSubscribeSuccessResponse.id;
    mutations.FETCH_CHANNEL_SUBSCRIPTION(state, subscriptionId);
    expect(state.subscriptionId).toBe(subscriptionId);
  });
  it("mutations for subscribeChannel action can change state", () => {
    const state = {
      subscriptionId: null,
    };
    const subscriptionId = channelSubscribeSuccessResponse.id;
    mutations.SUBSCRIBE_CHANNEL(state, subscriptionId);
    expect(state.subscriptionId).toBe(subscriptionId);
  });
  it("mutations for unsubscribeChannel action can change state", () => {
    const state = {
      subscriptionId: channelSubscribeSuccessResponse.id,
    };
    mutations.UNSUBSCRIBE_CHANNEL(state);
    expect(state.subscriptionId).toBe("");
  });
  it("mutations for catchError action can change state", () => {
    const state = {
      channelError: null,
    };
    mutations.CATCH_CHANNEL_ERROR(state, channelErrorResponse);
    expect(state.channelError).toEqual(channelErrorResponse);
  });
});
