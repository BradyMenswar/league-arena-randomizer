import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ItemComponent } from './item/item.component';
import { ChampionComponent } from './champion/champion.component'


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule, ItemComponent, ChampionComponent 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
