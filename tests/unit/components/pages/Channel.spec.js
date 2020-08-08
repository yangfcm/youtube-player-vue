import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";
import { routes } from "@/router";
import store from "@/store/store";
import Channel from "@/components/pages/Channel";
import ChannelBanner from "@/components/layout/ChannelBanner";
import ChannelMenu from "@/components/layout/ChannelMenu";
import ErrorMessage from "@/components/common/ErrorMessage";
import ChannelVideos from "@/components/pages/ChannelVideos";
import ChannelPlaylist from "@/components/pages/ChannelPlaylist";
import ChannelIntro from "@/components/pages/ChannelIntro";
// import NotFound from "@/components/pages/NotFound";
import {
  channelIntroResponse,
  channelId,
  // channelIntroEmptyResponse,
} from "../../store/fixtures/channel";

describe("Test Channel page", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  localVue.use(VueRouter);
  const router = new VueRouter({
    routes,
    mode: "history",
  });
  let wrapper;
  afterEach(() => {
    wrapper.destroy();
  });

  it("should render ErrorMessage if error occurs", async () => {
    const errorMessage = "mock error message";
    wrapper = mount(Channel, {
      store,
      localVue,
      router,
    });
    wrapper.setData({
      error: errorMessage,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(ErrorMessage).exists()).toBe(true);
  });

  it("should render and ChannelMenu ChannelBanner and pass prop props to it", async () => {
    wrapper = mount(Channel, {
      store,
      localVue,
      router,
    });
    await wrapper.setData({
      channelIntro: channelIntroResponse.items[0],
      error: "",
    });
    expect(wrapper.findComponent(ChannelMenu).exists()).toBe(true);
    expect(wrapper.findComponent(ChannelBanner).exists()).toBe(true);
    expect(wrapper.findComponent(ChannelBanner).props("channelIntro")).toEqual(
      channelIntroResponse.items[0]
    );
  });

  it("should render and ChannelMenu ChannelBanner and pass prop props to it", async () => {
    wrapper = mount(Channel, {
      store,
      localVue,
      router,
    });
    await wrapper.setData({
      channelIntro: channelIntroResponse.items[0],
      error: "",
    });
  });

  it("should render ChannelVideos component for route /channel/channelId/videos", async () => {
    await router.push(`/channel/${channelId}/videos`);
    wrapper = mount(Channel, {
      store,
      localVue,
      router,
    });
    expect(wrapper.findComponent(ChannelVideos).exists()).toBe(true);
  });

  it("should render ChannelPlaylist page for router /channel/channelId/playlist", async () => {
    await router.push(`/channel/${channelId}/playlist`);
    wrapper = mount(Channel, {
      store,
      localVue,
      router,
    });
    expect(wrapper.findComponent(ChannelPlaylist).exists()).toBe(true);
  });
  it("should render ChannelIntro page for router /channel/channelId/intro", async () => {
    await router.push(`/channel/${channelId}/intro`);
    wrapper = mount(Channel, {
      store,
      localVue,
      router,
    });
    expect(wrapper.findComponent(ChannelIntro).exists()).toBe(true);
  });
});
