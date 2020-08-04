import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import ChannelMenu from "@/components/layout/ChannelMenu.vue";

describe("Test ChannelMenu component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(ChannelMenu, {
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("ChannelMenu component matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("component should render three links", () => {
    const links = wrapper.findAll("a");
    expect(links.length).toBe(3);
  });
});
