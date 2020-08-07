import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";
import { routes } from "@/router";
import ChannelPlaylist from "@/components/pages/ChannelPlaylist";
import Loader from "@/components/common/Loader";
import ErrorMessage from "@/components/common/ErrorMessage";
import PageTitle from "@/components/common/PageTitle";
import PlaylistGrid from "@/components/modules/PlaylistGrid";
import MoreButton from "@/components/modules/MoreButton";
import { playlistResponse } from "../../store/fixtures/playlist";
import { channelId } from "../../store/fixtures/channel";

describe("Test ChannelPlaylist page", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  localVue.use(VueRouter);
  const router = new VueRouter({
    routes,
  });
  const actions = {
    fetchPlaylist: jest.fn(),
  };
  const store = new Vuex.Store({
    state: {
      playlist: {
        playlist: null,
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
    wrapper = shallowMount(ChannelPlaylist, {
      store,
      localVue,
      router,
    });
  });
  afterEach(() => {
    wrapper.destroy();
  });

  it("should render Loader when no error or data is returned", () => {
    expect(wrapper.findComponent(Loader).exists()).toBe(true);
    expect(wrapper.findComponent(ErrorMessage).exists()).toBe(false);
    expect(wrapper.find("div#app-channel-playlist").exists()).toBe(false);
  });

  it("should get channelId and trigger action when component is initialized", async () => {
    router.push({
      name: "channelPlaylist",
      params: {
        id: channelId,
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$route.params.id).toBe(channelId);
    expect(actions.fetchPlaylist).toHaveBeenCalled();
  });

  it("should render ErrorMessage component if error occurs", async () => {
    const errorMessage = "mock error message";
    wrapper.setData({
      error: errorMessage,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(Loader).exists()).toBe(false);
    expect(wrapper.findComponent(ErrorMessage).exists()).toBe(true);
    expect(wrapper.find("div#app-channel-playlist").exists()).toBe(false);
  });

  describe("Test channel playlist if data is successfully fetched", () => {
    beforeEach(() => {
      wrapper.setData({
        playlists: playlistResponse,
        error: "",
      });
    });
    it("should render div#app-channel-playlist", () => {
      expect(wrapper.findComponent(Loader).exists()).toBe(false);
      expect(wrapper.findComponent(ErrorMessage).exists()).toBe(false);
      expect(wrapper.find("div#app-channel-playlist").exists()).toBe(true);
    });

    it("should render PageTitle component with correct title", () => {
      const pageTitleComp = wrapper.findComponent(PageTitle);
      expect(pageTitleComp.exists()).toBe(true);
      expect(pageTitleComp.text()).toContain("Playlist in Channel");
    });

    it("should render PlaylistGrid component and pass proper props to it", () => {
      const playlistGridComp = wrapper.findComponent(PlaylistGrid);
      expect(playlistGridComp.exists()).toBe(true);
      expect(playlistGridComp.props("playlists")).toEqual(
        playlistResponse.items
      );
    });

    it("should render MoreButton component and pass prop props to it", () => {
      const moreButtonComp = wrapper.findComponent(MoreButton);
      expect(moreButtonComp.exists()).toBe(true);
      expect(moreButtonComp.text()).toContain("More playlist");
      expect(moreButtonComp.props()).toEqual({
        nextPageToken: playlistResponse.nextPageToken,
        isLoadingMore: false,
      });
    });

    it("should call handleMore method when more button is clicked", () => {
      const moreButtonComp = wrapper.findComponent(MoreButton);
      moreButtonComp.trigger("click");
      expect(actions.fetchPlaylist).toHaveBeenCalled();
    });
  });
});
