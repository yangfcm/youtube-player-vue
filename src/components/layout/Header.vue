<template>
  <div class="ui menu stackable">
    <router-link to="/" class="header item ui">
      <i class="video icon red"></i>
      FanTube
    </router-link>
    <div class="right menu">
      <div class="item">
        <div class="ui icon input" style="min-width: 10px;">
          <input type="text" />
          <i class="search icon link"></i>
        </div>
        <div v-if="signedIn === true" class="app-dropdown-container">
          <img
            :src="user.picture"
            :alt="user.name"
            class="ui tiny image circular"
            style="cursor: pointer; max-height: 60px; width: auto;"
            @click.stop="toggleShowDropdown"
          />
          <app-dropdown class="app-dropdown-menu" v-if="showDropdown"></app-dropdown>
        </div>
        <div v-if="signedIn === false">
          <button
            class="ui youtube button"
            style="margin-left: 1rem; width: 110px;"
            @click="handleSignin"
          >
            <i class="youtube icon"></i>
            Sign In
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import googleAuth from "../../mixins/googleAuth";
import Dropdown from "../common/Dropdown";

export default {
  data: function() {
    return {
      showDropdown: false
    };
  },
  components: {
    appDropdown: Dropdown
  },
  computed: {
    ...mapGetters(["user", "signedIn"])
  },
  methods: {
    toggleShowDropdown() {
      this.showDropdown = !this.showDropdown;
    }
  },
  mounted() {
    window.addEventListener("click", () => {
      this.showDropdown = false;
    });
  },
  mixins: [googleAuth]
};
</script>

<style scoped>
.app-dropdown-container {
  position: relative;
  margin-left: 1rem;
}
.app-dropdown-menu {
  position: absolute;
  right: 0;
  top: 105%;
  z-index: 10;
}
</style>
