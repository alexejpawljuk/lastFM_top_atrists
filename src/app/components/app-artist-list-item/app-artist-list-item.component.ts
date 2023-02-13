/// <reference path="../../models/lfm-api.model.ts" />
/// <reference path="../../models/artist.model.ts" />

import { Component, Input } from "@angular/core"

import { Artist } from "../../models/artist.model"
import IArtist = Artist.IArtist


@Component({
  selector: "app-artist-list-item-component",
  templateUrl: "./app-artist-list-item.component.html"
})
export class AppArtistListItemComponent {
  @Input() artist: IArtist

  showDetails: boolean = false
}
