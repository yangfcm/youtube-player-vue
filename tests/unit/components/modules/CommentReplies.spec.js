import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import CommentReplies from "@/components/modules/CommentReplies";
import MoreButton from "@/components/modules/MoreButton";
import Loader from "@/components/common/Loader";
import ErrorMessage from "@/components/common/ErrorMessage";
import CommentItem from "@/components/modules/CommentItem";
import {
  commentsResponse,
  repliesResponse,
} from "../../store/fixtures/comment";

const localVue = createLocalVue();
localVue.use(Vuex);
const actions = {
  fetchReplies: jest.fn(),
};
const commentHasReplies = commentsResponse.items.filter(
  (t) => t.snippet.totalReplyCount > 0
)[0];
const commentHasNoReplies = commentsResponse.items.filter(
  (t) => t.snippet.totalReplyCount === 0
)[0];

describe("Test CommentReplies component", () => {
  describe("when comment does not have replies", () => {
    const store = new Vuex.Store({
      state: {
        comment: {
          replies: null,
          commentError: null,
        },
      },
      getters: {
        commentErrorMessage: jest.fn(() => ""),
      },
      actions,
    });
    let wrapper;
    beforeEach(() => {
      wrapper = shallowMount(CommentReplies, {
        store,
        localVue,
        propsData: {
          commentItem: commentHasNoReplies,
        },
      });
    });
    afterEach(() => {
      wrapper.destroy();
    });

    it("should render nothing if the comment has no replies", () => {
      expect(wrapper.find("#app-comment-replies").exists()).toBeFalsy();
    });
  });

  describe("when comment has replies", () => {
    const store = new Vuex.Store({
      state: {
        comment: {
          replies: null,
          commentError: null,
        },
      },
      getters: {
        commentErrorMessage: jest.fn(() => ""),
      },
      actions,
    });
    let wrapper;
    beforeEach(() => {
      wrapper = shallowMount(CommentReplies, {
        store,
        localVue,
        propsData: {
          commentItem: commentHasReplies,
        },
      });
    });
    afterEach(() => {
      wrapper.destroy();
    });

    it("should render component if comment has replies", () => {
      expect(wrapper.find("#app-comment-replies").exists()).toBe(true);
    });

    it("should display how many replies for this comment", () => {
      const linkComp = wrapper.find("a");
      expect(linkComp.text()).toContain(
        commentHasReplies.snippet.totalReplyCount
      );
      expect(linkComp.text()).toContain("Show");
    });

    it("should not display replies section", () => {
      const repliesComp = wrapper.find("#app-replies-list");
      expect(repliesComp.exists()).toBe(false);
    });

    it("click show replies link should display replies section", async () => {
      const linkComp = wrapper.find("a");
      await linkComp.trigger("click");
      expect(linkComp.text()).toContain("Hide");
      expect(wrapper.find("#app-replies-list").exists()).toBe(true);
    });

    it("should render Loader component and call fetchReplies action", async () => {
      const linkComp = wrapper.find("a");
      await linkComp.trigger("click");
      expect(wrapper.findComponent(Loader).exists()).toBe(true);
      expect(wrapper.findComponent(CommentItem).exists()).toBe(false);
      expect(actions.fetchReplies).toHaveBeenCalled();
    });
  });

  describe("When replies are successfully fetched", () => {
    const store = new Vuex.Store({
      state: {
        comment: {
          replies: repliesResponse,
          commentError: null,
        },
      },
      getters: {
        commentErrorMessage: jest.fn(() => ""),
      },
      actions,
    });
    let wrapper;
    beforeEach(() => {
      wrapper = shallowMount(CommentReplies, {
        store,
        localVue,
        propsData: {
          commentItem: commentHasReplies,
        },
      });
    });
    afterEach(() => {
      wrapper.destroy();
    });

    it("should render correct number of CommentItem components", async () => {
      await wrapper.find("a").trigger("click");
      expect(actions.fetchReplies).toHaveBeenCalled();
      await wrapper.setData({ replies: repliesResponse.items });
      expect(wrapper.find("#app-replies-list-items").exists()).toBe(true);
      expect(wrapper.findAllComponents(CommentItem).length).toBe(
        repliesResponse.items.length
      );
    });
  });
});
