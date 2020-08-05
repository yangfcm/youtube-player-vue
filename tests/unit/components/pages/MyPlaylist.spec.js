import { shallowMount } from "@vue/test-utils";
import MyPlaylist from "@/components/pages/MyPlaylist";
import RequireAuth from "@/components/modules/RequireAuth";
import MyPlaylistContent from "@/components/modules/MyPlaylistContent";

describe("Test MyPlaylist page", () => {
  test("should show RequireAuth component if user does not log in", () => {
    const $store = {
      getters: {
        signedIn: false,
      },
    };
    const wrapper = shallowMount(MyPlaylist, {
      mocks: {
        $store,
      },
    });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.findComponent(RequireAuth).exists()).toBe(true);
    expect(wrapper.findComponent(MyPlaylistContent).exists()).toBe(false);
  });

  test("should show MyPlaylistContent component if user logs in", () => {
    const $store = {
      getters: {
        signedIn: true,
      },
    };
    const wrapper = shallowMount(MyPlaylist, {
      mocks: {
        $store,
      },
    });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.findComponent(RequireAuth).exists()).toBe(false);
    expect(wrapper.findComponent(MyPlaylistContent).exists()).toBe(true);
  });
});
