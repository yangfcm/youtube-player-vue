import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./components/pages/Home";
//  import MyChannel from "./components/pages/MyChannel.vue";

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

export const routes = [
  { path: "/", component: Home },
  { path: "/subscription", component: MyChannel },
  { path: "/playlist", component: MyPlaylist },
  { path: "/video/:id", component: Video },
  { path: "/playlist/:id", component: PlaylistDetail },
  {
    path: "/channel/:id",
    component: Channel,
    children: [
      { path: "", name: "channelRoot", redirect: "/channel/:id/videos" },
      { path: "videos", name: "channelVideos", component: ChannelVideos },
      {
        path: "playlist",
        name: "channelPlaylist",
        component: ChannelPlaylist,
      },
      {
        path: "intro",
        name: "channelIntro",
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
