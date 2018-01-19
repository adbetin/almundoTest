import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HotelDetailsComponent } from './hotels/hotel-details/hotel-details.component';
import { HotelListComponent } from './hotels/hotel-list/hotel-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HotelDetailsComponent,
    HotelListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
