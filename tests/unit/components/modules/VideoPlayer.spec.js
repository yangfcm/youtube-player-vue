import { shallowMount } from "@vue/test-utils";
import VideoPlayer from "@/components/modules/VideoPlayer";
import { videoItem1 as video } from "../../store/fixtures/video";

describe("Test VideoPlayer component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(VideoPlayer, {
      propsData: {
        videoId: video.id,
      },
    });
  });
  afterEach(() => {
    wrapper.destroy();
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("player should have correct src", () => {
    expect(wrapper.find(".app-player").attributes("src")).toBe(
      `https://www.youtube.com/embed/${video.id}`
    );
  });
});
