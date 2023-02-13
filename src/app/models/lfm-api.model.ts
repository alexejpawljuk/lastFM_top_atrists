import {Artist} from "./artist.model"
import IArtist = Artist.IArtist
import IAlbum = Artist.IAlbum
import IAttr = Artist.IAttr
import IArtistName = Artist.IArtistName
import ITrack = Artist.ITrack

export namespace LFM_API {


  export type IMethod = "geo.gettopartists" | "artist.gettopalbums" | "artist.gettoptracks"
  export type IContentType = "application/json"
  export type IFormat = "json"
  export type IApiKey = string
  export type ICountry = "Germany" | "Spain" | "Canada"
  export type ILimit = number



  export interface IGetTopAlbumResponse {
    topalbums: {
      "@attr": IAttr
      album: IAlbum[]
    }
  }

  export interface IGetTopTracksResponse {
    toptracks: {
      "@attr": IAttr
      track: ITrack[]
    }
  }

  export interface IGetGeoTopArtistsResponse {
    topartists: {
      artist: IArtist[]
      "@attr": IAttr
    }
  }

  export interface IOptionArtist {
    country: ICountry,
    // method: string,
    limit?: ILimit
  }

  export interface IOptionsAlbum {
    artist: IArtistName
    limit?: ILimit
  }

  export interface IOptionsFetch {
    params: {
      format?: IFormat
      api_key?: IApiKey
      method: IMethod
      limit?: ILimit
    }
    headers?: {
      "content-type": IContentType
    }
  }
}
