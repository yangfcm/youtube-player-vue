import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";
import { routes } from "@/router";
import Channel from "@/components/pages/Channel";
import ChannelBanner from "@/components/layout/ChannelBanner";
import ChannelMenu from "@/components/layout/ChannelMenu";
import ErrorMessage from "@/components/common/ErrorMessage";
import ChannelVideos from "@/components/pages/ChannelVideos";
import ChannelPlaylist from "@/components/pages/ChannelPlaylist";
import ChannelIntro from "@/components/pages/ChannelIntro";
import Loader from "@/components/common/Loader";
import { channelIntroResponse, channelId } from "../../store/fixtures/channel";

describe("Test Channel page", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  localVue.use(VueRouter);
  const router = new VueRouter({
    routes,
    mode: "history",
  });
  const actions = {
    fetchChannelIntro: jest.fn(),
    fetchChannelSubscription: jest.fn(),
    fetchVideos: jest.fn(),
    searchVideos: jest.fn(),
  };
  const store = new Vuex.Store({
    state: {
      channel: {
        channelIntro: channelIntroResponse,
        channelError: null,
      },
      video: {
        videoError: null,
      },
      search: {
        searchError: null,
      },
    },
    getters: {
      channelErrorMessage: jest.fn(() => ""),
      signedIn: jest.fn(() => false),
    },
    actions,
    data() {
      return {
        channelIntro: null,
        error: "",
      };
    },
  });
  let wrapper;
  beforeEach(() => {
    wrapper = mount(Channel, {
      store,
      localVue,
      router,
    });
  });
  afterEach(() => {
    wrapper.destroy();
  });

  it("should render ErrorMessage if error occurs", async () => {
    const errorMessage = "mock error message";
    wrapper.setData({
      error: errorMessage,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(ErrorMessage).exists()).toBe(true);
  });

  it("should render ChannelBanner and pass prop props to it", () => {
    expect(wrapper.findComponent(ChannelBanner).exists()).toBe(true);
    expect(wrapper.findComponent(ChannelBanner).props("channelIntro")).toEqual(
      channelIntroResponse.items[0]
    );
  });

  it("should render ChannelMenu component", () => {
    expect(wrapper.findComponent(ChannelMenu).exists()).toBe(true);
  });

  it("should render ChannelVideos component for route /channel/channelId/videos", async () => {
    router.push(`/channel/${channelId}/videos`);
    await wrapper.vm.$nextTick();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.findComponent(ChannelVideos).exists()).toBe(true);
  });
});
