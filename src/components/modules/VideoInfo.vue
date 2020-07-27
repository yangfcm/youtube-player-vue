<template>
  <div>
    <app-blank></app-blank>
    <div class="ui unstackable items">
      <div class="item">
        <div class="content">
          <h2 class="ui blue header">
            {{ videoDetail.snippet.title }}
          </h2>
          <div style="margin-bottom: 8px;"></div>
          <router-link :to="`/channel/${videoDetail.snippet.channelId}`">
            {{ videoDetail.snippet.channelTitle }}
          </router-link>
          <div style="margin-bottom: 12px;"></div>
          <div class="meta">
            <span>
              <i class="calendar plus icon"> </i>
              {{ videoDetail.snippet.publishedAt | date }}
              <span style="margin-right: 8px;"></span>
              <i class="eye icon"></i>
              {{ videoDetail.statistics.viewCount | decimal }}
            </span>
            <span class="ui right floated">
              <i class="thumbs up icon"></i>
              {{ videoDetail.statistics.likeCount | decimal }}
              <span style="margin-right: 8px;"></span>
              <i class="thumbs down icon"></i>
              {{ videoDetail.statistics.dislikeCount | decimal }}
            </span>
          </div>
          <app-breakline></app-breakline>
          <div class="description" style="overflow: auto;">
            {{ videoDetail.snippet.description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Blank from "../common/Blank";
import Breakline from "../common/Breakline";

export default {
  components: {
    appBlank: Blank,
    appBreakline: Breakline,
  },
  props: ["videoDetail"],
};
</script>

<style scoped></style>
