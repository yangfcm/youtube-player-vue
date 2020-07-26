import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { userResponse as user } from "../../store/fixtures/auth";
import { channelId as channelIdFixture } from "../../store/fixtures/channel";
import SubscribeButton from "@/components/common/SubscribeButton.vue";

describe("Test SubscribeButton component when user logs in and does not subscribe the channel", () => {
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
  let wrapper, spy;
  beforeEach(() => {
    spy = jest.spyOn(SubscribeButton.methods, "fetchChannelSubscriptionId");
    wrapper = mount(SubscribeButton, {
      store,
      localVue,
      propsData: {
        channelId: channelIdFixture,
      },
      data() {
        return {
          buttonText: "Unsubscribed",
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
    expect(spy).toHaveBeenCalledWith(channelIdFixture);
  });

  it("can subscribe channel", async (done) => {
    await wrapper.find("button").trigger("click");
    expect(actions.subscribeChannel).toHaveBeenCalled();
    done();
  });
});
