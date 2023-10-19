export interface Youtube {
    kind:          string;
    etag:          string;
    nextPageToken: string;
    regionCode:    string;
    pageInfo:      PageInfo;
    items:         Video[];
}

// export interface Video {
//     kind:    ItemKind;
//     etag:    string;
//     id:      ID;
//     snippet: Snippet;
// }

export interface Video {
  url:    string;
  transcription: Content[];
  description: Content[];
  title: string;
  resume: string;
  category: string;
  cod: string
}

export interface Content {
  start:    number;
  end:    number;
  content: string;
}

export interface ID {
    kind:    IDKind;
    videoId: string;
}

export enum IDKind {
    YoutubeVideo = "youtube#video",
}

export enum ItemKind {
    YoutubeSearchResult = "youtube#searchResult",
}

export interface Snippet {
    publishedAt:          Date;
    channelId:            string;
    title:                string;
    description:          string;
    thumbnails:           Thumbnails;
    channelTitle:         string;
    liveBroadcastContent: LiveBroadcastContent;
    publishTime:          Date;
}

export enum LiveBroadcastContent {
    None = "none",
}

export interface Thumbnails {
    default: Default;
    medium:  Default;
    high:    Default;
}

export interface Default {
    url:    string;
    width:  number;
    height: number;
}

export interface PageInfo {
    totalResults:   number;
    resultsPerPage: number;
}