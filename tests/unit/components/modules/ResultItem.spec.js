import { shallowMount } from "@vue/test-utils";
import ResultItem from "@/components/modules/ResultItem";
import { searchResultResponse } from "../../store/fixtures/search";
import VideoResultItem from "@/components/modules/VideoResultItem";
import PlaylistResultItem from "@/components/modules/PlaylistResultItem";
import ChannelResultItem from "@/components/modules/ChannelResultItem";

describe("Test ResultItem component", () => {
  const playlistItem = searchResultResponse.items.find(
    (item) => item.id.kind === "youtube#playlist"
  );
  const channelItem = searchResultResponse.items.find(
    (item) => item.id.kind === "youtube#channel"
  );

  it("should render VideoResultItem component if item kind is video", () => {
    const item = searchResultResponse.items.find(
      (item) => item.id.kind === "youtube#video"
    );
    const wrapper = shallowMount(ResultItem, {
      propsData: {
        item,
      },
    });
    expect(wrapper.findComponent(VideoResultItem).exists()).toBe(true);
    expect(wrapper.findComponent(PlaylistResultItem).exists()).toBe(false);
    expect(wrapper.findComponent(ChannelResultItem).exists()).toBe(false);
  });
  it("should render PlaylistResultItem component if item kind is playlist", () => {
    const item = searchResultResponse.items.find(
      (item) => item.id.kind === "youtube#playlist"
    );
    const wrapper = shallowMount(ResultItem, {
      propsData: {
        item,
      },
    });
    expect(wrapper.findComponent(VideoResultItem).exists()).toBe(false);
    expect(wrapper.findComponent(PlaylistResultItem).exists()).toBe(true);
    expect(wrapper.findComponent(ChannelResultItem).exists()).toBe(false);
  });
  it("should render ChannelResultItem component if item kind is channel", () => {
    const item = searchResultResponse.items.find(
      (item) => item.id.kind === "youtube#channel"
    );
    const wrapper = shallowMount(ResultItem, {
      propsData: {
        item,
      },
    });
    expect(wrapper.findComponent(VideoResultItem).exists()).toBe(false);
    expect(wrapper.findComponent(PlaylistResultItem).exists()).toBe(false);
    expect(wrapper.findComponent(ChannelResultItem).exists()).toBe(true);
  });
});
