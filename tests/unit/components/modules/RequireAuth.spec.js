import { shallowMount } from "@vue/test-utils";
import RequireAuth from "@/components/modules/RequireAuth";
import googleAuth from "@/mixins/googleAuth";

jest.mock("@/mixins/googleAuth");

describe("Test RequireAuth component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(RequireAuth);
  });
  afterEach(() => {
    wrapper.destroy();
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render require signin information", () => {
    expect(wrapper.text()).toContain("You have not signed in");
  });

  it("should render Sign in button", () => {
    expect(wrapper.find("button").text()).toContain("Sign in");
  });

  it("clicking sign in button should call sign in method", () => {
    wrapper.find("button").trigger("click");
    expect(googleAuth.methods.handleGoogleSignin).toHaveBeenCalled();
  });
});
