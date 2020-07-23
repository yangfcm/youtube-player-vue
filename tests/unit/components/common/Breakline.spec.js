import { shallowMount } from "@vue/test-utils";
import Breakline from "@/components/common/Breakline";

test("Breakline component can render correctly", () => {
  const wrapper = shallowMount(Breakline);
  expect(wrapper).toMatchSnapshot();
});
