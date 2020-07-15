import videoStore from "../../modules/video";
import axios from "../../../settings";
import { FETCH_VIDEOS, CATCH_ERROR, FETCH_VIDEO } from "../../types";
import {
  popularVideosResponse,
  videoResponse,
  videoErrorResponse,
} from "../fixtures/video";

describe("Test store for video module", () => {
  const { getters, mutations, actions } = videoStore;

  it("videos getter should return videos state", () => {
    const state = { videos: popularVideosResponse };
    const result = getters.videos(state);
    expect(result).toEqual(state.videos);
  });

  it("video getter should return video state", () => {
    const state = { video: videoResponse };
    const result = getters.video(state);
    expect(result).toEqual(state.video);
  });

  it("error getter should parse standard error response returned from API", () => {
    const state = { videoError: videoErrorResponse };
    const result = getters.videoError(state);
    expect(result).toEqual({
      code: videoErrorResponse.response.data.error.code,
      message: videoErrorResponse.response.data.error.message,
    });
  });

  it("error getter should parse standard JS error object", () => {
    const errorMsg = "mock error message";
    const state = { videoError: { message: errorMsg } };
    const result = getters.videoError(state);
    expect(result).toEqual({ message: errorMsg });
  });

  it("error getter should parse any other error", () => {
    const state = { videoError: "error" };
    const result = getters.videoError(state);
    expect(result).toEqual({
      message: "Failed to fetch video",
    });
  });

  it("error getter returns null if no error", () => {
    const state = { videoError: null };
    const result = getters.videoError(state);
    expect(result).toBeFalsy();
  });

  it("fetchVideos action can fetch popular videos and do commit", async () => {
    const filter = { chart: "mostPopular" };
    const context = {
      commit: jest.fn(),
    };
    axios.get.mockResolvedValue({ data: popularVideosResponse });
    await actions.fetchVideos(context, filter, null);
    expect(axios.get).toHaveBeenCalledWith("/videos", {
      params: {
        ...axios.defaults.params,
        ...filter,
        part: "snippet,statistics",
        maxResults: 15,
        pageToken: null,
      },
    });
    expect(context.commit).toHaveBeenCalledWith(
      FETCH_VIDEOS,
      popularVideosResponse
    );
    // console.log(axios);
  });

  it("fetchVideos can handle error", async () => {
    axios.get.mockRejectedValue(videoErrorResponse);
    const context = {
      commit: jest.fn(),
    };
    await actions.fetchVideos(context);
    expect(context.commit).toHaveBeenCalledWith(
      CATCH_ERROR,
      videoErrorResponse
    );
  });

  it("mutations for fetchVideos action can work", () => {
    const state = {
      videos: null,
      error: "some error",
    };
    mutations.FETCH_VIDEOS(state, popularVideosResponse);
    expect(state.videos).toEqual(popularVideosResponse);
    expect(state.videoError).toBeFalsy();
  });

  it("mutations for catchError action can work", () => {
    const state = {
      videos: null,
      videoError: null,
    };
    mutations.CATCH_ERROR(state, videoErrorResponse);
    expect(state.videoError).toEqual(videoErrorResponse);
  });

  it("fetchVideo action can fetch video by id and do commit", async () => {
    const videoId = videoResponse.items[0].id;
    const context = {
      commit: jest.fn(),
    };
    axios.get.mockResolvedValue({ data: videoResponse });
    await actions.fetchVideo(context, videoId);
    expect(axios.get).toHaveBeenCalledWith("/videos", {
      params: {
        ...axios.defaults.params,
        part: "snippet,statistics",
        id: videoId,
      },
    });
    expect(context.commit).toHaveBeenCalledWith(FETCH_VIDEO, videoResponse);
  });

  it("fetchVideo action can handle error", async () => {
    axios.get.mockRejectedValue(videoErrorResponse);
    const context = {
      commit: jest.fn(),
    };
    await actions.fetchVideo(context, "123");
    expect(context.commit).toHaveBeenCalledWith(
      CATCH_ERROR,
      videoErrorResponse
    );
  });

  it("mutations for fetchVideo action can work", () => {
    const state = {
      video: null,
      videoError: "some error",
    };
    mutations.FETCH_VIDEO(state, videoResponse);
    expect(state.video).toEqual(videoResponse);
    expect(state.videoError).toBeFalsy();
  });
});
