import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import Menu from "@/components/layout/Menu.vue";

test("Menu component can render correctly", () => {
  const wrapper = shallowMount(Menu, {
    stubs: {
      RouterLink: RouterLinkStub,
    },
  });
  expect(wrapper).toMatchSnapshot();
});
