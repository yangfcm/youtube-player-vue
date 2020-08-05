import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import MyPlaylistContent from "@/components/modules/MyPlaylistContent";
import Loader from "@/components/common/Loader";
import ErrorMessage from "@/components/common/ErrorMessage";
import PageTitle from "@/components/common/PageTitle";
import MoreButton from "@/components/modules/MoreButton";
import PlaylistGrid from "@/components/modules/PlaylistGrid";
import axios from "@/settings";
import { myPlaylistResponse } from "../../store/fixtures/playlist";

describe("Test MyPlaylistContent component", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const actions = {
    fetchMyPlaylist: jest.fn(),
  };
  const store = new Vuex.Store({
    state: {
      playlist: {
        myPlaylist: null,
        playlistError: null,
      },
    },
    getters: {
      playlistErrorMessage: jest.fn(() => ""),
    },
    actions,
  });
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(MyPlaylistContent, {
      store,
      localVue,
    });
  });
  afterEach(() => {
    wrapper.destroy();
  });

  it("should render Loader if there is no error and channel returned", () => {
    expect(wrapper.findComponent(Loader).exists()).toBe(true);
    expect(wrapper.findComponent(ErrorMessage).exists()).toBe(false);
    expect(wrapper.find("div#app-my-playlist-conntent").exists()).toBe(false);
  });

  it("fetchMyPlaylist action should be called when component is rendered", async () => {
    expect(actions.fetchMyPlaylist).toHaveBeenCalled();
  });

  it("should render ErrorMessage component if error occurs", async () => {
    const errorMessage = "mock error message";
    wrapper.setData({
      error: errorMessage,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(Loader).exists()).toBe(false);
    expect(wrapper.findComponent(ErrorMessage).exists()).toBe(true);
    expect(wrapper.find("div#app-my-playlist-conntent").exists()).toBe(false);
    expect(wrapper.text()).toContain(errorMessage);
  });

  describe("Test MyPlaylistContent component if data is successfully fetched", () => {
    beforeEach(() => {
      wrapper.setData({
        playlists: myPlaylistResponse,
        error: "",
      });
    });

    it("should render div#app-my-playlist-conntent", () => {
      expect(wrapper.findComponent(Loader).exists()).toBe(false);
      expect(wrapper.findComponent(ErrorMessage).exists()).toBe(false);
      expect(wrapper.find("div#app-my-playlist-conntent").exists()).toBe(true);
    });

    it("should render PageTitle component with correct text", () => {
      const pageTitleComp = wrapper.findComponent(PageTitle);
      expect(pageTitleComp.exists()).toBe(true);
      expect(pageTitleComp.text()).toContain("My Playlist");
    });

    it("should render PlaylistGrid component and pass correct props to it", () => {
      const playlistGridComp = wrapper.findComponent(PlaylistGrid);
      expect(playlistGridComp.exists()).toBe(true);
      expect(playlistGridComp.props("playlists")).toEqual(
        myPlaylistResponse.items
      );
    });

    it("should render MoreButton component and pass correct props to it", () => {
      const moreButtonComp = wrapper.findComponent(MoreButton);
      expect(moreButtonComp.exists()).toBe(true);
      expect(moreButtonComp.text()).toContain("More playlist");
      expect(moreButtonComp.props()).toEqual({
        nextPageToken: myPlaylistResponse.nextPageToken,
        isLoadingMore: false,
      });
    });

    it("should call handleMore when more button is clicked", () => {
      const moreButtonComp = wrapper.findComponent(MoreButton);
      moreButtonComp.trigger("click");
      expect(actions.fetchMyPlaylist).toHaveBeenCalled();
    });
  });
});
