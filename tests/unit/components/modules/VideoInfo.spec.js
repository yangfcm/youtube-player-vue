import { shallowMount, RouterLinkStub, createLocalVue } from "@vue/test-utils";
import VideoInfo from "@/components/modules/VideoInfo";
import { videoItem1 as video } from "../../store/fixtures/video";
import date from "@/filters/date";
import decimal from "@/filters/decimal";

describe("Test VideoInfo component", () => {
  const localVue = createLocalVue();
  localVue.filter("date", date);
  localVue.filter("decimal", decimal);
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(VideoInfo, {
      propsData: {
        videoDetail: video,
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
    expect(wrapper.find("h2").text()).toContain(video.snippet.title);
    expect(wrapper.find("a").props().to).toBe(
      `/channel/${video.snippet.channelId}`
    );
    expect(wrapper.find("div.description").text()).toContain(
      video.snippet.description
    );
  });
});
