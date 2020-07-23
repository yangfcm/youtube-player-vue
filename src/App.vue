<template>
  <div id="app" class="app-container">
    <div class="app-body">
      <app-header></app-header>
      <div class="ui app-inner-container">
        <router-view></router-view>
      </div>
    </div>
    <div class="ui divider hidden"></div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import "semantic-ui-css/semantic.min.css";

export default {
  name: "App",
  components: {
    appHeader: Header,
    appFooter: Footer,
  },
};
</script>

<style>
.app-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.app-inner-container {
  max-width: 90%;
  margin: 0 auto;
}
.app-body {
  flex-grow: 1;
}
</style>
