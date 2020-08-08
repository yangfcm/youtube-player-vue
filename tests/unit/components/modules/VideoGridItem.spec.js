import { shallowMount, RouterLinkStub, createLocalVue } from "@vue/test-utils";
import VideoGridItem from "@/components/modules/VideoGridItem";
import { videoItem1 as video } from "../../store/fixtures/video";
import date from "@/filters/date";
import decimal from "@/filters/decimal";

describe("Test VideoGridItem component", () => {
  const localVue = createLocalVue();
  localVue.filter("date", date);
  localVue.filter("decimal", decimal);
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(VideoGridItem, {
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
    expect(wrapper.find("img").attributes("src")).toBe(
      video.snippet.thumbnails.medium.url
    );
    expect(wrapper.find("a.image").props().to).toBe(`/video/${video.id}`);
    expect(wrapper.find("div.app-video-title a").props().to).toBe(
      `/video/${video.id}`
    );
    expect(wrapper.find("div.app-video-title").text()).toContain(
      video.snippet.title
    );
    expect(wrapper.find("div.meta a").props().to).toBe(
      `/channel/${video.snippet.channelId}`
    );
  });
});
