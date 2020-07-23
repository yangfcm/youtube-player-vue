import { mount, RouterLinkStub, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import Header from "@/components/layout/Header.vue";
import Dropdown from "@/components/common/Dropdown.vue";
import { userResponse as user } from "../../store/fixtures/auth";
import googleAuth from "@/mixins/googleAuth";

jest.mock("@/mixins/googleAuth");

describe("Test Header component", () => {
  let headerWrapper, authedHeaderWrapper;
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  const router = new VueRouter();

  beforeEach(() => {
    headerWrapper = mount(Header, {
      mocks: {
        $store: {
          getters: {
            user: {},
            signedIn: false,
          },
        },
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
      localVue,
      router,
    });

    authedHeaderWrapper = mount(Header, {
      mocks: {
        $store: {
          getters: {
            user,
            signedIn: true,
          },
        },
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
  });
  afterEach(() => {
    headerWrapper.destroy();
    authedHeaderWrapper.destroy();
  });

  it("should render Header component correctly", () => {
    expect(headerWrapper).toMatchSnapshot();
    expect(authedHeaderWrapper).toMatchSnapshot();
  });

  it("Header link should navigate to homepage", () => {
    expect(headerWrapper.findComponent(RouterLinkStub).props().to).toBe("/");
    expect(authedHeaderWrapper.findComponent(RouterLinkStub).props().to).toBe(
      "/"
    );
  });

  it("Header should have sign in button, but not have avatar image", () => {
    expect(headerWrapper.find("button").exists()).toBe(true);
    expect(headerWrapper.find("button").text()).toContain("Sign In");
    expect(headerWrapper.find("img").exists()).toBe(false);
  });

  it("Authed Header should have avatar image, but no sign in button", () => {
    expect(authedHeaderWrapper.find("button").exists()).toBe(false);
    expect(authedHeaderWrapper.find("img").exists()).toBe(true);
  });

  it("Click sign in button can call handleSignin", () => {
    headerWrapper.find("button").trigger("click");
    // const mockTest = jest.spyOn(headerWrapper.vm, "handleSignin");
    // expect(mockTest).toHaveBeenCalled();
    // It doesn't work so I use the approach below.
    expect(googleAuth.methods.handleGoogleSignin).toHaveBeenCalled();
  });

  it("Click user avatar can open dropdown and click again can close dropdown", async () => {
    // Initial state
    expect(authedHeaderWrapper.vm.showDropdown).toBe(false);
    expect(authedHeaderWrapper.findComponent(Dropdown).exists()).toBe(false);
    // Click once, open dropdown
    await authedHeaderWrapper.find("img").trigger("click");
    expect(authedHeaderWrapper.vm.showDropdown).toBe(true);
    expect(authedHeaderWrapper.findComponent(Dropdown).exists()).toBe(true);

    // Click again, close dropdown
    await authedHeaderWrapper.find("img").trigger("click");
    expect(authedHeaderWrapper.vm.showDropdown).toBe(false);
    expect(authedHeaderWrapper.findComponent(Dropdown).exists()).toBe(false);
  });

  it("User input can change keyword", () => {
    headerWrapper.find("input").setValue("popular movie");
    expect(headerWrapper.vm.searchKeyword).toBe("popular movie");
  });

  it("Can navigate to search result page when user is searching", async () => {
    headerWrapper.find("input").setValue("舌尖上的中国");
    const spy = jest.spyOn(headerWrapper.vm.$router, "push");
    await headerWrapper.find("i.search").trigger("click");
    expect(spy).toHaveBeenCalledWith("/search/舌尖上的中国");
  });
});
