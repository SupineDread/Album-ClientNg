import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {AlbumsListComponent} from './components/albums-list.component';
import {AlbumAddComponent} from './components/album-add.component';
import {AlbumDetailComponent} from './components/album-detail.component';
import {AlbumEditComponent} from './components/album-edit.component';
import {ImageAddComponent} from './components/image-add.component';
import {ImageEditComponent} from './components/image-edit.component';
import {ImageDetailComponent } from './components/image-detail.component'
import {routing, appRoutingProviders} from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    AlbumsListComponent,
    AlbumAddComponent,
    AlbumDetailComponent,
    AlbumEditComponent,
    ImageAddComponent,
    ImageEditComponent,
    ImageDetailComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpModule,
    FormsModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
