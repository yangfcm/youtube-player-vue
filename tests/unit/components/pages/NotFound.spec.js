import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import NotFound from "@/components/pages/NotFound";

describe("Test not found page", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(NotFound, {
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
  });
  afterEach(() => {
    wrapper.destroy();
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should have back to home button", () => {
    expect(wrapper.find("a").props().to).toBe("/");
  });
});
