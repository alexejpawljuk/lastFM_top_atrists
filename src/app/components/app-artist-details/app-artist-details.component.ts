import {Component, OnInit, Input} from '@angular/core'
import {ArtistService} from "../../services/artist.service";
import {Artist} from "../../models/artist.model";
import IArtist = Artist.IArtist;
import IArtistWithMetaInformation = Artist.IArtistWithMetaInformation

@Component({
  selector: 'app-app-artist-details',
  templateUrl: './app-artist-details.component.html'
})
export class AppArtistDetailsComponent implements OnInit {
  @Input() artist: IArtist

  artistMetaInformation: IArtistWithMetaInformation[]

  constructor(private artistService: ArtistService) {
  }

  ngOnInit(): void {
    this.addArtistMetaInformation()
  }

  private addArtistMetaInformation(): void {
    this.artistService.artistsMetaInformation$.subscribe(artistsMetaInformation => {
      this.artistMetaInformation = artistsMetaInformation.filter(artist => artist.artist.name === this.artist.name)
    })
  }
}
