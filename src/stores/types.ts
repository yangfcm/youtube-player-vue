export type Thumbnail = {
  height?: number
  width?: number
  url: string
}

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
