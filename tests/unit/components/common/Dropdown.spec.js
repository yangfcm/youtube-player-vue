import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import Dropdown from "@/components/common/Dropdown.vue";
import googleAuth from "@/mixins/googleAuth";

jest.mock("@/mixins/googleAuth");

describe("Test Dropdown component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Dropdown, {
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
  });
  afterEach(() => {
    wrapper.destroy();
  });

  it("Dropdown component matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Click sign out button can call handleSignout", () => {
    wrapper.find("a.app-signout-btn").trigger("click");
    expect(googleAuth.methods.handleGoogleSignout).toHaveBeenCalled();
  });
});
