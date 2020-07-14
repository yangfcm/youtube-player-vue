import videoStore from "../../modules/video";
import axios from "../../../settings";
import { FETCH_VIDEOS, CATCH_ERROR } from "../../types";

describe("Test store for video module", () => {
  const { getters, mutations, actions } = videoStore;
  it("getter should return videos state", () => {
    const state = { videos: ["video1", "video2", "video3"] };
    const result = getters.videos(state);
    expect(result).toEqual(state.videos);
  });

  it("fetchVideos action should work and do commit", async () => {
    const filter = { chart: "mostPopular" };
    const context = {
      commit: jest.fn(),
    };
    axios.get.mockResolvedValue({ data: "video data" });
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
    expect(context.commit).toHaveBeenCalledWith(FETCH_VIDEOS, "video data");
    // console.log(axios);
  });
});
