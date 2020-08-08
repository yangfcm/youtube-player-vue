import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Home from "@/components/pages/Home";
import Loader from "@/components/common/Loader";
import ErrorMessage from "@/components/common/ErrorMessage";
import PageTitle from "@/components/common/PageTitle";
import VideoGrid from "@/components/modules/VideoGrid";
import MoreButton from "@/components/modules/MoreButton";
import { popularVideosResponse } from "../../store/fixtures/video";

const localVue = createLocalVue();
localVue.use(Vuex);
const actions = {
  fetchVideos: jest.fn(),
};
describe("Test Home page", () => {
  describe("Test Home page when page is initially rendered", () => {
    const defaultStore = {
      state: {
        video: {
          videos: null,
          videoError: null,
        },
      },
      getters: {
        videoErrorMessage: jest.fn(() => ""),
      },
      actions,
    };
    let wrapper;
    beforeEach(() => {
      const store = new Vuex.Store(defaultStore);
      wrapper = shallowMount(Home, {
        store,
        localVue,
      });
    });
    afterEach(() => {
      wrapper.destroy();
    });

    it("should render Loader and call fetchVideos action when component is initially loaded", () => {
      expect(wrapper.findComponent(Loader).exists()).toBe(true);
      expect(wrapper.findComponent(ErrorMessage).exists()).toBe(false);
      expect(wrapper.find("div#app-home").exists()).toBe(false);
      expect(actions.fetchVideos).toHaveBeenCalled();
    });
  });

  describe("Test Home page when error occurs", () => {
    const errorMessage = "mock error message";
    const store = new Vuex.Store({
      state: {
        video: {
          videos: null,
          videoError: { message: errorMessage },
        },
      },
      getters: {
        videoErrorMessage: jest.fn(() => errorMessage),
      },
      actions,
    });
    let wrapper;
    beforeEach(() => {
      wrapper = shallowMount(Home, {
        // Must put shallowMount in beforeEach()
        // Cannot put shallowMount in it statement, which will cause test failure. --- Don't know why!
        store,
        localVue,
      });
    });
    afterEach(() => {
      wrapper.destroy();
    });
    it("should render ErrorMessage component when error occurs", () => {
      expect(wrapper.findComponent(Loader).exists()).toBe(false);
      expect(wrapper.findComponent(ErrorMessage).exists()).toBe(true);
      expect(wrapper.find("div#app-home").exists()).toBe(false);
      expect(wrapper.text()).toContain(errorMessage);
    });
  });

  describe("Test Home page when data is successfully fetched", () => {
    const store = new Vuex.Store({
      state: {
        video: {
          videos: popularVideosResponse,
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
      wrapper = shallowMount(Home, {
        store,
        localVue,
      });
    });
    afterEach(() => {
      wrapper.destroy();
    });
    it("should render content in Home page", () => {
      expect(wrapper.findComponent(Loader).exists()).toBe(false);
      expect(wrapper.findComponent(ErrorMessage).exists()).toBe(false);
      expect(wrapper.find("div#app-home").exists()).toBe(true);
    });

    it("should render PageTitle component with correct text", () => {
      const pageTitleComp = wrapper.findComponent(PageTitle);
      expect(pageTitleComp.exists()).toBe(true);
      expect(pageTitleComp.text()).toContain("Recommended Videos");
    });
    it("should render VideoGrid component and pass videos as props to it", () => {
      const videoGridComp = wrapper.findComponent(VideoGrid);
      expect(videoGridComp.exists()).toBe(true);
      expect(videoGridComp.props("videos")).toEqual(
        popularVideosResponse.items
      );
    });
    it("should render MoreButton component and pass correct props to it", () => {
      const moreButtonComp = wrapper.findComponent(MoreButton);
      expect(moreButtonComp.exists()).toBe(true);
      expect(moreButtonComp.text()).toContain("More videos");
      expect(moreButtonComp.props("nextPageToken")).toBe(
        popularVideosResponse.nextPageToken
      );
      expect(moreButtonComp.props("isLoadingMore")).toBe(false);
    });
    it("should call handleMore when more button is clicked", () => {
      const moreButtonComp = wrapper.findComponent(MoreButton);
      moreButtonComp.trigger("click");
      expect(actions.fetchVideos).toHaveBeenCalled();
    });
  });
});
