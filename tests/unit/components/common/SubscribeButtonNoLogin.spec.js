import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import SubscribeButton from "@/components/common/SubscribeButton.vue";

describe("Test SubscribeButton component when user is not loggedin", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const actions = {
    fetchChannelSubscription: jest.fn(),
    subscribeChannel: jest.fn(),
    unsubscribeChannel: jest.fn(),
  };
  // const store = new Vuex.Store({
  //   state: {
  //     auth: {
  //       user,
  //       channel: {
  //         subscriptionId: null,
  //       },
  //     },
  //   },
  //   getters: {
  //     signedIn: jest.fn(() => true),
  //   },
  //   actions,
  // });
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
    // unAuthedWrapper = shallowMount(SubscribeButton, {
    //   store: unAuthedStore,
    //   localVue,
    // });
  });
  afterEach(() => {
    wrapper.destroy();
  });

  it("should not render button if user not logged in", () => {
    expect(wrapper.find("button").exists()).toBe(false);
  });
});
