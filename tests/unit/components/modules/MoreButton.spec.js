import { shallowMount } from "@vue/test-utils";
import MoreButton from "@/components/modules/MoreButton.vue";

describe("Test MoreButton component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(MoreButton, {
      slots: {
        default: "more",
      },
    });
  });
  afterEach(() => {
    wrapper.destroy();
  });
  it("should not render 'more' button if nextPageToken does not exist", async () => {
    wrapper.setProps({
      nextPageToken: null,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.find("button").exists()).toBe(false);
  });

  it('should render "more" button if nextPageToken exists', async () => {
    wrapper.setProps({
      nextPageToken: "token",
      isLoadingMore: false,
    });
    await wrapper.vm.$nextTick();
    const moreButton = wrapper.find("button");
    expect(moreButton.exists()).toBe(true);
    expect(moreButton.text()).toBe("more");
    expect(wrapper.find("button").attributes("disabled")).toBeFalsy();
  });

  it("should emit event when 'more' button is clicked", async () => {
    wrapper.setProps({
      nextPageToken: "token",
    });
    await wrapper.vm.$nextTick();
    wrapper.vm.$emit("onClickMore", "token");
    wrapper.find("button").trigger("click");
    expect(wrapper.emitted().onClickMore).toBeTruthy();
    expect(wrapper.emitted().onClickMore[1]).toEqual(["token"]);
  });

  it("should disable button", async () => {
    wrapper.setProps({
      nextPageToken: "token",
      isLoadingMore: true,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.find("button").attributes("disabled")).toBe("disabled");
  });
});
