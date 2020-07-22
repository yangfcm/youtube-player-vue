import { shallowMount } from "@vue/test-utils";
import Footer from "@/components/layout/Footer.vue";

const wrapper = shallowMount(Footer);
test("test footer", () => {
  expect(wrapper).toMatchSnapshot();
});
