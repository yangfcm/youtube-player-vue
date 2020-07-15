const highThumbnailMockUrl = "https://test-thumbnail-high-url.mock";
const mediumThumbnailMockUrl = "https://test-thumbnail-medium-url.mock";
const defaultThumbnailMockUrl = "https://test-thumbnail-default-url.mock";

export const videoItem1 = {
  id: "CacIlFaXph0",
  kind: "youtube#video",
  snippet: {
    title: "Mock video title item1",
    channelId: "UCKA96UxTdgFBwGZMGZ-135w",
    channelTitle: "Ford Motor Company",
    description: "Mock channel description item1",
    publishedAt: "2020-07-14T00:13:02Z",
    thumbnails: {
      default: {
        height: 90,
        width: 120,
        url: defaultThumbnailMockUrl,
      },
      high: {
        height: 360,
        width: 480,
        url: highThumbnailMockUrl,
      },
      medium: {
        height: 180,
        width: 320,
        url: mediumThumbnailMockUrl,
      },
    },
  },
  statistics: {
    commentCount: "4806",
    dislikeCount: "1372",
    favoriteCount: "0",
    likeCount: "36139",
    viewCount: "1766115",
  },
};

export const videoItem2 = {
  id: "mqSRaR-hQhg",
  kind: "youtube#video",
  snippet: {
    title: "Mock video title item2",
    channelId: "UChDKyKQ59fYz3JO2fl0Z6sg",
    channelTitle: "TODAY",
    description: "Mock channel description item2",
    publishedAt: "2020-07-14T15:00:13Z",
    thumbnails: {
      default: {
        height: 90,
        width: 120,
        url: defaultThumbnailMockUrl,
      },
      high: {
        height: 360,
        width: 480,
        url: highThumbnailMockUrl,
      },
      medium: {
        height: 180,
        width: 320,
        url: mediumThumbnailMockUrl,
      },
    },
  },
  statistics: {
    commentCount: "6335",
    dislikeCount: "536",
    favoriteCount: "0",
    likeCount: "26742",
    viewCount: "1337878",
  },
};
export const videoItem3 = {
  id: "j9S3I-_S3QQ",
  kind: "youtube#video",
  snippet: {
    title: "Mock video title item3",
    channelId: "UCSUf5_EPEfl4zlBKZHkZdmw",
    channelTitle: "Danny Gonzalez",
    description: "Mock channel description item3",
    publishedAt: "2020-02-12T00:13:02Z",
    thumbnails: {
      default: {
        height: 90,
        width: 120,
        url: defaultThumbnailMockUrl,
      },
      high: {
        height: 360,
        width: 480,
        url: highThumbnailMockUrl,
      },
      medium: {
        height: 180,
        width: 320,
        url: mediumThumbnailMockUrl,
      },
    },
  },
  statistics: {
    commentCount: "25317",
    dislikeCount: "1415",
    favoriteCount: "0",
    likeCount: "151860",
    viewCount: "1787292",
  },
};

export const popularVideosResponse = {
  kind: "youtube#VideoListResponse",
  pageInfo: {
    totalResults: 100,
    resultsPerPage: 3,
  },
  nextPageToken: "CA8QAA",
  items: [videoItem1, videoItem2, videoItem3],
};

test.skip("no need to test fixtures", () => {});
