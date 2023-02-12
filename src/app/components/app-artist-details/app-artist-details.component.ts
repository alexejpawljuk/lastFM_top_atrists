import {Component, OnInit, Input} from '@angular/core'
import {ArtistService} from "../../services/artist.service";
import {Artist} from "../../models/artist.model";
import IArtistWithMetaInformation = Artist.IArtistWithMetaInformation;
import IArtist = Artist.IArtist;

@Component({
  selector: 'app-app-artist-details',
  templateUrl: './app-artist-details.component.html'
})
export class AppArtistDetailsComponent implements OnInit {
  @Input() artist: IArtist
  artistMetaInformation: Artist.IArtistWithMetaInformation[]

  constructor(private artistService: ArtistService) {
  }

  ngOnInit(): void {
    this.artistService.artistsMetaInformation$.subscribe(artistsMetaInformation => {
      this.artistMetaInformation = artistsMetaInformation.filter(artist => artist.artist.name === this.artist.name)
    })
  }
}
