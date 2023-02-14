/// <reference path="../models/artist.model.ts" />
/// <reference path="../models/lfm-api.model.ts" />

import { Injectable } from "@angular/core"
import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { catchError, delay, Observable, retry, throwError } from "rxjs"
import { ErrorService } from "./error.service";

import { LFM_API } from "../models/lfm-api.model";
import IOptionsFetch = LFM_API.IOptionsFetch
import IGetGeoTopArtistsResponse = LFM_API.IGetGeoTopArtistsResponse
import IGetTopAlbumResponse = LFM_API.IGetTopAlbumResponse
import IGetTopTracksResponse = LFM_API.IGetTopTracksResponse;
import IOptionArtist = LFM_API.IOptionArtist
import IOptionsAlbum = LFM_API.IOptionsAlbum
import IOptionsTrack = LFM_API.IOptionsTrack


@Injectable({providedIn: "root"})
export class LFMApiService {
  private readonly api_url: string = "http://ws.audioscrobbler.com/2.0"
  private readonly api_key: string = "847a8e532762d55594ecf5797371f931"

  constructor(private http: HttpClient, private errorService: ErrorService) {}

  private fetch<T>(options: IOptionsFetch): Observable<T> {
    return this.http
      .get<T>(this.api_url, {
        headers: {"content-type": "application/json", ...options?.headers},
        params: {format: "json", api_key: this.api_key, ...options?.params}
      })
      .pipe(retry(2), catchError(this.errorHandler.bind(this)))
  }

  public fetchGeoTopArtists(options: IOptionArtist): Observable<IGetGeoTopArtistsResponse> {
    return this.fetch({params: {method: "geo.gettopartists", ...options}})
  }

  public fetchTopAlbumsByArtist(options: IOptionsAlbum): Observable<IGetTopAlbumResponse> {
    return this.fetch({params: {method: "artist.gettopalbums", ...options}})
  }

  public fetchTopTracksByArtist(options: IOptionsTrack): Observable<IGetTopTracksResponse> {
    return this.fetch({params: {method: "artist.gettoptracks", ...options}})
  }

  private errorHandler(error: HttpErrorResponse): Observable<never> {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }
}
