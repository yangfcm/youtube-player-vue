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
