import { shallowMount, RouterLinkStub, createLocalVue } from "@vue/test-utils";
import VideoListItem from "@/components/modules/VideoListItem";
import { playlistDetailResponse } from "../../store/fixtures/playlist";
import date from "@/filters/date";
import decimal from "@/filters/decimal";

describe("Test VideoListItem component", () => {
  const localVue = createLocalVue();
  localVue.filter("date", date);
  localVue.filter("decimal", decimal);
  let wrapper;
  const video = playlistDetailResponse.items[0];
  beforeEach(() => {
    wrapper = shallowMount(VideoListItem, {
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
    expect(wrapper.find("a.app-card-image-container").props().to).toBe(
      `/video/${video.snippet.resourceId.videoId}?playlistId=${video.snippet.playlistId}`
    );
    expect(wrapper.find("div.app-list-card-content a").props().to).toBe(
      `/video/${video.snippet.resourceId.videoId}?playlistId=${video.snippet.playlistId}`
    );
    expect(wrapper.find("div.app-list-card-content").text()).toContain(
      video.snippet.title
    );
    expect(wrapper.find("a.app-channel-link").props().to).toBe(
      `/channel/${video.snippet.channelId}`
    );
    expect(wrapper.find("a.app-channel-link").text()).toContain(
      video.snippet.channelTitle
    );
  });
});
