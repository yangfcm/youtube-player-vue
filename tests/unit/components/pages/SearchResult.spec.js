import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";
import { routes } from "@/router";
import SearchResult from "@/components/pages/SearchResult";
import Loader from "@/components/common/Loader";
import ErrorMessage from "@/components/common/ErrorMessage";
import InfoMessage from "@/components/common/InfoMessage";
import ResultItem from "@/components/modules/ResultItem";
import MoreButton from "@/components/modules/MoreButton";
import {
  searchResultResponse,
  searchResultEmptyResponse,
} from "../../store/fixtures/search";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
const router = new VueRouter({
  routes,
});
const actions = {
  searchVideos: jest.fn(),
};

describe("Test SearchResult page", () => {
  describe("Test SearchResultPage when page is initially rendered", () => {
    const store = new Vuex.Store({
      state: {
        search: {
          searchResults: null,
          searchError: null,
        },
      },
      getters: {
        searchErrorMessage: jest.fn(() => ""),
      },
      actions,
    });
    let wrapper;
    beforeEach(() => {
      wrapper = shallowMount(SearchResult, {
        store,
        localVue,
        router,
      });
    });
    afterEach(() => {
      wrapper.destroy();
    });
    it("should render Loader and call searchVideos action when component is initially loaded ", () => {
      expect(wrapper.findComponent(Loader).exists()).toBe(true);
      expect(wrapper.findComponent(ErrorMessage).exists()).toBe(false);
      expect(wrapper.find("div#app-search-result").exists()).toBe(false);
      expect(actions.searchVideos).toHaveBeenCalled();
    });
  });
  describe("Test SearchResult page when error occurs", () => {
    const errorMessage = "mock error message";
    const store = new Vuex.Store({
      state: {
        search: {
          searchResults: null,
          searchError: { message: errorMessage },
        },
      },
      getters: {
        searchErrorMessage: jest.fn(() => errorMessage),
      },
      actions,
    });
    let wrapper;
    beforeEach(() => {
      wrapper = shallowMount(SearchResult, {
        store,
        localVue,
        router,
      });
    });
    afterEach(() => {
      wrapper.destroy();
    });
    it("should render ErrorMessage component when error occurs", () => {
      expect(wrapper.findComponent(Loader).exists()).toBe(false);
      expect(wrapper.findComponent(ErrorMessage).exists()).toBe(true);
      expect(wrapper.find("div#app-search-result").exists()).toBe(false);
      expect(wrapper.text()).toContain(errorMessage);
    });
  });

  describe("Test SearchResult page when no matched result if found", () => {
    const store = new Vuex.Store({
      state: {
        search: {
          searchResults: searchResultEmptyResponse,
          searchError: null,
        },
      },
      getters: {
        searchErrorMessage: jest.fn(() => ""),
      },
      actions,
    });
    let wrapper;
    beforeEach(() => {
      wrapper = shallowMount(SearchResult, {
        store,
        localVue,
        router,
      });
    });
    afterEach(() => {
      wrapper.destroy();
    });
    it("should render content in SearchResult page", () => {
      expect(wrapper.findComponent(Loader).exists()).toBe(false);
      expect(wrapper.findComponent(ErrorMessage).exists()).toBe(false);
      expect(wrapper.find("div#app-search-result").exists()).toBe(true);
    });
    it("should render no matched result message", () => {
      expect(wrapper.findComponent(InfoMessage).text()).toContain(
        "There is no matched result"
      );
    });
  });

  describe("Test searchResult page when matched result if found", () => {
    const store = new Vuex.Store({
      state: {
        search: {
          searchResults: searchResultResponse,
          searchError: null,
        },
      },
      getters: {
        searchErrorMessage: jest.fn(() => ""),
      },
      actions,
    });
    let wrapper;
    beforeEach(() => {
      wrapper = shallowMount(SearchResult, {
        store,
        localVue,
        router,
      });
    });
    afterEach(() => {
      wrapper.destroy();
    });
    it("should render content in SearchResult page", () => {
      expect(wrapper.findComponent(Loader).exists()).toBe(false);
      expect(wrapper.findComponent(ErrorMessage).exists()).toBe(false);
      expect(wrapper.find("div#app-search-result").exists()).toBe(true);
    });
    it("should render correct number of ResultItem components", () => {
      const ResultItemComp = wrapper.findAllComponents(ResultItem);
      expect(ResultItemComp.length).toBe(searchResultResponse.items.length);
    });
    it("should render MoreButton component and pass correct props to it", () => {
      const moreButtonComp = wrapper.findComponent(MoreButton);
      expect(moreButtonComp.exists()).toBe(true);
      expect(moreButtonComp.text()).toContain("More search results");
      expect(moreButtonComp.props("nextPageToken")).toBe(
        searchResultResponse.nextPageToken
      );
      expect(moreButtonComp.props("isLoadingMore")).toBe(false);
    });
    it("should call handleMore when more button is clicked", () => {
      const moreButtonComp = wrapper.findComponent(MoreButton);
      moreButtonComp.trigger("click");
      expect(actions.searchVideos).toHaveBeenCalled();
    });
  });
});
