import { shallowMount } from "@vue/test-utils";
import PageTitle from "@/components/common/PageTitle";

test("PageTitle component can render correctly", () => {
  const title = "Title";
  const wrapper = shallowMount(PageTitle, {
    slots: {
      default: title,
    },
  });
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find("h2").text()).toContain(title);
});
