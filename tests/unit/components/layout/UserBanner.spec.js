import { shallowMount } from "@vue/test-utils";
import UserBanner from "@/components/layout/UserBanner.vue";
import { userResponse as user } from "../../store/fixtures/auth";

test("Userbanner component can render correctly when user not logged in", () => {
  const $store = {
    state: {
      auth: {
        user: {},
      },
    },
    getters: {
      signedIn: false,
    },
  };
  const wrapper = shallowMount(UserBanner, {
    mocks: {
      $store,
    },
  });
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find("i.user.secret.icon").exists()).toBe(true);
  expect(wrapper.find("img").exists()).toBe(false);
});

test("Userbanner component can render correctly when user logged in", () => {
  const $store = {
    state: {
      auth: {
        user,
      },
    },
    getters: {
      signedIn: true,
    },
  };
  const wrapper = shallowMount(UserBanner, {
    mocks: {
      $store,
    },
  });
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find("i.user.secret.icon").exists()).toBe(false);
  expect(wrapper.find("img").exists()).toBe(true);
  expect(wrapper.text()).toContain(wrapper.vm.$store.state.auth.user.name);
});
