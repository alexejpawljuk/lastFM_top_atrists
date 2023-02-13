import {Component, OnInit} from "@angular/core"
import {FormControl} from "@angular/forms"
import {ArtistService} from "../../services/artist.service"
import {Artist} from "../../models/artist.model"
import IArtist = Artist.IArtist
import {Observable} from "rxjs";

@Component({
  selector: "app-navigation",
  templateUrl: "./app-navigation.component.html"
})
export class AppNavigationComponent implements OnInit {
  title: string = "LAST FM"
  searchControl: FormControl = new FormControl("")
  artists$: Observable<IArtist[]>

  constructor(private artistService: ArtistService) {
  }

  ngOnInit() {
    this.changeInputValueSub()
    this.clearInputSub()
    this.onChangeArtistsToShow()
  }

  public displayFn(artist: IArtist): string {
    return artist && artist.name ? artist.name : ''
  }

  private onChangeArtistsToShow(): void {
    this.artists$ = this.artistService.artistsToShow$
  }

  private clearInputSub() {
    this.artistService.changeArtistsCountry$.subscribe(() => this.searchControl.setValue(""))
  }

  private changeInputValueSub() {
    this.searchControl.valueChanges.subscribe(query => this.artistService.searchArtist(query))
  }
}
