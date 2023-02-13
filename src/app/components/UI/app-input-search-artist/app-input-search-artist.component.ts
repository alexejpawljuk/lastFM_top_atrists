import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormControl } from "@angular/forms"
import { ArtistService } from "../../../services/artist.service"
import { Observable, Subject, takeUntil } from "rxjs"

import { Artist } from "../../../models/artist.model"
import IArtist = Artist.IArtist

@Component({
  selector: 'app-input-search-artist',
  templateUrl: './app-input-search-artist.component.html',
})
export class AppInputSearchArtistComponent implements OnInit, OnDestroy{
  public artists$: Observable<IArtist[]>
  public searchControl: FormControl = new FormControl("")
  private readonly destroy$ = new Subject<void>()

  constructor(private artistService: ArtistService) {}

  public ngOnInit(): void {
    this.changeInputValue()
    this.clearInput()
    this.onChangeArtistsToShow()
  }

  public ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  public displayFn(artist: IArtist): string {
    return artist && artist.name ? artist.name : ''
  }

  private onChangeArtistsToShow(): void {
    this.artists$ = this.artistService.artistsToShow$.pipe(takeUntil(this.destroy$))
  }

  private clearInput(): void {
    this.artistService.changeArtistsCountry$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.searchControl.setValue(""))
  }

  private changeInputValue(): void {
    this.searchControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(query => this.artistService.searchArtist(query))
  }
}
