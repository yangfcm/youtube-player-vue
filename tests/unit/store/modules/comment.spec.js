import commentStore from "@/store/modules/comment";
import axios from "@/settings";
import {
  ADD_COMMENT,
  FETCH_COMMENTS,
  FETCH_REPLIES,
  FETCH_COMMENTS_DISABLED,
  CATCH_COMMENT_ERROR,
} from "@/store/types";
import {
  videoId,
  commentId,
  channelId,
  commentsResponse,
  repliesResponse,
  commentErrorResponse,
  addedCommentResponse,
  commentDisabledErrorResponse,
} from "../fixtures/comment";

describe("Test store for comment module", () => {
  let accessToken;
  let context;
  const { getters, mutations, actions } = commentStore;

  beforeEach(() => {
    accessToken = "mock_access_token";
    Object.defineProperty(global, "localStorage", {
      value: {
        getItem: jest.fn(() => accessToken),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });
    localStorage.setItem("access_token", accessToken);
    context = {
      commit: jest.fn(),
    };
  });

  it("commentErrorMessage getter should parse standard error response", () => {
    const state = { commentError: commentErrorResponse };
    const result = getters.commentErrorMessage(state);
    expect(result).toBe(state.commentError.response.data.error.message);
  });
  it("commentErrorMessage get should parse standard JS error object", () => {
    const errorMsg = "mock comment error message";
    const state = { commentError: { message: errorMsg } };
    const result = getters.commentErrorMessage(state);
    expect(result).toBe(errorMsg);
  });
  it("commentErrorMessage getter should parse any other error", () => {
    const state = { commentError: "error" };
    const result = getters.commentErrorMessage(state);
    expect(result).toBe("Failed to fetch comments");
  });
  it("commentErrorMessge getter should return empty string if no error", () => {
    const state = { commentError: null };
    const result = getters.commentErrorMessage(state);
    expect(result).toBe("");
  });

  it("fetchComments action can fetch comments under a particular video", async () => {
    axios.get.mockResolvedValue({
      data: commentsResponse,
    });
    await actions.fetchComments(context, videoId, null);
    expect(axios.get).toHaveBeenCalledWith("/commentThreads", {
      headers: {
        Authorization: accessToken,
      },
      params: {
        ...axios.defaults.params,
        part: "snippet",
        videoId,
        maxResults: 12,
        pageToken: null,
        order: "relevance",
      },
    });
    expect(context.commit).toHaveBeenCalledWith(
      FETCH_COMMENTS,
      commentsResponse
    );
  });
  it("fetchComments can handle error", async () => {
    axios.get.mockRejectedValue(commentErrorResponse);
    await actions.fetchComments(context, videoId, null);
    expect(context.commit).toHaveBeenCalledWith(
      CATCH_COMMENT_ERROR,
      commentErrorResponse
    );
  });
  it("fetchComments can handle commentsDisabled error", async () => {
    axios.get.mockRejectedValue(commentDisabledErrorResponse);
    await actions.fetchComments(context, videoId, null);
    expect(context.commit).toHaveBeenCalledWith(FETCH_COMMENTS_DISABLED);
  });

  it("addComment action can add a comment to a particular video", async () => {
    const commentText = "good talk!";
    const requestBody = {
      snippet: {
        channelId,
        videoId,
        topLevelComment: {
          snippet: {
            textOriginal: commentText,
          },
        },
      },
    };
    axios.post.mockResolvedValue({ data: addedCommentResponse });
    await actions.addComment(context, channelId, videoId, commentText);
    expect(axios.post).toHaveBeenCalledWith("/commentThreads", requestBody, {
      headers: {
        Authorization: accessToken,
      },
      params: {
        ...axios.defaults.params,
        part: "snippet",
      },
    });
    expect(context.commit).toHaveBeenCalledWith(
      ADD_COMMENT,
      addedCommentResponse
    );
  });
  it("addComment action can handle error", async () => {
    const commentText = "good talk!";
    axios.post.mockRejectedValue(commentErrorResponse);
    await actions.addComment(context, channelId, videoId, commentText);
    expect(context.commit).toHaveBeenCalledWith(
      CATCH_COMMENT_ERROR,
      commentErrorResponse
    );
  });

  it("fetchReplies action can fetch replies for a particular comment", async () => {
    axios.get.mockResolvedValue({
      data: repliesResponse,
    });
    await actions.fetchReplies(context, commentId, null);
    expect(axios.get).toHaveBeenCalledWith("/comments", {
      params: {
        ...axios.defaults.params,
        part: "snippet",
        parentId: commentId,
        maxResults: 12,
        pageToken: null,
      },
    });
    expect(context.commit).toHaveBeenCalledWith(FETCH_REPLIES, repliesResponse);
  });
  it("fetchReplies action can handle error", async () => {
    axios.get.mockRejectedValue(commentErrorResponse);
    await actions.fetchReplies(context, commentId, null);
    expect(context.commit).toHaveBeenCalledWith(
      CATCH_COMMENT_ERROR,
      commentErrorResponse
    );
  });
  it("mutations for fetchComments action can change state", () => {
    const state = {
      comments: null,
      commentError: "any error",
    };
    mutations.FETCH_COMMENTS(state, commentsResponse);
    expect(state.comments).toEqual(commentsResponse);
    expect(state.commentError).toBe(null);
  });
  it("mutations can change commentsDisabled state to true if commentsDisabled error gets throwed", () => {
    const state = {
      commentsDisabled: false,
    };
    mutations.FETCH_COMMENTS_DISABLED(state);
    expect(state.commentsDisabled).toBe(true);
    expect(state.commentsError).toBe(null);
  });
  it("mutations for addComment action can change state", () => {
    const state = {
      myComments: [],
    };
    mutations.ADD_COMMENT(state, addedCommentResponse);
    expect(state.myComments).toEqual([addedCommentResponse]);
  });
  it("mutations for fetchReplies action can change state", () => {
    const state = {
      replies: null,
      commentError: "any error",
    };
    mutations.FETCH_REPLIES(state, repliesResponse);
    expect(state.replies).toEqual(repliesResponse);
    expect(state.commentError).toBe(null);
  });
  it("mutations for catchError action can change state", () => {
    const state = {
      commentError: null,
    };
    mutations.CATCH_COMMENT_ERROR(state, commentErrorResponse);
    expect(state.commentError).toEqual(commentErrorResponse);
  });
});
