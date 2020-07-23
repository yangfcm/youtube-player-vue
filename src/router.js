import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./components/pages/Home";

const MyChannel = () => import("./components/pages/MyChannel.vue");
const MyPlaylist = () => import("./components/pages/MyPlaylist.vue");
const Video = () => import("./components/pages/Video.vue");
const PlaylistDetail = () => import("./components/pages/PlaylistDetail.vue");
const Channel = () => import("./components/pages/Channel.vue");
const SearchResult = () => import("./components/pages/SearchResult.vue");
const ChannelVideos = () => import("./components/pages/ChannelVideos.vue");
const ChannelPlaylist = () => import("./components/pages/ChannelPlaylist.vue");
const ChannelIntro = () => import("./components/pages/ChannelIntro.vue");
const NotFound = () => import("./components/pages/NotFound.vue");

const routes = [
  { path: "/", component: Home },
  { path: "/subscription", component: MyChannel },
  { path: "/playlist", component: MyPlaylist },
  { path: "/video/:id", component: Video },
  { path: "/playlist/:id", component: PlaylistDetail },
  {
    path: "/channel/:id",
    component: Channel,
    children: [
      { path: "", redirect: "/channel/:id/videos" },
      { path: "videos", component: ChannelVideos },
      {
        path: "playlist",
        component: ChannelPlaylist,
      },
      {
        path: "intro",
        component: ChannelIntro,
      },
    ],
  },
  { path: "/search/:keyword", component: SearchResult },
  { path: "*", component: NotFound },
];

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes,
});
