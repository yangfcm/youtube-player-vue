import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Video from "@/components/pages/Video";
import VueRouter from "vue-router";
import { routes } from "@/router";
import Loader from "@/components/common/Loader";
import ErrorMessage from "@/components/common/ErrorMessage";
import VideoPlayer from "@/components/modules/VideoPlayer";
import VideoInfo from "@/components/modules/VideoInfo";
import VideoSidebar from "@/components/modules/VideoSidebar";
import Comments from "@/components/modules/Comments";
import { videoResponse, videoEmptyResponse } from "../../store/fixtures/video";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
const router = new VueRouter({
  routes,
});
const actions = {
  fetchVideo: jest.fn(),
};

describe("Test Video page", () => {
  describe("Test Video page when page is initially rendered", () => {
    const store = new Vuex.Store({
      state: {
        video: {
          video: null,
          videoError: null,
        },
      },
      getters: {
        videoErrorMessage: jest.fn(() => ""),
      },
      actions,
    });
    let wrapper;
    beforeEach(() => {
      wrapper = shallowMount(Video, {
        store,
        localVue,
        router,
      });
    });
    afterEach(() => {
      wrapper.destroy();
    });
    it("should render Loader and call fetchVideo action", () => {
      expect(wrapper.findComponent(Loader).exists()).toBe(true);
      expect(wrapper.findComponent(ErrorMessage).exists()).toBe(false);
      expect(wrapper.find("div#app-video").exists()).toBe(false);
      expect(actions.fetchVideo).toHaveBeenCalled();
    });
  });
  describe("Test Video page when error occurs", () => {
    const errorMessage = "mock error message";
    const store = new Vuex.Store({
      state: {
        video: {
          video: null,
          videoError: errorMessage,
        },
      },
      getters: {
        videoErrorMessage: jest.fn(() => errorMessage),
      },
      actions,
    });
    let wrapper;
    beforeEach(() => {
      wrapper = shallowMount(Video, {
        store,
        localVue,
        router,
      });
    });
    afterEach(() => {
      wrapper.destroy();
    });
    it("should render ErrorMessage component ", () => {
      expect(wrapper.findComponent(Loader).exists()).toBe(false);
      expect(wrapper.findComponent(ErrorMessage).exists()).toBe(true);
      expect(wrapper.find("div#app-video").exists()).toBe(false);
      expect(wrapper.text()).toContain(errorMessage);
    });
  });
  describe("Test Video page when no video is found", () => {
    const store = new Vuex.Store({
      state: {
        video: {
          video: videoEmptyResponse,
          videoError: null,
        },
      },
      getters: {
        videoErrorMessage: jest.fn(() => ""),
      },
      actions,
    });
    let wrapper;
    const spy = jest.spyOn(router, "push");
    beforeEach(() => {
      wrapper = shallowMount(Video, {
        store,
        localVue,
        router,
      });
    });
    afterEach(() => {
      wrapper.destroy();
    });
    it("should redirect to not-found page", () => {
      expect(spy).toHaveBeenCalledWith("/not-found");
    });
  });
  describe("Test Video page when data is successfully rendered", () => {
    const videoId = videoResponse.items[0].id;
    const playlistId = "mock-playlist-id";
    const store = new Vuex.Store({
      state: {
        video: {
          video: videoResponse,
          videoError: null,
        },
      },
      getters: {
        videoErrorMessage: jest.fn(() => ""),
      },
      actions,
    });
    let wrapper;
    beforeEach(() => {
      router.push(`/video/${videoId}?playlistId=${playlistId}`).catch(() => {});
      wrapper = shallowMount(Video, {
        store,
        localVue,
        router,
      });
    });
    afterEach(() => {
      wrapper.destroy();
    });
    it("should render content in Video page ", () => {
      expect(wrapper.findComponent(Loader).exists()).toBe(false);
      expect(wrapper.findComponent(ErrorMessage).exists()).toBe(false);
      expect(wrapper.find("div#app-video").exists()).toBe(true);
    });

    it("should render VideoPlayer component and pass videoId props to it", () => {
      const videoPlayerComp = wrapper.findComponent(VideoPlayer);
      expect(videoPlayerComp.exists()).toBe(true);
      expect(videoPlayerComp.props("videoId")).toBe(videoId);
    });
    it("should render VideoInfo component and pass videoDetail props to it ", () => {
      const videoInfoComp = wrapper.findComponent(VideoInfo);
      expect(videoInfoComp.exists()).toBe(true);
      expect(videoInfoComp.props("videoDetail")).toEqual(
        videoResponse.items[0]
      );
    });
    it("should render Comments component and pass videoId + channelId props to it", () => {
      const commentsComp = wrapper.findComponent(Comments);
      expect(commentsComp.exists()).toBe(true);
      expect(commentsComp.props("videoId")).toBe(videoId);
      expect(commentsComp.props("channelId")).toBe(
        videoResponse.items[0].snippet.channelId
      );
    });
    it("should render VideoSidebar component and pass videoId + playlistId to it", () => {
      const videoSidebarComp = wrapper.findComponent(VideoSidebar);
      expect(videoSidebarComp.exists()).toBe(true);
      expect(videoSidebarComp.props("videoId")).toBe(videoId);
      expect(videoSidebarComp.props("playlistId")).toBe(playlistId);
    });
  });
});
