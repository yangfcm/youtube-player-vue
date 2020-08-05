import { shallowMount } from "@vue/test-utils";
import ChannelGrid from "@/components/modules/ChannelGrid.vue";
import ChannelGridItem from "@/components/modules/ChannelGridItem.vue";
import InfoMessage from "@/components/common/InfoMessage.vue";
import {
  myChannelsResponse,
  myChannelsEmptyResponse,
} from "../../store/fixtures/channel";

describe("Test ChannelGrid component", () => {
  it("should render information if no channel is subscribed", () => {
    const wrapper = shallowMount(ChannelGrid, {
      propsData: {
        channels: myChannelsEmptyResponse.items,
      },
    });
    expect(wrapper.findComponent(InfoMessage).exists()).toBe(true);
    expect(wrapper.findComponent(InfoMessage).text()).toContain(
      "You haven't subscribed any channels"
    );
    expect(wrapper.findComponent(ChannelGridItem).exists()).toBe(false);
    wrapper.destroy();
  });

  it("should render correct numbers of ChannelGridItem components if there are channels subscribed", () => {
    const wrapper = shallowMount(ChannelGrid, {
      propsData: {
        channels: myChannelsResponse.items,
      },
    });
    expect(wrapper.findComponent(InfoMessage).exists()).toBe(false);
    expect(wrapper.findAllComponents(ChannelGridItem).length).toBe(
      myChannelsResponse.items.length
    );
    wrapper.destroy();
  });
});
