import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LFM_API } from "../../models/lfm-api.model";
import ICountry = LFM_API.ICountry;
import { ArtistService } from "../../services/artist.service";

@Component({
  selector: 'app-select-country-of-artists',
  templateUrl: './app-select-country-of-artists.component.html',
})
export class AppSelectCountryOfArtistsComponent implements OnInit {
  public countries: ICountry[] = ["Germany", "Spain", "Canada"]
  private defaultCountry: ICountry = "Germany"
  public panelControl: FormControl = new FormControl<ICountry>(this.defaultCountry)

  constructor(private artistService: ArtistService) {}

  ngOnInit(): void {
    this.defineCountry()
  }

  private defineCountry(): void {
    this.artistService.setCountry(this.defaultCountry)
    this.panelControl.valueChanges.subscribe(country => this.artistService.setCountry(country))
  }
}
