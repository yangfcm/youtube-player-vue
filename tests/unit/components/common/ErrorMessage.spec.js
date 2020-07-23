import { shallowMount } from "@vue/test-utils";
import ErrorMessage from "@/components/common/ErrorMessage";

test("ErrorMessage component can render correctly", () => {
  const errorMessage = "Error occurs!";
  const wrapper = shallowMount(ErrorMessage, {
    slots: {
      default: errorMessage,
    },
  });
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find("h3").text()).toContain(errorMessage);
});
