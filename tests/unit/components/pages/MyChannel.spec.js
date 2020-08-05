import { shallowMount } from "@vue/test-utils";
import MyChannel from "@/components/pages/MyChannel";
import RequireAuth from "@/components/modules/RequireAuth";
import MyChannelContent from "@/components/modules/MyChannelContent";

describe("Test MyChannel page", () => {
  test("should show RequireAuth component if user does not log in", () => {
    const $store = {
      getters: {
        signedIn: false,
      },
    };
    const wrapper = shallowMount(MyChannel, {
      mocks: {
        $store,
      },
    });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.findComponent(RequireAuth).exists()).toBe(true);
    expect(wrapper.findComponent(MyChannelContent).exists()).toBe(false);
  });

  test("should show MyChannelContent component if user logs in", () => {
    const $store = {
      getters: {
        signedIn: true,
      },
    };
    const wrapper = shallowMount(MyChannel, {
      mocks: {
        $store,
      },
    });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.findComponent(RequireAuth).exists()).toBe(false);
    expect(wrapper.findComponent(MyChannelContent).exists()).toBe(true);
  });
});
