import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";
import { routes } from "@/router";
import ChannelVideos from "@/components/pages/ChannelVideos";
import Loader from "@/components/common/Loader";
import ErrorMessage from "@/components/common/ErrorMessage";
import PageTitle from "@/components/common/PageTitle";
import VideoGrid from "@/components/modules/VideoGrid";
import MoreButton from "@/components/modules/MoreButton";
import { channelVideosResponse } from "../../store/fixtures/search";
import { channelId } from "../../store/fixtures/channel";

describe("Test ChannelVideos page", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  localVue.use(VueRouter);
  const router = new VueRouter({
    routes,
  });
  const actions = {
    searchVideos: jest.fn(),
  };
  const store = new Vuex.Store({
    state: {
      search: {
        searchResult: null,
        searchError: null,
      },
    },
    getters: {
      searchErrorMessage: jest.fn(() => ""),
    },
    actions,
  });
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(ChannelVideos, {
      store,
      localVue,
      router,
    });
  });
  afterEach(() => {
    wrapper.destroy();
  });

  it("should render Loader when no error or data is returned", () => {
    expect(wrapper.findComponent(Loader).exists()).toBe(true);
    expect(wrapper.findComponent(ErrorMessage).exists()).toBe(false);
    expect(wrapper.find("div#app-channel-videos").exists()).toBe(false);
  });

  it("should get channelId and trigger action when component is initialized", async () => {
    router.push({
      name: "channelVideos",
      params: {
        id: channelId,
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$route.params.id).toBe(channelId);
    expect(actions.searchVideos).toHaveBeenCalled();
  });

  it("should render ErrorMessage component if error occurs", async () => {
    const errorMessage = "mock error message";
    wrapper.setData({
      error: errorMessage,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(Loader).exists()).toBe(false);
    expect(wrapper.findComponent(ErrorMessage).exists()).toBe(true);
    expect(wrapper.find("div#app-channel-videos").exists()).toBe(false);
  });

  describe("Test channel videos if data is successfully fetched", () => {
    beforeEach(() => {
      wrapper.setData({
        videos: channelVideosResponse,
        error: "",
      });
    });

    it("should render div#app-channel-videos", () => {
      expect(wrapper.findComponent(Loader).exists()).toBe(false);
      expect(wrapper.findComponent(ErrorMessage).exists()).toBe(false);
      expect(wrapper.find("div#app-channel-videos").exists()).toBe(true);
    });

    it("should render PageTitle component with correct title", () => {
      const pageTitleComp = wrapper.findComponent(PageTitle);
      expect(pageTitleComp.exists()).toBe(true);
      expect(pageTitleComp.text()).toContain("Videos in Channel");
    });

    it("should render VideoGrid component and pass proper props to it", () => {
      const videoGridComp = wrapper.findComponent(VideoGrid);
      expect(videoGridComp.exists()).toBe(true);
      expect(videoGridComp.props("videos")).toEqual(
        channelVideosResponse.items
      );
    });

    it("should render MoreButton component and pass prop props to it", () => {
      const moreButtonComp = wrapper.findComponent(MoreButton);
      expect(moreButtonComp.exists()).toBe(true);
      expect(moreButtonComp.text()).toContain("More videos");
      expect(moreButtonComp.props()).toEqual({
        nextPageToken: channelVideosResponse.nextPageToken,
        isLoadingMore: false,
      });
    });

    it("should call handleMore method when more button is clicked", () => {
      const moreButtonComp = wrapper.findComponent(MoreButton);
      moreButtonComp.trigger("click");
      expect(actions.searchVideos).toHaveBeenCalled();
    });
  });
});
