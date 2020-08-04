import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { userResponse as user } from "../../store/fixtures/auth";
import { channelId as channelIdFixture } from "../../store/fixtures/channel";
import SubscribeButton from "@/components/common/SubscribeButton.vue";

describe("Test Subscribe button when user is not logged in", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const actions = {
    fetchChannelSubscription: jest.fn(),
    subscribeChannel: jest.fn(),
    unsubscribeChannel: jest.fn(),
  };
  const store = new Vuex.Store({
    state: {
      auth: {
        user: {},
      },
    },
    getters: {
      signedIn: jest.fn(() => false),
    },
    actions,
  });
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(SubscribeButton, {
      store,
      localVue,
    });
  });
  afterEach(() => {
    wrapper.destroy();
  });

  it("should not render button if user not logged in", () => {
    expect(wrapper.find("button").exists()).toBe(false);
  });
});

describe("Test Subscribe button component when user logs in and does not subscribe the channel", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const actions = {
    fetchChannelSubscription: jest.fn(),
    subscribeChannel: jest.fn(),
    unsubscribeChannel: jest.fn(),
  };
  const store = new Vuex.Store({
    state: {
      auth: {
        user,
      },
      channel: {
        subscriptionId: null,
      },
    },
    getters: {
      signedIn: jest.fn(() => true),
    },
    actions,
  });
  let wrapper, spyFetchChannelSubscriptionIdMethod;
  beforeEach(() => {
    spyFetchChannelSubscriptionIdMethod = jest.spyOn(
      SubscribeButton.methods,
      "fetchChannelSubscriptionId"
    );
    wrapper = mount(SubscribeButton, {
      store,
      localVue,
      propsData: {
        channelId: channelIdFixture,
      },
      data() {
        return {
          buttonText: "",
        };
      },
    });
  });
  afterEach(() => {
    wrapper.destroy();
  });

  it("should render button correctly", () => {
    expect(wrapper.find("button").exists()).toBe(true);
    expect(wrapper.find("button").text()).toBe("Unsubscribed");
  });

  it("created hook should be called", () => {
    expect(spyFetchChannelSubscriptionIdMethod).toHaveBeenCalledWith(
      channelIdFixture
    );
  });

  it("can subscribe channel", async (done) => {
    await wrapper.find("button").trigger("click");
    expect(actions.subscribeChannel).toHaveBeenCalled();
    done();
  });
});

//////////////////////////////////////////////////
describe("Test Subscribe button component when user logs in and subscribes the channel", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const actions = {
    fetchChannelSubscription: jest.fn(),
    subscribeChannel: jest.fn(),
    unsubscribeChannel: jest.fn(),
  };
  const store = new Vuex.Store({
    state: {
      auth: {
        user,
      },
      channel: {
        subscriptionId: "mock_subscription_id",
      },
    },
    getters: {
      signedIn: jest.fn(() => true),
    },
    actions,
  });
  let wrapper, spyFetchChannelSubscriptionIdMethod, spyHandleToggleSubscribe;
  beforeEach(() => {
    spyFetchChannelSubscriptionIdMethod = jest.spyOn(
      SubscribeButton.methods,
      "fetchChannelSubscriptionId"
    );
    spyHandleToggleSubscribe = jest.spyOn(
      SubscribeButton.methods,
      "handleToggleSubscribe"
    );

    wrapper = mount(SubscribeButton, {
      store,
      localVue,
      propsData: {
        channelId: channelIdFixture,
      },
      data() {
        return {
          buttonText: "",
          subscriptionId: "",
        };
      },
    });
  });
  afterEach(() => {
    wrapper.destroy();
  });

  it("should render button correctly", () => {
    expect(wrapper.find("button").exists()).toBe(true);
    expect(wrapper.find("button").text()).toBe("Subscribed");
  });

  it("created hook should be called", () => {
    expect(spyFetchChannelSubscriptionIdMethod).toHaveBeenCalledWith(
      channelIdFixture
    );
    expect(wrapper.vm._data.subscriptionId).toBe("mock_subscription_id");
  });

  it("can unsubscribe channel", async (done) => {
    await wrapper.find("button").trigger("click");
    expect(spyHandleToggleSubscribe).toHaveBeenCalled();
    expect(wrapper.find("button").text()).toBe("Unsubscribing");
    expect(actions.unsubscribeChannel).toHaveBeenCalled();
    done();
  });
});
