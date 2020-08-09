import { shallowMount, createLocalVue } from "@vue/test-utils";
import CommentItem from "@/components/modules/CommentItem";
import {
  commentsResponse,
  repliesResponse,
} from "../../store/fixtures/comment";
import date from "@/filters/date";

describe("Test CommentItem component", () => {
  const localVue = createLocalVue();
  localVue.filter("date", date);

  it("should render correct comment", () => {
    const comment = commentsResponse.items[0];
    const wrapper = shallowMount(CommentItem, {
      localVue,
      propsData: {
        comment,
        reply: null,
      },
    });
    expect(wrapper.find("img").attributes("src")).toBe(
      comment.snippet.topLevelComment.snippet.authorProfileImageUrl
    );
  });

  it("should render correct reply", () => {
    const reply = repliesResponse.items[0];
    const wrapper = shallowMount(CommentItem, {
      localVue,
      propsData: {
        comment: null,
        reply,
      },
    });
    expect(wrapper.find("img").attributes("src")).toBe(
      reply.snippet.authorProfileImageUrl
    );
  });
});
