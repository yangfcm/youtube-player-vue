import playlistStore from "../../modules/playlist";
import axios from "../../../settings";
import {
  FETCH_MY_PLAYLIST,
  FETCH_PLAY_LIST_DETAIL,
  FETCH_PLAY_LIST,
  FETCH_MY_PLAY_LIST,
  CATCH_ERROR,
} from "../../types";
import {
  myPlaylistResponse,
  playlistResponse,
  playlistDetailResponse,
  playlistErrorResponse,
  channelId,
  playlistId,
} from "../fixtures/playlist";

describe("Test store for playlist module", () => {
  let accessToken;
  const { getters, mutations, actions } = playlistStore;

  beforeEach(() => {
    accessToken = "mock_access_token";
    /** mock localStorage */
    Object.defineProperty(global, "localStorage", {
      value: {
        getItem: jest.fn(() => accessToken),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });
  });

  it("playlist getter should return playlist state", () => {
    const state = {
      myPlaylist: myPlaylistResponse,
      playlist: playlistResponse,
      playlistDetail: playlistDetailResponse,
    };
    const myPlaylistResult = getters.myPlaylist(state);
    const playlistResult = getters.playlist(state);
    const playlistDetailResult = getters.playlistDetail(state);
    expect(myPlaylistResult).toEqual(state.myPlaylist);
    expect(playlistResult).toEqual(state.playlist);
    expect(playlistDetailResult).toEqual(state.playlistDetail);
  });

  it("error getter should parse standard error response returned from API", () => {
    const state = { playlistError: playlistErrorResponse };
    const result = getters.playlistError(state);
    expect(result).toEqual({
      code: state.playlistError.response.data.error.code,
      message: state.playlistError.response.data.error.message,
    });
  });

  it("error getter should parse standard JS error object", () => {
    const errorMsg = "mock error message";
    const state = { playlistError: { message: errorMsg } };
    const result = getters.playlistError(state);
    expect(result).toEqual({ message: errorMsg });
  });

  it("error getter should parse any other error", () => {
    const state = { playlistError: "error" };
    const result = getters.playlistError(state);
    expect(result).toEqual({
      message: "Failed to fetch playlist videos",
    });
  });

  it("error getter returns null if no error", () => {
    const state = { playlistError: null };
    const result = getters.playlistError(state);
    expect(result).toBeFalsy();
  });

  it("fetchMyPlaylist action can fetch playlist of authed user and do commit", async () => {
    const context = {
      commit: jest.fn(),
    };
    localStorage.setItem("access_token", accessToken);
    axios.get.mockResolvedValue({
      data: myPlaylistResponse,
    });
    await actions.fetchMyPlaylist(context);
    expect(axios.get).toHaveBeenCalledWith("/playlists", {
      headers: {
        Authorization: accessToken,
      },
      params: {
        part: "snippet,contentDetails",
        maxResults: 12,
        pageToken: null,
        mine: true,
      },
    });
    expect(context.commit).toHaveBeenCalledWith(
      FETCH_MY_PLAY_LIST,
      myPlaylistResponse
    );
  });

  it("fetchMyPlaylist action can handle error", async () => {
    axios.get.mockRejectedValue(playlistErrorResponse);
    const context = {
      commit: jest.fn(),
    };
    await actions.fetchMyPlaylist(context);
    expect(context.commit).toHaveBeenCalledWith(
      CATCH_ERROR,
      playlistErrorResponse
    );
  });

  it("fetchPlaylist action can fetch playlist by channelId and do commit", async () => {
    const context = {
      commit: jest.fn(),
    };
    axios.get.mockResolvedValue({ data: playlistResponse });
    await actions.fetchPlaylist(context, channelId);
    expect(axios.get).toHaveBeenCalledWith("/playlists", {
      params: {
        ...axios.defaults.params,
        part: "snippet,contentDetails",
        maxResults: 12,
        pageToken: null,
        channelId,
      },
    });
    expect(context.commit).toHaveBeenCalledWith(
      FETCH_PLAY_LIST,
      playlistResponse
    );
  });

  it("fetchPlaylist action can handle error", async () => {
    axios.get.mockRejectedValue(playlistErrorResponse);
    const context = {
      commit: jest.fn(),
    };
    await actions.fetchPlaylist(context);
    expect(context.commit).toHaveBeenCalledWith(
      CATCH_ERROR,
      playlistErrorResponse
    );
  });

  it("fetchPlaylistDetail action can fetch videos in playlist and do commit", async () => {
    const context = {
      commit: jest.fn(),
    };
    axios.get.mockResolvedValue({ data: playlistDetailResponse });
    await actions.fetchPlaylistDetail(context, playlistId);
    expect(axios.get).toHaveBeenCalledWith("/playlistItems", {
      params: {
        ...axios.defaults.params,
        part: "snippet,contentDetails",
        maxResults: 10,
        pageToken: null,
        playlistId,
      },
    });
    expect(context.commit).toHaveBeenCalledWith(
      FETCH_PLAY_LIST_DETAIL,
      playlistDetailResponse
    );
  });

  it("fetchPlaylistDetail can handle error", async () => {
    axios.get.mockRejectedValue(playlistErrorResponse);
    const context = {
      commit: jest.fn(),
    };
    await actions.fetchPlaylistDetail(context);
    expect(context.commit).toHaveBeenCalledWith(
      CATCH_ERROR,
      playlistErrorResponse
    );
  });
});
