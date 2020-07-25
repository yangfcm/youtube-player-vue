<template>
  <div>
    <app-blank></app-blank>
    <app-loader v-if="!error && !searchResults"></app-loader>
    <app-error-message v-if="error">{{ error }}</app-error-message>
    <div v-if="!error&&searchResults" class="app-container">
      <h2 class="ui header">
        Search result with keyword:
        <span class="ui header red">{{keyword}}</span>
      </h2>
      <app-info-message
        v-if="!searchResults.items || searchResults.items.length === 0"
      >There is no matched result</app-info-message>
      <div v-else>
        <app-result-item v-for="(item, index) in searchResults.items" :key="index" :item="item"></app-result-item>
        <app-blank></app-blank>
        <app-more-button
          :nextPageToken="searchResults.nextPageToken"
          :isLoadingMore="isLoadingMore"
          @onClickMore="handleMore($event)"
        >More search results</app-more-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import Blank from "../common/Blank";
import Loader from "../common/Loader";
import ErrorMessage from "../common/ErrorMessage";
import InfoMessage from "../common/InfoMessage";
import ResultItem from "../modules/ResultItem";
import MoreButton from "../modules/MoreButton";

export default {
  components: {
    appBlank: Blank,
    appLoader: Loader,
    appErrorMessage: ErrorMessage,
    appInfoMessage: InfoMessage,
    appMoreButton: MoreButton,
    appResultItem: ResultItem,
  },
  data: function () {
    return {
      error: "",
      searchResults: null,
      isLoadingMore: false,
    };
  },
  computed: {
    ...mapState(["search"]),
    ...mapGetters(["searchErrorMessage"]),
    keyword() {
      return this.$route.params.keyword;
    },
  },
  watch: {
    keyword(value) {
      this.searchResults = null;
      this.error = "";
      this.handleSearchVideos(value);
    },
  },
  methods: {
    ...mapActions(["searchVideos"]),
    async handleMore($event) {
      if (this.isLoadingMore) return;
      this.isLoadingMore = true;
      const nextPageToken = $event;
      await this.handleSearchVideos(this.keyword, nextPageToken);
      if (this.search.searchError) {
        this.error = this.searchErrorMessage;
      } else if (this.search.searchResults) {
        this.searchResults = {
          ...this.searchResults,
          items: this.searchResults.items.concat(
            this.search.searchResults.items
          ),
          nextPageToken: this.search.searchResults.nextPageToken,
        };
        this.error = "";
      }
      this.isLoadingMore = false;
    },
    async handleSearchVideos(keyword, pageToken = null) {
      await this.searchVideos([{ q: keyword }, pageToken]);
      if (this.search.searchError) {
        this.error = this.searchErrorMessage;
      } else if (this.search.searchResults) {
        this.searchResults = this.search.searchResults;
        this.error = "";
      }
    },
  },
  created() {
    this.handleSearchVideos(this.keyword);
  },
};
</script>

<style scoped>
.app-container {
  max-width: 990px;
  margin: 0 auto;
}
</style>
