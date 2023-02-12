/// <reference path="../../models/artist.model.ts" />
/// <reference path="../../models/lfm-api.model.ts" />

import {Component, OnInit} from "@angular/core"
import {Artist} from "../../models/artist.model"
import IArtist = Artist.IArtist;
import {ArtistService} from "../../services/artist.service";
import IArtistWithMetaInformation = Artist.IArtistWithMetaInformation;

@Component({
  selector: "app-artist-list-component",
  templateUrl: "./app-artists-list.component.html"
})
export class ArtistListComponent implements OnInit {
  public artists: IArtist[] = []
  public loading: boolean = false

  constructor(private artistService: ArtistService) {
  }

  public ngOnInit() {
    this.onChangeArtistToShow()
    this.onChangeArtistsCountry()
  }

  private onChangeArtistsCountry(): void {
    this.artistService.changeArtistsCountry$.subscribe((value) => this.loading = value)
  }

  private onChangeArtistToShow(): void {
    this.artistService.artistsToShow$
      .subscribe(artists => {
        this.artists = artists
        if (this.artists.length) this.loading = false
      })
  }
}
