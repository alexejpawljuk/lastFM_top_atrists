/// <reference path="../../models/artist.model.ts" />
/// <reference path="../../models/lfm-api.model.ts" />

import { Component, OnInit } from "@angular/core"
import { Artist } from "../../models/artist.model"
import IArtist = Artist.IArtist;
import { ArtistService } from "../../services/artist.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-artist-list-component",
  templateUrl: "./app-artists-list.component.html"
})
export class ArtistListComponent implements OnInit {
  public artists$: Observable<IArtist[]>
  public loading: boolean = false

  constructor(private artistService: ArtistService) {
  }

  public ngOnInit() {
    this.artists$ = this.artistService.artistsToShow$
    this.artists$.subscribe(artists => !artists.length ? this.loading = true : this.loading = false)
  }
}
