import playlistStore from "@/store/modules/playlist";
import axios from "@/settings";
import {
  FETCH_PLAY_LIST_DETAIL,
  FETCH_PLAY_LIST,
  FETCH_MY_PLAY_LIST,
  CATCH_PLAYLIST_ERROR,
} from "@/store/types";
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

  it("playlistErrorMessage getter should parse standard error response returned from API", () => {
    const state = { playlistError: playlistErrorResponse };
    const result = getters.playlistErrorMessage(state);
    expect(result).toBe(state.playlistError.response.data.error.message);
  });

  it("playlistErrorMessage getter should parse standard JS error object", () => {
    const errorMsg = "mock error message";
    const state = { playlistError: { message: errorMsg } };
    const result = getters.playlistErrorMessage(state);
    expect(result).toBe(errorMsg);
  });

  it("playlistErrorMessage getter should parse any other error", () => {
    const state = { playlistError: "error" };
    const result = getters.playlistErrorMessage(state);
    expect(result).toBe("Failed to fetch playlist videos");
  });

  it("playlistErrorMessage getter returns empty string if no error", () => {
    const state = { playlistError: null };
    const result = getters.playlistErrorMessage(state);
    expect(result).toBe("");
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
      CATCH_PLAYLIST_ERROR,
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
      CATCH_PLAYLIST_ERROR,
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
      CATCH_PLAYLIST_ERROR,
      playlistErrorResponse
    );
  });

  it("mutations for fetchMyPlaylist can change state", () => {
    const state = {
      myPlaylist: null,
      playlistError: "any error",
    };
    mutations.FETCH_MY_PLAY_LIST(state, myPlaylistResponse);
    expect(state.myPlaylist).toEqual(myPlaylistResponse);
    expect(state.playlistError).toBe(null);
  });
  it("mutations for fetchPlaylist can change state", () => {
    const state = {
      playlist: null,
      playlistError: "any error",
    };
    mutations.FETCH_PLAY_LIST(state, playlistResponse);
    expect(state.playlist).toEqual(playlistResponse);
    expect(state.playlistError).toBe(null);
  });
  it("mutations for fetchPlaylistDetail can change state", () => {
    const state = {
      playlistDetail: null,
      playlistError: "any error",
    };
    mutations.FETCH_PLAY_LIST_DETAIL(state, playlistDetailResponse);
    expect(state.playlistDetail).toEqual(playlistDetailResponse);
    expect(state.playlistError).toBe(null);
  });
  it("mutations for catchError action can change state", () => {
    const state = {
      playlistError: null,
    };
    mutations.CATCH_PLAYLIST_ERROR(state, playlistErrorResponse);
    expect(state.playlistError).toEqual(playlistErrorResponse);
  });
});
