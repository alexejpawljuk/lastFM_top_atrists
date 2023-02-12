import {Component, Input} from '@angular/core';
import {Artist} from "../../models/artist.model";
import IAlbum = Artist.IAlbum;
import ITrack = Artist.ITrack;

@Component({
  selector: 'app-artist-details-item',
  templateUrl: './app-artist-details-item.component.html',
})
export class AppArtistDetailsItemComponent {
  @Input() items: IAlbum[] | ITrack[]
  @Input() title: string
}
