import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VideoSidebar from "@/components/modules/VideoSidebar";
import Loader from "@/components/common/Loader";
import ErrorMessage from "@/components/common/ErrorMessage";
import VideoList from "@/components/modules/VideoList";
import { searchResultResponse } from "../../store/fixtures/search";
import { playlistDetailResponse } from "../../store/fixtures/playlist";

const localVue = createLocalVue();
localVue.use(Vuex);
const actions = {
  searchVideos: jest.fn(),
  fetchPlaylistDetail: jest.fn(),
};

describe("Test VideoSidebar component", () => {
  describe("Test VideoSidebar component when component is initially rendered", () => {
    const store = new Vuex.Store({
      state: {
        search: {
          searchResults: null,
          searchError: null,
        },
        playlist: {
          playlistDetail: null,
          playlistError: null,
        },
      },
      getters: {
        searchErrorMessage: jest.fn(() => ""),
        playlistErrorMessage: jest.fn(() => ""),
      },
      actions,
    });
    let wrapper;
    beforeEach(() => {
      wrapper = shallowMount(VideoSidebar, {
        store,
        localVue,
      });
    });
    afterEach(() => {
      wrapper.destroy();
    });
    it("should render Loader", () => {
      expect(wrapper.findComponent(Loader).exists()).toBe(true);
      expect(wrapper.findComponent(ErrorMessage).exists()).toBe(false);
      expect(wrapper.findComponent(VideoList).exists()).toBe(false);
    });
  });

  describe("Test VideoSidebar component when error occurs", () => {
    const errorMessage = "mock error message";
    const store = new Vuex.Store({
      state: {
        search: {
          searchResults: null,
          searchError: { message: errorMessage },
        },
        playlist: {
          playlistDetail: null,
          playlistError: null,
        },
      },
      getters: {
        searchErrorMessage: jest.fn(() => errorMessage),
        playlistErrorMessage: jest.fn(() => ""),
      },
      actions,
    });
    let wrapper;
    beforeEach(() => {
      wrapper = shallowMount(VideoSidebar, {
        store,
        localVue,
      });
    });
    afterEach(() => {
      wrapper.destroy();
    });
    it("should render Loader", () => {
      expect(wrapper.findComponent(Loader).exists()).toBe(false);
      expect(wrapper.findComponent(ErrorMessage).exists()).toBe(true);
      expect(wrapper.findComponent(VideoList).exists()).toBe(false);
      expect(wrapper.text()).toContain(errorMessage);
    });
  });

  describe("Test VideoSidebar component when related videos in sidebar are successfully fetched", () => {
    const store = new Vuex.Store({
      state: {
        search: {
          searchResults: searchResultResponse,
          searchError: null,
        },
        playlist: {
          playlistDetail: playlistDetailResponse,
          playlistError: null,
        },
      },
      getters: {
        searchErrorMessage: jest.fn(() => ""),
        playlistErrorMessage: jest.fn(() => ""),
      },
      actions,
    });
    let wrapper, wrapperWithPlaylistId;
    beforeEach(() => {
      wrapper = shallowMount(VideoSidebar, {
        store,
        localVue,
      });
    });
    afterEach(() => {
      if (wrapper) {
        wrapper.destroy();
      }
    });
    it("should call searchVideos not fetchPlaylistDetail action if playlistId is not provided", () => {
      expect(actions.searchVideos).toHaveBeenCalled();
    });
    it("should render VideoGrid and pass reltedVideos to it if playlistId is not provided", () => {
      expect(wrapper.findComponent(Loader).exists()).toBe(false);
      expect(wrapper.findComponent(ErrorMessage).exists()).toBe(false);
      expect(wrapper.findComponent(VideoList).exists()).toBe(true);
      expect(wrapper.findComponent(VideoList).props("videos")).toEqual(
        searchResultResponse.items
      );
    });
  });

  describe("Test VideoSidebar component when playlist videos in sidebar are successfully fetched(playlistId provided)", () => {
    const store = new Vuex.Store({
      state: {
        search: {
          searchResults: searchResultResponse,
          searchError: null,
        },
        playlist: {
          playlistDetail: playlistDetailResponse,
          playlistError: null,
        },
      },
      getters: {
        searchErrorMessage: jest.fn(() => ""),
        playlistErrorMessage: jest.fn(() => ""),
      },
      actions,
    });
    let wrapper;
    beforeEach(() => {
      wrapper = shallowMount(VideoSidebar, {
        store,
        localVue,
        propsData: {
          playlistId: "mock-playlist-id",
        },
      });
    });
    afterEach(() => {
      if (wrapper) {
        wrapper.destroy();
      }
    });

    it("should call fetchPlaylistDetail not searchVideos action if playlistId is provided", () => {
      expect(actions.fetchPlaylistDetail).toHaveBeenCalled();
    });

    it("should render VideoGrid and pass playlistDetailRespons to it if playlistId is provided", () => {
      expect(wrapper.findComponent(Loader).exists()).toBe(false);
      expect(wrapper.findComponent(ErrorMessage).exists()).toBe(false);
      expect(wrapper.findComponent(VideoList).exists()).toBe(true);
      expect(wrapper.findComponent(VideoList).props("videos")).toEqual(
        playlistDetailResponse.items
      );
    });
  });
});
