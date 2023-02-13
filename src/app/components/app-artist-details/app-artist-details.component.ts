/// <reference path="../../models/artist.model.ts" />

import { Component, OnInit, Input, OnDestroy } from '@angular/core'
import { ArtistService } from "../../services/artist.service"
import { Subject } from "rxjs"
import { takeUntil } from "rxjs"

import { Artist } from "../../models/artist.model"
import IArtist = Artist.IArtist
import IArtistWithMetaInformation = Artist.IArtistWithMetaInformation


@Component({
  selector: 'app-app-artist-details',
  templateUrl: './app-artist-details.component.html'
})
export class AppArtistDetailsComponent implements OnInit, OnDestroy {
  @Input() artist: IArtist
  private readonly destroy$ = new Subject<void>()

  public artistMetaInformation: IArtistWithMetaInformation[]

  constructor(private artistService: ArtistService) {
  }

  public ngOnInit(): void {
    this.addArtistMetaInformation()
  }

  public ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  private addArtistMetaInformation(): void {
    if (!this.artist) return

    this.artistService.artistsMetaInformation$
      .pipe(takeUntil(this.destroy$))
      .subscribe(artistsMetaInformation => {
        this.artistMetaInformation = artistsMetaInformation.filter(artist => artist.artist.name === this.artist.name)
      })
  }

}
