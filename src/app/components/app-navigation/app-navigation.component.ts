import {Component, OnInit} from "@angular/core"
import {FormControl} from "@angular/forms"
import {ArtistService} from "../../services/artist.service"
import {Artist} from "../../models/artist.model"
import IArtist = Artist.IArtist

@Component({
  selector: "app-navigation",
  templateUrl: "./app-navigation.component.html"
})
export class AppNavigationComponent implements OnInit {
  title: string = "LAST FM"
  searchControl: FormControl = new FormControl("")

  artists: IArtist[]

  constructor(private artistService: ArtistService) {
  }

  ngOnInit() {
    this.changeInputValueSub()
    this.clearInputSub()
    this.artistsSub()
  }

  public displayFn(artist: IArtist): string {
    return artist && artist.name ? artist.name : ''
  }

  private artistsSub(): void {
    this.artistService.artistsToShow$.subscribe(artists => this.artists = artists)
  }

  private clearInputSub() {
    this.artistService.changeArtistsCountry$.subscribe(() => this.searchControl.setValue(""))
  }

  private changeInputValueSub() {
    this.searchControl.valueChanges.subscribe(query => this.artistService.searchArtist(query))
  }
}
