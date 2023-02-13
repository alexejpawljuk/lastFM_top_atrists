/// <reference path="../../models/artist.model.ts" />
/// <reference path="../../models/lfm-api.model.ts" />

import {Component, OnDestroy, OnInit} from "@angular/core"
import { ArtistService } from "../../services/artist.service"
import { Observable, Subject } from "rxjs"
import { takeUntil } from "rxjs"

import { Artist } from "../../models/artist.model"
import IArtist = Artist.IArtist;

@Component({
  selector: "app-artist-list-component",
  templateUrl: "./app-artists-list.component.html"
})
export class ArtistListComponent implements OnInit, OnDestroy {
  public artists$: Observable<IArtist[]>
  private readonly destroy$ = new Subject<void>()
  public loading: boolean = false

  constructor(private artistService: ArtistService) {
  }

  public ngOnInit(): void {
    this.artists$ = this.artistService.artistsToShow$
    this.artists$
      .pipe(takeUntil(this.destroy$))
      .subscribe(artists => !artists.length ? this.loading = true : this.loading = false)
  }

  public ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
