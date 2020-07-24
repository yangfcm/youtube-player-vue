import Vue from "vue";
import App from "./App.vue";
import store from "./store/store";
import router from "./router";
import decimal from "./filters/decimal";
import date from "./filters/date";

Vue.config.productionTip = false;

Vue.filter("decimal", decimal);
Vue.filter("date", date);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
