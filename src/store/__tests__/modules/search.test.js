import searchStore from "../../modules/search";
import axios from "../../../settings";
import { SEARCH, CATCH_ERROR } from "../../types";
import {
  keyword,
  searchResultResponse,
  searchErrorResponse,
} from "../fixtures/search";
import search from "../../modules/search";

describe("Test store for search module", () => {
  const { getters, mutations, actions } = searchStore;

  it("error getter should parse standard error response returned from API", () => {
    const state = { searchError: searchErrorResponse };
    const result = getters.searchError(state);
    expect(result).toEqual({
      code: searchErrorResponse.response.data.error.code,
      message: searchErrorResponse.response.data.error.message,
    });
  });

  it("error getter should parse standard JS error object", () => {
    const errorMsg = "mock error message";
    const state = { searchError: { message: errorMsg } };
    const result = getters.searchError(state);
    expect(result).toEqual({ message: errorMsg });
  });

  it("error getter should parse any other error", () => {
    const state = { searchError: "error" };
    const result = getters.searchError(state);
    expect(result).toEqual({
      message: "Failed to proceed searching",
    });
  });

  it("error getter returns null if no error", () => {
    const state = { searchError: null };
    const result = getters.searchError(state);
    expect(result).toBeFalsy();
  });

  it("searchResults getter should return searchResults state", () => {
    const state = { searchResults: searchResultResponse };
    const result = getters.searchResults(state);
    expect(result).toEqual(searchResultResponse);
  });

  it("search action can search results and commit", async () => {
    const context = {
      commit: jest.fn(),
    };
    axios.get.mockResolvedValue({
      data: searchResultResponse,
    });
    await actions.search(context, keyword, null);
    expect(axios.get).toHaveBeenCalledWith("/search", {
      params: {
        ...axios.defaults.params,
        q: keyword,
        part: "snippet",
        maxResults: 15,
        pageToken: null,
      },
    });
    expect(context.commit).toHaveBeenCalledWith(SEARCH, searchResultResponse);
  });

  it("search action can handle error", async () => {
    const context = {
      commit: jest.fn(),
    };
    axios.get.mockRejectedValue(searchErrorResponse);
    await actions.search(context, keyword, null);
    expect(context.commit).toHaveBeenCalledWith(
      CATCH_ERROR,
      searchErrorResponse
    );
  });

  it("mutations for search action can work", () => {
    const state = {
      searchResults: null,
      searchError: "some error",
    };
    mutations.SEARCH(state, searchResultResponse);
    expect(state.searchResults).toEqual(searchResultResponse);
    expect(state.searchError).toBe(null);
  });

  it("mutations for catchError action can work", () => {
    const state = {
      searchResults: null,
      searchError: null,
    };
    mutations.CATCH_ERROR(state, searchErrorResponse);
    expect(state.searchError).toEqual(searchErrorResponse);
  });
});
