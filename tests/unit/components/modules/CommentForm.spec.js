import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import CommentForm from "@/components/modules/CommentForm";
import { addedCommentResponse } from "../../store/fixtures/comment";

describe("Test Comment Form", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const actions = {
    addComment: jest.fn(() => {}),
  };
  describe("When user is not logged in", () => {
    const store = new Vuex.Store({
      state: {
        auth: {
          user: {},
        },
      },
      getters: {
        commentErrorMessage: jest.fn(() => ""),
        signedIn: jest.fn(() => false),
      },
    });
    let wrapper;
    beforeEach(() => {
      wrapper = shallowMount(CommentForm, { store, localVue });
    });
    afterEach(() => {
      wrapper.destroy();
    });

    it("should not render CommentForm if user not logged in", () => {
      expect(wrapper.find("div.form").exists()).toBe(false);
    });
  });

  describe("When user logged in", () => {
    const store = new Vuex.Store({
      state: {
        comment: {
          addedComment: addedCommentResponse,
        },
      },
      getters: {
        signedIn: jest.fn(() => true),
        commentErrorMessage: jest.fn(() => ""),
      },
      actions,
    });
    let wrapper;

    beforeEach(() => {
      wrapper = shallowMount(CommentForm, {
        store,
        localVue,
        propsData: {
          channelId: "comment-channel-id",
          videoId: "comment-video-id",
        },
      });
    });
    afterEach(() => {
      wrapper.destroy();
    });

    it("should render comment form", () => {
      expect(wrapper.find("textarea").exists()).toBe(true);
      expect(wrapper.find("button").text()).toContain("Submit");
    });

    it("submit button should be disabled if no comment is input", () => {
      const textarea = wrapper.find("textarea");
      textarea.setValue("");
      expect(wrapper.find("button").attributes("disabled")).toBe("disabled");
    });

    it("should call addComment action when submit button is clicked", async () => {
      const commentText =
        addedCommentResponse.snippet.topLevelComment.snippet.textDisplay;
      const submitBtn = wrapper.find("button");
      const textarea = wrapper.find("textarea");
      wrapper.vm.$emit("commentAdded", addedCommentResponse);
      await textarea.setValue(commentText);
      expect(submitBtn.attributes("disabled")).toBeFalsy();
      submitBtn.trigger("click");
      expect(actions.addComment).toHaveBeenCalled();
      expect(wrapper.emitted().commentAdded).toBeTruthy();
      expect(wrapper.emitted().commentAdded[0]).toEqual([addedCommentResponse]);
    });
  });
});
