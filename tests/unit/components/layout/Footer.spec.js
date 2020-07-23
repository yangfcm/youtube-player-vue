import { shallowMount } from "@vue/test-utils";
import Footer from "@/components/layout/Footer.vue";

const wrapper = shallowMount(Footer);
test("Footer component matches snapshot", () => {
  expect(wrapper).toMatchSnapshot();
});
