import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NgFloatingActionButtonModule} from "../../projects/ng-floating-action-button/src/public_api";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgFloatingActionButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
