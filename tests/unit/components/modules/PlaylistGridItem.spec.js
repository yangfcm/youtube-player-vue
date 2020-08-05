import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import PlaylistGridItem from "@/components/modules/PlaylistGridItem.vue";
import { playlistResponse } from "../../store/fixtures/playlist";

describe("Test PlaylistGridItem component", () => {
  let wrapper;
  const playlist = playlistResponse.items[0];
  beforeEach(() => {
    wrapper = shallowMount(PlaylistGridItem, {
      propsData: {
        playlist,
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
      playlist.snippet.thumbnails.medium.url
    );
    expect(wrapper.find(".header").text()).toBe(playlist.snippet.title);
    expect(wrapper.find("a").props().to).toBe(`/playlist/${playlist.id}`);
    expect(wrapper.find("div.tiny.label").text()).toContain(
      playlist.contentDetails.itemCount
    );
  });
});
