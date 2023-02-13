import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { ArtistService } from "../../../services/artist.service"
import { Subject, takeUntil } from "rxjs"

import { LFM_API } from "../../../models/lfm-api.model"
import ICountry = LFM_API.ICountry

@Component({
  selector: 'app-select-country-of-artists',
  templateUrl: './app-select-country-of-artists.component.html',
})
export class AppSelectCountryOfArtistsComponent implements OnInit, OnDestroy {
  public countries: ICountry[] = ["Germany", "Spain", "Canada"]
  private defaultCountry: ICountry = "Germany"
  public panelControl: FormControl = new FormControl<ICountry>(this.defaultCountry)
  private readonly destroy$ = new Subject<void>()

  constructor(private artistService: ArtistService) {}

  public ngOnInit(): void {
    this.defineCountry()
  }

  public ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  private defineCountry(): void {
    this.artistService.setCountry(this.defaultCountry)
    this.panelControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(country => this.artistService.setCountry(country))
  }
}
