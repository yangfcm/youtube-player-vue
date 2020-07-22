import searchStore from "@/store/modules/search";
import axios from "@/settings";
import { SEARCH, CATCH_SEARCH_ERROR } from "@/store/types";
import {
  keyword,
  searchResultResponse,
  searchErrorResponse,
} from "../fixtures/search";

describe("Test store for search module", () => {
  const { getters, mutations, actions } = searchStore;

  it("searchErrorMessage getter should parse standard error response returned from API", () => {
    const state = { searchError: searchErrorResponse };
    const result = getters.searchErrorMessage(state);
    expect(result).toBe(searchErrorResponse.response.data.error.message);
  });

  it("searchErrorMessage getter should parse standard JS error object", () => {
    const errorMsg = "mock error message";
    const state = { searchError: { message: errorMsg } };
    const result = getters.searchErrorMessage(state);
    expect(result).toBe(errorMsg);
  });

  it("searchErrorMessage getter should parse any other error", () => {
    const state = { searchError: "error" };
    const result = getters.searchErrorMessage(state);
    expect(result).toBe("Failed to proceed searching");
  });

  it("searchErrorMessage getter returns empty string if no error", () => {
    const state = { searchError: null };
    const result = getters.searchErrorMessage(state);
    expect(result).toBe("");
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
      CATCH_SEARCH_ERROR,
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
    mutations.CATCH_SEARCH_ERROR(state, searchErrorResponse);
    expect(state.searchError).toEqual(searchErrorResponse);
  });
});
