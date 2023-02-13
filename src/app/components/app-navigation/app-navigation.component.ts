import {Component, OnDestroy, OnInit} from "@angular/core"
import { FormControl } from "@angular/forms"
import { ArtistService } from "../../services/artist.service"
import { Artist } from "../../models/artist.model"
import IArtist = Artist.IArtist
import {Observable, Subject, takeUntil} from "rxjs";

@Component({
  selector: "app-navigation",
  templateUrl: "./app-navigation.component.html"
})
export class AppNavigationComponent implements OnInit, OnDestroy {
  public title: string = "LAST FM"
  public searchControl: FormControl = new FormControl("")
  public artists$: Observable<IArtist[]>
  private readonly destroy$ = new Subject<void>()

  constructor(private artistService: ArtistService) {
  }

  public ngOnInit() {
    this.changeInputValueSub()
    this.clearInputSub()
    this.onChangeArtistsToShow()
  }

  public ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }

  public displayFn(artist: IArtist): string {
    return artist && artist.name ? artist.name : ''
  }

  private onChangeArtistsToShow(): void {
    this.artists$ = this.artistService.artistsToShow$.pipe(takeUntil(this.destroy$))
  }

  private clearInputSub(): void {
    this.artistService.changeArtistsCountry$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.searchControl.setValue(""))
  }

  private changeInputValueSub(): void {
    this.searchControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(query => this.artistService.searchArtist(query))
  }
}
