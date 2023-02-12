export namespace Artist {
  export type IArtistName = string
  export type IMbId = string
  export type IUrl = string
  export type IStreamable = string
  export type IPlayCount = string
  export type IListeners = string

  export interface IArtist {
    image: IIMage[]
    listeners: IListeners
    mbid: IMbId
    name: IArtistName
    streamable: IStreamable
    url: IUrl
  }

  export interface IArtistWithMetaInformation {
    artist: IArtist
    albums: IAlbum[]
    tracks: ITrack[]
  }

  export interface IIMage {
    size: string
    "#text": string
  }

  export interface ITrack {
    "@attr": {rank: string}
    artist: Pick<IArtist, "name" | "mbid" | "url">
    image: IIMage[]
    listeners: IListeners
    mbid: IMbId
    name: IArtistName
    playcount: IPlayCount
    streamable: IStreamable
    url: IUrl
  }

  export interface IAlbum {
    artist: Pick<IArtist, "name" | "mbid" | "url">
    image: IIMage[]
    mbid: IMbId
    name: IArtistName
    playcount: IPlayCount
    url: IUrl
  }

  export interface IAttr {
    country: string,
    page: string,
    perPage: string,
    totalPages: string,
    total: string
  }
}
