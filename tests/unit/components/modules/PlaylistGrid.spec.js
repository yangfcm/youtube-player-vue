import { shallowMount } from "@vue/test-utils";
import PlaylistGrid from "@/components/modules/PlaylistGrid.vue";
import PlaylistGridItem from "@/components/modules/PlaylistGridItem.vue";
import InfoMessage from "@/components/common/InfoMessage.vue";
import {
  playlistResponse,
  playlistEmptyResponse,
} from "../../store/fixtures/playlist";

describe("Test PlaylistGrid component", () => {
  it("should render information if there is no playlist", () => {
    const wrapper = shallowMount(PlaylistGrid, {
      propsData: {
        playlists: playlistEmptyResponse.items,
      },
    });
    expect(wrapper.findComponent(InfoMessage).exists()).toBe(true);
    expect(wrapper.findComponent(InfoMessage).text()).toContain(
      "There is no playlist created"
    );
    expect(wrapper.findComponent(PlaylistGridItem).exists()).toBe(false);
    wrapper.destroy();
  });

  it("should render correct numbers of PlaylistGridItem components if there are playlists", () => {
    const wrapper = shallowMount(PlaylistGrid, {
      propsData: {
        playlists: playlistResponse.items,
      },
    });
    expect(wrapper.findComponent(InfoMessage).exists()).toBe(false);
    expect(wrapper.findAllComponents(PlaylistGridItem).length).toBe(
      playlistResponse.items.length
    );
    wrapper.destroy();
  });
});
