import { shallowMount } from "@vue/test-utils";
import InfoMessage from "@/components/common/InfoMessage";

test("InfoMessage component can render correctly", () => {
  const infoMessage = "Some infomation";
  const wrapper = shallowMount(InfoMessage, {
    slots: {
      default: infoMessage,
    },
  });
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find("h3").text()).toContain(infoMessage);
});
