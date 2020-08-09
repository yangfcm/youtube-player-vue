import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";
import { routes } from "@/router";
import PlaylistDetail from "@/components/pages/PlaylistDetail";
import Loader from "@/components/common/Loader";
import ErrorMessage from "@/components/common/ErrorMessage";
import VideoList from "@/components/modules/VideoList";
import MoreButton from "@/components/modules/MoreButton";
import { playlistDetailResponse } from "../../store/fixtures/playlist";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
const router = new VueRouter({
  routes,
});
const actions = {
  fetchPlaylistDetail: jest.fn(),
};

describe("Test PlaylistDetail page", () => {
  describe("Test PlaylistDetail page when page is initially rendered", () => {
    const store = new Vuex.Store({
      state: {
        playlist: {
          playlistDetail: null,
          playlistError: null,
        },
      },
      getters: {
        playlistErrorMessage: jest.fn(() => ""),
      },
      actions,
    });
    let wrapper;
    beforeEach(() => {
      wrapper = shallowMount(PlaylistDetail, {
        store,
        localVue,
        router,
      });
    });
    afterEach(() => {
      wrapper.destroy();
    });
    it("should render Loader and call fetchPlaylistDetail action when component is initially loaded ", () => {
      expect(wrapper.findComponent(Loader).exists()).toBe(true);
      expect(wrapper.findComponent(ErrorMessage).exists()).toBe(false);
      expect(wrapper.find("div#app-playlist-detail").exists()).toBe(false);
      expect(actions.fetchPlaylistDetail).toHaveBeenCalled();
    });
  });

  describe("Test PlaylistDetail page when error occurs", () => {
    const errorMessage = "mock error message";
    const store = new Vuex.Store({
      state: {
        playlist: {
          playlistDetail: null,
          playlistError: { message: errorMessage },
        },
      },
      getters: {
        playlistErrorMessage: jest.fn(() => errorMessage),
      },
      actions,
    });
    let wrapper;
    beforeEach(async () => {
      wrapper = shallowMount(PlaylistDetail, {
        store,
        localVue,
        router,
      });
    });
    afterEach(() => {
      wrapper.destroy();
    });

    it("should render ErrorMessage component", () => {
      expect(wrapper.findComponent(Loader).exists()).toBe(false);
      expect(wrapper.findComponent(ErrorMessage).exists()).toBe(true);
      expect(wrapper.find("div#app-playlist-detail").exists()).toBe(false);
      expect(wrapper.text()).toContain(errorMessage);
    });
  });

  describe("Test PlaylistDetail page when data is successfully fetched", () => {
    const store = new Vuex.Store({
      state: {
        playlist: {
          playlistDetail: playlistDetailResponse,
          playlistError: null,
        },
      },
      getters: {
        playlistErrorMessage: jest.fn(() => ""),
      },
      actions,
    });
    let wrapper;
    beforeEach(async () => {
      wrapper = shallowMount(PlaylistDetail, {
        store,
        localVue,
        router,
      });
    });
    afterEach(() => {
      wrapper.destroy();
    });

    it("should render content in PlaylistDetail page", () => {
      expect(wrapper.findComponent(Loader).exists()).toBe(false);
      expect(wrapper.findComponent(ErrorMessage).exists()).toBe(false);
      expect(wrapper.find("div#app-playlist-detail").exists()).toBe(true);
    });

    it("should render VideoList component and pass videos props to it", () => {
      const VideoListComp = wrapper.findComponent(VideoList);
      expect(VideoListComp.exists()).toBe(true);
      expect(VideoListComp.props("videos")).toEqual(
        playlistDetailResponse.items
      );
    });
    it("should render MoreButton component and pass correct props to it", () => {
      const moreButtonComp = wrapper.findComponent(MoreButton);
      expect(moreButtonComp.exists()).toBe(true);
      expect(moreButtonComp.text()).toContain("More videos");
      expect(moreButtonComp.props("nextPageToken")).toBe(
        playlistDetailResponse.nextPageToken
      );
      expect(moreButtonComp.props("isLoadingMore")).toBe(false);
    });
    it("should call handleMore when more button is clicked", () => {
      const moreButtonComp = wrapper.findComponent(MoreButton);
      moreButtonComp.trigger("click");
      expect(actions.fetchPlaylistDetail).toHaveBeenCalled();
    });
  });
});
