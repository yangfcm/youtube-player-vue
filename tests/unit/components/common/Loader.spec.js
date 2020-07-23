import { shallowMount } from "@vue/test-utils";
import Loader from "@/components/common/Loader";

test("Loader component can render correctly", () => {
  const wrapper = shallowMount(Loader);
  expect(wrapper).toMatchSnapshot();
});
