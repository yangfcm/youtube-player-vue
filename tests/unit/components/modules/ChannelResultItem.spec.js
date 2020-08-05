import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import ChannelResultItem from "@/components/modules/ChannelResultItem";
import { searchResultResponse } from "../../store/fixtures/search";

describe("Test ChannelResultItem component", () => {
  let wrapper;
  const channel = searchResultResponse.items.find(
    (item) => item.id.kind === "youtube#channel"
  );
  beforeEach(() => {
    wrapper = shallowMount(ChannelResultItem, {
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
    expect(wrapper.find(".header").text()).toContain(
      channel.snippet.channelTitle
    );
    expect(wrapper.find("div.description").text()).toContain(
      channel.snippet.description
    );
    expect(wrapper.find("a").props().to).toBe(
      `/channel/${channel.id.channelId}`
    );
  });
});
