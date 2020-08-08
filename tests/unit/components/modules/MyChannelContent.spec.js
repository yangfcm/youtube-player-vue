import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import MyChannelContent from "@/components/modules/MyChannelContent";
import Loader from "@/components/common/Loader";
import ErrorMessage from "@/components/common/ErrorMessage";
import PageTitle from "@/components/common/PageTitle";
import ChannelGrid from "@/components/modules/ChannelGrid";
import MoreButton from "@/components/modules/MoreButton";
import { myChannelsResponse } from "../../store/fixtures/channel";

const localVue = createLocalVue();
localVue.use(Vuex);
const actions = {
  fetchMyChannels: jest.fn(),
};
describe("Test MyChannelContent component when component is initially rendered", () => {
  const store = new Vuex.Store({
    state: {
      channel: {
        myChannels: null,
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
    wrapper = shallowMount(MyChannelContent, {
      store,
      localVue,
    });
  });
  afterEach(() => {
    wrapper.destroy();
  });
  it("should render Loader if there no error and no channel returned", () => {
    expect(wrapper.findComponent(Loader).exists()).toBe(true);
    expect(wrapper.findComponent(ErrorMessage).exists()).toBe(false);
    expect(wrapper.find("div#app-my-channel-content").exists()).toBe(false);
  });

  it("fetchMyChannels action should be called", () => {
    expect(actions.fetchMyChannels).toHaveBeenCalled();
  });
});

describe("Test ErrorMessage component when error occurs", () => {
  const errorMessage = "error occurs";
  const store = new Vuex.Store({
    state: {
      channel: {
        myChannels: null,
        channelError: { message: errorMessage },
      },
    },
    getters: {
      channelErrorMessage: jest.fn(() => errorMessage),
    },
    actions,
  });
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(MyChannelContent, {
      store,
      localVue,
    });
  });
  afterEach(() => {
    wrapper.destroy();
  });
  it("should render ErrorMessage component", () => {
    expect(wrapper.findComponent(Loader).exists()).toBe(false);
    expect(wrapper.findComponent(ErrorMessage).exists()).toBe(true);
    expect(wrapper.find("div#app-my-channel-content").exists()).toBe(false);
  });

  it("should render correct error message", () => {
    expect(wrapper.text()).toContain(errorMessage);
  });
});

describe("Test MyChannelContent component when myChannels data is successfully fetched", () => {
  const store = new Vuex.Store({
    state: {
      channel: {
        myChannels: myChannelsResponse,
        channelError: null,
      },
    },
    getters: {
      channelErrorMessage: jest.fn(() => ""),
    },
    actions,
  });
  let wrapper, spyHandleMore;
  beforeEach(() => {
    spyHandleMore = jest.spyOn(MyChannelContent.methods, "handleMore");
    wrapper = shallowMount(MyChannelContent, {
      store,
      localVue,
    });
  });
  afterEach(() => {
    wrapper.destroy();
  });

  it("should render div#my-channel-content", () => {
    expect(wrapper.findComponent(Loader).exists()).toBe(false);
    expect(wrapper.findComponent(ErrorMessage).exists()).toBe(false);
    expect(wrapper.find("div#my-channel-content").exists()).toBe(true);
  });

  it("should render PageTitle component with correct text", () => {
    const pageTitleComp = wrapper.findComponent(PageTitle);
    expect(pageTitleComp.exists()).toBe(true);
    expect(pageTitleComp.text()).toContain("My Subscriptions");
  });

  it("should render ChannelGrid component and pass correct props to it", () => {
    const channelGridComp = wrapper.findComponent(ChannelGrid);
    expect(channelGridComp.exists()).toBe(true);
    expect(channelGridComp.props("channels")).toEqual(myChannelsResponse.items);
  });

  it("should render MoreButton component and pass correct props to it", () => {
    const moreButtonComp = wrapper.findComponent(MoreButton);
    expect(moreButtonComp.exists()).toBe(true);
    expect(moreButtonComp.text()).toContain("More channels");
    expect(moreButtonComp.props("nextPageToken")).toBe(
      myChannelsResponse.nextPageToken
    );
    expect(moreButtonComp.props("isLoadingMore")).toBe(false);
  });

  it("should call handleMore when more button is clicked", () => {
    const moreButtonComp = wrapper.findComponent(MoreButton);
    moreButtonComp.trigger("click");
    expect(actions.fetchMyChannels).toHaveBeenCalled();
  });
});
