import { shallowMount } from "@vue/test-utils";
import Blank from "@/components/common/Blank";

test("Blank component can render correctly", () => {
  const wrapper = shallowMount(Blank);
  expect(wrapper).toMatchSnapshot();
});
