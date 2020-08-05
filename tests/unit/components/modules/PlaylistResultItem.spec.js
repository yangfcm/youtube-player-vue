import { shallowMount, RouterLinkStub, createLocalVue } from "@vue/test-utils";
import PlaylistResultItem from "@/components/modules/PlaylistResultItem";
import { searchResultResponse } from "../../store/fixtures/search";
import date from "@/filters/date";

describe("Test PlaylistResultItem component", () => {
  let wrapper;
  const localVue = createLocalVue();
  localVue.filter("date", date);

  const playlist = searchResultResponse.items.find(
    (item) => item.id.kind === "youtube#playlist"
  );

  beforeEach(() => {
    wrapper = shallowMount(PlaylistResultItem, {
      propsData: {
        playlist,
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
      `/plalist/${playlist.id.playlistId}`
    );
    expect(wrapper.find("img").attributes("src")).toBe(
      playlist.snippet.thumbnails.medium.url
    );
    expect(wrapper.find(".header").text()).toContain(playlist.snippet.title);
    expect(wrapper.find(".description").text()).toContain(
      playlist.snippet.description
    );
    expect(wrapper.find("div.meta a").props().to).toBe(
      `/channel/${playlist.snippet.channelId}`
    );
  });
});
