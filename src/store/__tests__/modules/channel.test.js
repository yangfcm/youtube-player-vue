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

describe("Test store for channel module", () => {
  let accessToken;
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
  });

  it.todo("channelErrorMessage getter should parse standard error response");
  it.todo("channelErrorMessage get should parse standard JS error object");
  it.todo("channelErrorMessage getter should parse any other error");
  it.todo(
    "fetchMyChannels action can fetch subscribed channels by authed user"
  );
  it.todo("fetchMychannels can handle error");
  it.todo("fetchChannelIntro action can fetch channel intro");
  it.todo("fetchChannelIntro action can handle error");
  it.todo("fetchChannelSubscription action can fetch subscription id");
  it.todo("fetchChannelSubscription action can handle error");
  it.todo("subscribeChannel action can subscribe channel");
  it.todo("subscribeChannel action can handle error");
  it.todo("unsubscribeChannel action can unsubscribe channel");
  it.todo("unsubscribeChannel action can handle error");
  it.todo("mutations for fetchMyChannels action can change state");
  it.todo("mutations for fetchChannelIntro action can change state");
  it.todo("mutations for fetchChannelSubscription action can change state");
  it.todo("mutations for subscribeChannel action can change state");
  it.todo("mutations for unsubscribeChannel action can change state");
  it.todo("mutations for catchError action can change state");
});
