/// <reference path="../../models/artist.model.ts" />
/// <reference path="../../models/lfm-api.model.ts" />

import {Component, OnInit} from "@angular/core"
import {Artist} from "../../models/artist.model"
import IArtist = Artist.IArtist;
import {ArtistService} from "../../services/artist.service";

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
    this.changeArtistToShowSub()
    this.changeArtistsCountry()
  }

  private changeArtistsCountry(): void {
    this.artistService.changeArtistsCountry$.subscribe((value) => this.loading = value)
  }

  private changeArtistToShowSub(): void {
    this.artistService.artistsToShow$
      .subscribe(artists => {
        this.artists = artists.map(artist => artist)
        if (this.artists.length) this.loading = false
      })
  }
}
