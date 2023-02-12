import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {AppArtistComponent} from "./components/app-artist-item/app-artist.component";
import {ArtistListComponent} from "./components/app-artist-list/app-artists-list.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppNavigationComponent} from "./components/app-navigation/app-navigation.component";
import {AppGlobalErrorComponent} from './components/app-global-error/app-global-error.component';
import { AppArtistDetailsComponent } from './components/app-artist-details/app-artist-details.component';
import {
  AppSelectCountryOfArtistsComponent
} from "./components/app-select-country-of-artists/app-select-country-of-artists.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSelectModule} from "@angular/material/select";
import { AppArtistDetailsItemComponent } from './components/app-artist-details-item/app-artist-details-item.component';
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    AppComponent,
    ArtistListComponent,
    AppArtistComponent,
    AppNavigationComponent,
    AppGlobalErrorComponent,
    AppArtistDetailsComponent,
    AppSelectCountryOfArtistsComponent,
    AppArtistDetailsItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
