<template>
  <div id="app" class="app-container">
    <div class="app-body">
      <app-header></app-header>
      <div class="ui app-inner-container">
        <router-view></router-view>
      </div>
    </div>
    <app-blank></app-blank>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Blank from "./components/common/Blank.vue";
// import "semantic-ui-css/semantic.min.css";

export default {
  name: "App",
  components: {
    appHeader: Header,
    appFooter: Footer,
    appBlank: Blank,
  },
};
</script>

<style>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.app-inner-container {
  max-width: 90%;
  margin: 0 auto;
  height: 100%;
}
.app-body {
  flex-grow: 1;
}
@media only screen and (max-width: 576px) {
  .app-inner-container {
    max-width: 95%;
  }
}
</style>
