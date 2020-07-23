import { shallowMount } from "@vue/test-utils";
import Footer from "@/components/layout/Footer.vue";

test("Footer component matches snapshot", () => {
  const wrapper = shallowMount(Footer);
  expect(wrapper).toMatchSnapshot();
});
