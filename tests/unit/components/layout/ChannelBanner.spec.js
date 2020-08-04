import { shallowMount } from "@vue/test-utils";
import { channelIntroResponse } from "../../store/fixtures/channel";
import ChannelBanner from "@/components/layout/ChannelBanner.vue";
import SubscribeButton from "@/components/common/SubscribeButton.vue";

describe("Test ChannelBanner component", () => {
  let wrapper;
  const channelIntro = channelIntroResponse.items[0];
  beforeEach(() => {
    wrapper = shallowMount(ChannelBanner, {
      propsData: {
        channelIntro,
      },
    });
  });
  afterEach(() => {
    wrapper.destroy();
  });

  it("ChannelBanner component matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("ChannelBanner component should render correct content", () => {
    expect(wrapper.find("h2").text()).toContain(channelIntro.snippet.title);
    expect(wrapper.find("img").attributes("src")).toBe(
      channelIntro.snippet.thumbnails.medium.url
    );
  });

  it("should contain SubscribeButton component", () => {
    expect(wrapper.findComponent(SubscribeButton).exists()).toBe(true);
  });
});
