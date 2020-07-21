import Vue from "vue";
import Vuex from "vuex";

import video from "./modules/video";
import channel from "./modules/channel";
import auth from "./modules/auth";
import comment from "./modules/comment";
import playlist from "./modules/playlist";
import search from "./modules/search";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    video,
    channel,
    auth,
    comment,
    playlist,
    search,
  },
});
