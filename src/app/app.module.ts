import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {PhotoServiceService} from './photo-service.service';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
    HttpModule,
    HttpClientModule

  ],
  providers: [PhotoServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
