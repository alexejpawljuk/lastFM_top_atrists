/// <reference path="../../models/lfm-api.model.ts" />
/// <reference path="../../models/artist.model.ts" />

import { Component, Input } from "@angular/core"

import { Artist } from "../../models/artist.model"
import IArtist = Artist.IArtist


@Component({
  selector: "app-artist-component",
  templateUrl: "./app-artist.component.html"
})
export class AppArtistComponent{
  @Input() artist: IArtist

  showDetails: boolean = false
}
