import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";
import Comments from "@/components/modules/Comments";
import Loader from "@/components/common/Loader";
import ErrorMessage from "@/components/common/ErrorMessage";
import InfoMessage from "@/components/common/InfoMessage";
import CommentItem from "@/components/modules/CommentItem";
import MoreButton from "@/components/modules/MoreButton";
import CommentReplies from "@/components/modules/CommentReplies";
import CommentForm from "@/components/modules/CommentForm";
import {
  addedCommentResponse,
  commentsResponse,
} from "../../store/fixtures/comment";

const localVue = createLocalVue();
localVue.use(Vuex);
const actions = {
  fetchComments: jest.fn(),
};
const { videoId, channelId } = addedCommentResponse.snippet;

describe("Test Comments component", () => {
  describe("when components is initially rendered", () => {
    const store = new Vuex.Store({
      state: {
        comment: {
          comments: null,
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
      wrapper = shallowMount(Comments, {
        store,
        localVue,
      });
    });
    afterEach(() => {
      wrapper.destroy();
    });

    it("should render Loader and call fetchComments action", () => {
      expect(wrapper.findComponent(Loader).exists()).toBe(true);
      expect(wrapper.findComponent(ErrorMessage).exists()).toBe(false);
      expect(wrapper.find("div#app-comments").exists()).toBe(false);
      expect(actions.fetchComments).toHaveBeenCalled();
    });
  });

  describe("when error occurs", () => {
    const errorMessage = "mock error message";
    const store = new Vuex.Store({
      state: {
        comment: {
          comments: null,
          commentError: { message: errorMessage },
        },
      },
      getters: {
        commentErrorMessage: jest.fn(() => errorMessage),
      },
      actions,
    });
    let wrapper;
    beforeEach(() => {
      wrapper = shallowMount(Comments, {
        store,
        localVue,
        propsData: {
          channelId,
          videoId,
        },
      });
    });
    afterEach(() => {
      wrapper.destroy();
    });

    it("should render ErrorMessage component", () => {
      expect(wrapper.findComponent(Loader).exists()).toBe(false);
      expect(wrapper.findComponent(ErrorMessage).exists()).toBe(true);
      expect(wrapper.find("div#app-comments").exists()).toBe(false);
      expect(wrapper.text()).toContain(errorMessage);
    });
  });

  describe("when comment is disabled", () => {
    const store = new Vuex.Store({
      state: {
        comment: {
          comments: null,
          commentsDisabled: true,
        },
      },
      getters: {
        commentErrorMessage: jest.fn(() => ""),
      },
      actions,
    });
    let wrapper;
    beforeEach(() => {
      wrapper = shallowMount(Comments, {
        store,
        localVue,
        propsData: {
          channelId,
          videoId,
        },
      });
    });
    afterEach(() => {
      wrapper.destroy();
    });

    it("should render InfoMessage component", () => {
      expect(wrapper.findComponent(Loader).exists()).toBe(false);
      expect(wrapper.findComponent(ErrorMessage).exists()).toBe(false);
      expect(wrapper.findComponent(InfoMessage).exists()).toBe(true);
      expect(wrapper.find("div#app-comments").exists()).toBe(false);
      expect(wrapper.text()).toContain("Comment is disabled");
    });
  });

  describe("When comments are successfully fetched", () => {
    const store = new Vuex.Store({
      state: {
        comment: {
          comments: commentsResponse,
          commentsDisabled: false,
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
      wrapper = shallowMount(Comments, {
        store,
        localVue,
        propsData: {
          channelId,
          videoId,
        },
      });
    });
    afterEach(() => {
      wrapper.destroy();
    });

    it("should render comments block", () => {
      expect(wrapper.findComponent(Loader).exists()).toBe(false);
      expect(wrapper.findComponent(ErrorMessage).exists()).toBe(false);
      expect(wrapper.findComponent(InfoMessage).exists()).toBe(false);
      expect(wrapper.find("div#app-comments").exists()).toBe(true);
    });
    it("should render title with correct text", () => {
      const title = wrapper.find("h3");
      expect(title.text()).toContain("Comments");
    });
    it("should render CommentForm and pass videoId and channelId props to it", () => {
      const commentFormComp = wrapper.findComponent(CommentForm);
      expect(commentFormComp.exists()).toBe(true);
      expect(commentFormComp.props("videoId")).toBe(videoId);
      expect(commentFormComp.props("channelId")).toBe(channelId);
    });

    it("should render correct number of CommentItem component", () => {
      const commentItemsComp = wrapper.findAllComponents(CommentItem);
      expect(commentItemsComp.length).toBe(commentsResponse.items.length);
    });
    it("should render correct number of CommentReplies component", () => {
      const commentRepliesItem = wrapper.findAllComponents(CommentReplies);
      expect(commentRepliesItem.length).toBe(commentsResponse.items.length);
    });
    it("should pass comment to CommentItem component as props", () => {
      const commentItemComp = wrapper.findComponent(CommentItem);
      expect(commentItemComp.props("comment")).toEqual(
        commentsResponse.items[0]
      );
    });
    it("should pass comment to CommentReplies component as props", () => {
      const commentRepliesItem = wrapper.findComponent(CommentReplies);
      expect(commentRepliesItem.props("commentItem")).toEqual(
        commentsResponse.items[0]
      );
    });
    it("should render MoreButton component and can click it", () => {
      const moreButtonComp = wrapper.findComponent(MoreButton);
      expect(moreButtonComp.exists()).toBe(true);
      expect(moreButtonComp.text()).toContain("More comments");
      expect(moreButtonComp.props("nextPageToken")).toBe(
        commentsResponse.nextPageToken
      );
      expect(moreButtonComp.props("isLoadingMore")).toBe(false);
      moreButtonComp.trigger("click");
      expect(actions.fetchComments).toHaveBeenCalled();
    });
  });
});
