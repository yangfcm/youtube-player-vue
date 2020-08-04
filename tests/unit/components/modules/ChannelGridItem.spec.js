import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import ChannelGridItem from "@/components/modules/ChannelGridItem.vue";
import { myChannelsResponse } from "../../store/fixtures/channel";

describe("Test ChannelGridItem component", () => {
  let wrapper;
  const channel = myChannelsResponse.items[0];
  beforeEach(() => {
    wrapper = shallowMount(ChannelGridItem, {
      propsData: {
        channel,
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
  });
  afterEach(() => {
    wrapper.destroy();
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render correct content", () => {
    expect(wrapper.find("img").attributes("src")).toBe(
      channel.snippet.thumbnails.medium.url
    );
    expect(wrapper.find("div.content").text()).toContain(channel.snippet.title);
    // console.log(wrapper.find("a").props());
    expect(wrapper.find("a").props().to).toBe(
      `/channel/${channel.snippet.resourceId.channelId}`
    );
  });
});
