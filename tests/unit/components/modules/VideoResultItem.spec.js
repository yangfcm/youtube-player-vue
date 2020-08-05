import { shallowMount, RouterLinkStub, createLocalVue } from "@vue/test-utils";
import VideoResultItem from "@/components/modules/VideoResultItem";
import { searchResultResponse } from "../../store/fixtures/search";
import date from "@/filters/date";

describe("Test VideoResultItem component", () => {
  let wrapper;
  const localVue = createLocalVue();
  localVue.filter("date", date);
  const video = searchResultResponse.items.find(
    (item) => item.id.kind === "youtube#video"
  );

  beforeEach(() => {
    wrapper = shallowMount(VideoResultItem, {
      propsData: {
        video,
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
      localVue,
    });
  });
  afterEach(() => {
    wrapper.destroy();
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render correct content", () => {
    expect(wrapper.find("a.image").props().to).toBe(
      `/video/${video.id.videoId}`
    );
    expect(wrapper.find("a.header").props().to).toBe(
      `/video/${video.id.videoId}`
    );
    expect(wrapper.find("a.header").text()).toContain(video.snippet.title);
    expect(wrapper.find("div.meta a").props().to).toBe(
      `/channel/${video.snippet.channelId}`
    );
    expect(wrapper.find("div.meta a").text()).toContain(
      video.snippet.channelTitle
    );
    expect(wrapper.find(".description").text()).toContain(
      video.snippet.description
    );
  });
});
