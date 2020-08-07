import { mount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import Vuex from "vuex";
import { routes } from "@/router";
import App from "@/App";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Home from "@/components/pages/Home";
import MyChannel from "@/components/pages/MyChannel";
import MyPlaylist from "@/components/pages/MyPlaylist";
import Video from "@/components/pages/Video";
import PlaylistDetail from "@/components/pages/PlaylistDetail";
import Channel from "@/components/pages/Channel";
import SearchResult from "@/components/pages/SearchResult";
import NotFound from "@/components/pages/NotFound";
import store from "@/store/store";

describe("Test App", () => {
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  localVue.use(Vuex);
  const router = new VueRouter({
    routes,
    mode: "history",
  });
  let wrapper;
  afterEach(() => {
    if (wrapper) {
      wrapper.destroy();
    }
  });

  it("should render Header and Footer", () => {
    wrapper = mount(App, {
      localVue,
      router,
      store,
    });
    expect(wrapper.findComponent(Header).exists()).toBe(true);
    expect(wrapper.findComponent(Footer).exists()).toBe(true);
  });

  it("should render Home page for route /", () => {
    wrapper = mount(App, {
      localVue,
      router,
      store,
    });
    expect(wrapper.findComponent(Home).exists()).toBe(true);
  });

  it("should render MyChannel page for route /subscription", async () => {
    // To test lazy-loading routes, first navigate to the route
    // Then mount the component.
    await router.push("/subscription");
    wrapper = mount(App, {
      localVue,
      router,
      store,
    });
    expect(wrapper.findComponent(MyChannel).exists()).toBe(true);
  });

  it("should render MyPlaylist page for /playlist", async () => {
    await router.push("/playlist");
    wrapper = mount(App, {
      localVue,
      router,
      store,
    });
    expect(wrapper.findComponent(MyPlaylist).exists()).toBe(true);
  });

  it("should render Video page for /video/:id", async () => {
    await router.push("/video/video-id");
    wrapper = mount(App, {
      localVue,
      router,
      store,
    });
    expect(wrapper.findComponent(Video).exists()).toBe(true);
  });

  it("should render Channel page for /channel/:id", async () => {
    await router.push("/channel/channel-id");
    wrapper = mount(App, {
      localVue,
      router,
      store,
    });
    expect(wrapper.findComponent(Channel).exists()).toBe(true);
  });

  it("should render Playlist page for /playlist/:id", async () => {
    await router.push("/playlist/playlist-id");
    wrapper = mount(App, {
      localVue,
      router,
      store,
    });
    expect(wrapper.findComponent(PlaylistDetail).exists()).toBe(true);
  });

  it("should render Search page for /search/:keyword", async () => {
    await router.push("/search/abc");
    wrapper = mount(App, {
      localVue,
      router,
      store,
    });
    expect(wrapper.findComponent(SearchResult).exists()).toBe(true);
  });

  it("should render NotFound page for any other route", async () => {
    await router.push("/other");
    wrapper = mount(App, {
      localVue,
      router,
      store,
    });
    expect(wrapper.findComponent(NotFound).exists()).toBe(true);
  });
});
