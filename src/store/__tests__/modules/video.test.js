import videoStore from "../../modules/video";
import axios from "../../../settings";
import { FETCH_VIDEOS, CATCH_ERROR } from "../../types";
import { popularVideosResponse } from "../fixtures/video";
import { errorResponse } from "../fixtures/error";

describe("Test store for video module", () => {
  const { getters, mutations, actions } = videoStore;

  it("getter should return videos state", () => {
    const state = { videos: popularVideosResponse };
    const result = getters.videos(state);
    expect(result).toEqual(state.videos);
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
    axios.get.mockRejectedValue(errorResponse);
    console.log(errorResponse);
    const context = {
      commit: jest.fn(),
    };
    await actions.fetchVideos(context);
    expect(context.commit).toHaveBeenCalledWith(
      CATCH_ERROR,
      errorResponse.response.data
    );
  });

  it("mutations for fetchVideos action can work", () => {
    const state = {
      videos: null,
      error: "some error",
    };
    mutations.FETCH_VIDEOS(state, popularVideosResponse);
    expect(state.videos).toEqual(popularVideosResponse);
    expect(state.error).toBeFalsy();
  });

  it("mutations for catchError action can work", () => {
    const state = {
      videos: null,
      error: null,
    };
    mutations.CATCH_ERROR(state, errorResponse.response.data);
    expect(state.error).toEqual(errorResponse.response.data);
  });
});
