import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";
import { routes } from "@/router";
import ChannelIntro from "@/components/pages/ChannelIntro";
import Loader from "@/components/common/Loader";
import ErrorMessage from "@/components/common/ErrorMessage";
import { channelIntroResponse, channelId } from "../../store/fixtures/channel";
import date from "@/filters/date";
import decimal from "@/filters/decimal";

describe("Test ChannelIntro page", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  localVue.use(VueRouter);
  localVue.filter("date", date);
  localVue.filter("decimal", decimal);

  const router = new VueRouter({
    mode: "history",
    routes,
  });
  const actions = {
    fetchChannelIntro: jest.fn(() => {}),
  };
  const store = new Vuex.Store({
    state: {
      channel: {
        channelIntro: null,
        channelError: null,
      },
    },
    getters: {
      channelErrorMessage: jest.fn(() => ""),
    },
    actions,
  });
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(ChannelIntro, {
      store,
      localVue,
      router,
    });
  });
  afterEach(() => {
    wrapper.destroy();
  });

  it("should render Loader when no error or channel is returned", () => {
    expect(wrapper.findComponent(Loader).exists()).toBe(true);
    expect(wrapper.findComponent(ErrorMessage).exists()).toBe(false);
    expect(wrapper.find("div#app-channel-intro").exists()).toBe(false);
  });

  it("should get correct channelId and trigger action when component is initially rendered", async () => {
    router.push({
      name: "channelIntro",
      params: {
        id: channelId,
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$route.params.id).toBe(channelId);
    expect(actions.fetchChannelIntro).toHaveBeenCalled();
  });

  it("should render ErrorMessage component if error occurs", async () => {
    const errorMessage = "mock error message";
    wrapper.setData({
      error: errorMessage,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(Loader).exists()).toBe(false);
    expect(wrapper.findComponent(ErrorMessage).exists()).toBe(true);
    expect(wrapper.find("div#app-channel-intro").exists()).toBe(false);
    expect(wrapper.text()).toContain(errorMessage);
  });

  describe("Test Channel intro content if data is succssfully fetched", () => {
    beforeEach(() => {
      wrapper.setData({
        channelIntro: channelIntroResponse.items[0],
        error: "",
      });
    });

    it("should render div#app-channel-intro", () => {
      expect(wrapper.findComponent(Loader).exists()).toBe(false);
      expect(wrapper.findComponent(ErrorMessage).exists()).toBe(false);
      expect(wrapper.find("div#app-channel-intro").exists()).toBe(true);
    });

    it("channel intro content should match snapshot", () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
