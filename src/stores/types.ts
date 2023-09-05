/** Generic type definitions */
export type Thumbnail = {
  height?: number
  width?: number
  url: string
}

/** Type definitions for Video */
export type VideoId = {
  videoId: string
  kind: string
}

export type VideoMeta = {
  id: string | VideoId
  etag: string
  kind: string
}

export type VideoSnippet = {
  title: string
  description: string
  categoryId: string
  channelId: string
  channelTitle: string
  publishedAt: Date
  tags: string[]
  thumbnails: {
    default?: Thumbnail
    high?: Thumbnail
    maxres?: Thumbnail
    medium?: Thumbnail
    standard?: Thumbnail
  }
}

export type VideoMetaSnippet = VideoMeta & {
  snippet: VideoSnippet
}

export type VideoStatistics = {
  commentCount: string
  favoriteCount: string
  likeCount: string
  viewCount: string // These properties are all number represented by string.
}

export type VideoMetaSnippetStats = VideoMeta & {
  snippet: VideoSnippet
  statistics: VideoStatistics
}

export type VideosSnippetResponse = {
  etag: string
  kind: string
  pageInfo: { totalResults: number; resultsPerPage: number }
  nextPageToken?: string
  prevPageToken?: string
  items: VideoMetaSnippet[]
}

export type VideosResponse = {
  etag: string
  kind: string
  pageInfo: { totalResults: number; resultsPerPage: number }
  nextPageToken?: string
  prevPageToken?: string
  items: VideoMetaSnippetStats[]
}

export type VideoResponse = {
  etag: string
  kind: string
  pageInfo: { totalResults: number; resultsPerPage: number }
  items: VideoMetaSnippetStats[]
}

/** Type definitions for subscriptions. */
export type SubscriptionSnippet = {
  etag: string
  id: string
  kind: string
  snippet: {
    channelId: string
    description: string
    title: string
    publishedAt: Date
    resourceId: {
      kind: string
      channelId: string
    }
    thumbnails: {
      default?: Thumbnail
      high?: Thumbnail
      medium?: Thumbnail
    }
  }
}

export type SubscriptionsResponse = {
  etag: string
  kind: string
  pageInfo: {
    totalResults: number
    resultsPerPage: number
  }
  items: SubscriptionSnippet[]
  nextPageToken?: string
}

/** Type definitions for playlists */
export type PlayListSnippet = {
  channelId: string
  channelTitle: string
  description: string
  publishedAt: Date
  title: string
  thumbnails: {
    default?: Thumbnail
    high?: Thumbnail
    maxres?: Thumbnail
    medium?: Thumbnail
    standard?: Thumbnail
  }
}

export type PlayListId = {
  kind: string
  playlistId: string
}

export type PlayListMeta = {
  id: string | PlayListId
  etag: string
  kind: string
}

export type PlayListMetaSnippet = PlayListMeta & {
  snippet: PlayListSnippet
}

export type PlayListMetaSnippetDetails = PlayListMeta & {
  snippet: PlayListSnippet
  contentDetails: {
    itemCount: number
  }
  status: {
    privacyStatus: string
  }
}

export type PlayListsRespone = {
  etag: string
  kind: string
  pageInfo: {
    totalResults: number
    resultsPerPage: number
  }
  items: PlayListMetaSnippetDetails[]
  nextPageToken?: string
}

export type PlayListItemDetails = PlayListMeta & {
  snippet: {
    channelId: string
    channelTitle: string
    description: string
    playlistId: string
    position: number
    publishedAt: Date
    resourceId: {
      kind: string
      videoId: string
    }
    thumbnails: {
      default?: Thumbnail
      high?: Thumbnail
      maxres?: Thumbnail
      medium?: Thumbnail
      standard?: Thumbnail
    }
    title: string
    videoOwnerChannelId: string
    videoOwnerChannelTitle: string
  }
  contentDetails: {
    videoId: string
    videoPublishedAt: Date
  }
  status: {
    privacyStatus: string
  }
}

export type PlayListItemsResponse = {
  etag: string
  kind: string
  pageInfo: {
    totalResults: number
    resultsPerPage: number
  }
  nextPageToken?: string
  items: PlayListItemDetails[]
}

/** Type definitions for channel */
export type ChannelSnippet = {
  channelId: string
  channelTitle: string
  description: string
  publishedAt: Date
  title: string
  thumbnails: {
    default?: Thumbnail
    high?: Thumbnail
    maxres?: Thumbnail
    medium?: Thumbnail
    standard?: Thumbnail
  }
}

export type ChannelId = {
  kind: string
  channelId: string
}

export type ChannelMeta = {
  id: ChannelId
  etag: string
  kind: string
}

export type ChannelMetaSnippet = ChannelMeta & {
  snippet: ChannelSnippet
}

export type ChannelDetails = {
  id: string
  etag: string
  kind: string
  snippet: {
    title: string
    description: string
    publishedAt: Date
    thumbnails: {
      default?: Thumbnail
      high?: Thumbnail
      medium?: Thumbnail
    }
  }
  statistics: {
    subscriberCount: string
    videoCount: string
    viewCount: string
  }
  brandingSettings?: {
    image?: {
      bannerExternalUrl?: string
    }
  }
}

export type ChannelDetailsResponse = {
  etag: string
  kind: string
  pageInfo: {
    totalResults: number
    resultsPerPage: number
  }
  items: ChannelDetails[]
}

/** Type definition for search results */
export type ResultItemMetaSnippet = VideoMetaSnippet | ChannelMetaSnippet | PlayListMetaSnippet

export type SearchResultsResponse = {
  etag: string
  kind: string
  pageInfo: { totalResults: number; resultsPerPage: number }
  items: ResultItemMetaSnippet[]
  nextPageToken?: string
  prevPageToken?: string
}
