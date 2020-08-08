import { shallowMount } from "@vue/test-utils";
import VideoGrid from "@/components/modules/VideoGrid";
import VideoGridItem from "@/components/modules/VideoGridItem";
import InfoMessage from "@/components/common/InfoMessage";
import {
  popularVideosResponse,
  videoEmptyResponse,
} from "../../store/fixtures/video";

describe("Test VideoGrid component", () => {
  it("should render correct information if there is no video", () => {
    const wrapper = shallowMount(VideoGrid, {
      propsData: {
        videos: videoEmptyResponse.items,
      },
    });
    expect(wrapper.findComponent(InfoMessage).exists()).toBe(true);
    expect(wrapper.findComponent(InfoMessage).text()).toContain(
      "No videos found"
    );
    wrapper.destroy();
  });

  it("should render correct numbers of VideoGridItem components if there are videos", () => {
    const wrapper = shallowMount(VideoGrid, {
      propsData: {
        videos: popularVideosResponse.items,
      },
    });
    expect(wrapper.findComponent(InfoMessage).exists()).toBe(false);
    expect(wrapper.findAllComponents(VideoGridItem).length).toBe(
      popularVideosResponse.items.length
    );
    wrapper.destroy();
  });
});
