import axios from "../../settings";
import {
  ADD_COMMENT,
  FETCH_COMMENTS,
  FETCH_REPLIES,
  FETCH_COMMENTS_DISABLED,
  CATCH_COMMENT_ERROR,
} from "../types";
import parseError from "../helpers/parseError";

const state = {
  commentsDisabled: false, // If comment is disabled under the video
  comments: null, // The comments under the video
  replies: null, // The replies under a comment thread
  myComments: [], // The comments published by authsed user
  commentError: null,
};

const getters = {
  commentErrorMessage: (state) =>
    parseError(state.commentError, "Failed to fetch comments"),
};

const mutations = {
  FETCH_COMMENTS: (state, payload) => {
    state.comments = payload;
    state.commentError = null;
  },
  FETCH_REPLIES: (state, payload) => {
    state.replies = payload;
    state.commentError = null;
  },
  FETCH_COMMENTS_DISABLED: (state) => {
    state.commentsDisabled = true;
    state.commentsError = null;
  },
  ADD_COMMENT: (state, payload) => {
    state.myComments = [...state.myComments, payload];
  },
  CATCH_COMMENT_ERROR: (state, payload) => {
    state.commentError = payload;
  },
};

const actions = {
  /** Fetch the comments under a particular video */
  fetchComments: async (
    context,
    [videoId, pageToken = null, order = "relevance"]
  ) => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const response = await axios.get("/commentThreads", {
        headers: {
          Authorization: accessToken,
        },
        params: {
          ...axios.defaults.params,
          part: "snippet",
          videoId,
          maxResults: 12,
          pageToken,
          order: order === "relevance" ? "relevance" : "time",
        },
      });
      context.commit(FETCH_COMMENTS, response.data);
    } catch (err) {
      if (err.response.data.error.errors[0].reason === "commentsDisabled") {
        context.commit(FETCH_COMMENTS_DISABLED);
      } else {
        context.commit(CATCH_COMMENT_ERROR, err);
      }
    }
  },

  /** Add a comment */
  addComment: async (context, [channelId, videoId, commentText]) => {
    try {
      const accessToken = localStorage.getItem("access_token");
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
      const response = await axios.post("/commentThreads", requestBody, {
        headers: {
          Authorization: accessToken,
        },
        params: {
          ...axios.defaults.params,
          part: "snippet",
        },
      });
      context.commit(ADD_COMMENT, response.data);
    } catch (err) {
      context.commit(CATCH_COMMENT_ERROR, err);
    }
  },

  /** Fetch replies under a particular comment */
  fetchReplies: async (context, [commentId, pageToken]) => {
    try {
      const response = await axios.get("/comments", {
        params: {
          ...axios.defaults.params,
          part: "snippet",
          parentId: commentId,
          maxResults: 12,
          pageToken,
        },
      });
      context.commit(FETCH_REPLIES, response.data);
    } catch (err) {
      context.commit(CATCH_COMMENT_ERROR, err);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
