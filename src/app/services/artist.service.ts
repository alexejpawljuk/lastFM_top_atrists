import {Injectable} from '@angular/core'
import {BehaviorSubject} from "rxjs"
import {LFMApiService} from "./lFM-api.service"

import {Artist} from "../models/artist.model"
import {LFM_API} from "../models/lfm-api.model"
import IArtist = Artist.IArtist
import IArtistMetaInformation = Artist.IArtistWithMetaInformation
import ICountry = LFM_API.ICountry;

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private TOP_ARTISTS_COUNT: number = 10
  private TOP_ALBUMS_COUNT: number = 5
  private TOP_TRACKS_COUNT: number = 5

  private artists$: BehaviorSubject<IArtist[]> = new BehaviorSubject<IArtist[]>([])
  public artistsToShow$: BehaviorSubject<IArtist[]> = new BehaviorSubject<IArtist[]>([])
  public artistsMetaInformation$: BehaviorSubject<IArtistMetaInformation[]> = new BehaviorSubject<IArtistMetaInformation[]>([])
  public changeArtistsCountry$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor(private LFMApi: LFMApiService) {
    this.updateArtistsToShowSub()
    this.fetchMetaInformationSub()
  }

  private updateArtistsToShowSub(): void {
    this.artists$.subscribe(artists => this.artistsToShow$.next(artists))
  }

  private filterArtists(artist: IArtist, searchValue: string | IArtist): boolean {
    if (typeof searchValue === "string") return artist.name.toLowerCase().includes(searchValue.toLowerCase().trim())
     return artist.name.toLowerCase().includes(searchValue.name.toLowerCase().trim())
  }

  private fetchGeoTopArtists(country: ICountry): void {
    this.LFMApi.fetchGeoTopArtists({country, limit: this.TOP_ARTISTS_COUNT})
      .subscribe(artists => {
        this.artists$.next(artists.topartists.artist)
      })
  }

  private fetchMetaInformationSub(): void {
    this.artists$.subscribe(artists => {
      const artistsMetaInformation: IArtistMetaInformation[] = []

      artists.forEach(artist => {
        new Promise<IArtistMetaInformation>(resolve => {
          const artistMetaInformation: IArtistMetaInformation = {
            artist: artist,
            albums: [],
            tracks: []
          }
          resolve(artistMetaInformation)
        })
          .then(artistMetaInformation => {
            this.LFMApi
              .fetchTopAlbumsByArtist({artist: artist.name, limit: this.TOP_ALBUMS_COUNT})
              .subscribe(albums => {
                artistMetaInformation.albums = albums.topalbums.album
              })
            return Promise.resolve(artistMetaInformation)
          })
          .then(artistMetaInformation => {
            this.LFMApi
              .fetchTopTracksByArtist({artist: artist.name, limit: this.TOP_TRACKS_COUNT})
              .subscribe(tracks => {
                artistMetaInformation.tracks = tracks.toptracks.track
              })
            return Promise.resolve(artistMetaInformation)
          })
          .then(artistMetaInformation => {
            artistsMetaInformation.push(artistMetaInformation)
          })
      })
      this.artistsMetaInformation$.next(artistsMetaInformation)
    })
  }

  private changeArtistsCountry(): void {
    this.changeArtistsCountry$.next(true)
  }

  public setCountry(country: ICountry): void {
    this.changeArtistsCountry()
    this.artists$.next([])
    this.fetchGeoTopArtists(country)
  }

  public searchArtist(searchValue: string): void {
    this.artistsToShow$.next(this.artists$.value.filter(artist => this.filterArtists(artist, searchValue)))
  }
}
