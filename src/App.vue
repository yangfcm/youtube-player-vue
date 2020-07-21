<template>
  <div id="app">
    <app-header></app-header>
    <div>
      <router-view></router-view>
    </div>
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
    appFooter: Footer
  }
};
</script>

<style></style>
