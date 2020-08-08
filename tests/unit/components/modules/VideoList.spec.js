import { shallowMount } from "@vue/test-utils";
import VideoList from "@/components/modules/VideoList";
import VideoListItem from "@/components/modules/VideoListItem";
import InfoMessage from "@/components/common/InfoMessage";
import {
  popularVideosResponse,
  videoEmptyResponse,
} from "../../store/fixtures/video";

describe("Test VideoList component", () => {
  it("should render correct information if there is no video", () => {
    const wrapper = shallowMount(VideoList, {
      propsData: {
        videos: videoEmptyResponse.items,
      },
    });
    expect(wrapper.findComponent(InfoMessage).exists()).toBe(true);
    expect(wrapper.findComponent(InfoMessage).text()).toContain(
      "There is no video in the playlist"
    );
    wrapper.destroy();
  });

  it("should render correct numbers of VideoListItem components if there are videos", () => {
    const wrapper = shallowMount(VideoList, {
      propsData: {
        videos: popularVideosResponse.items,
      },
    });
    expect(wrapper.findComponent(InfoMessage).exists()).toBe(false);
    expect(wrapper.findAllComponents(VideoListItem).length).toBe(
      popularVideosResponse.items.length
    );
    wrapper.destroy();
  });
});
