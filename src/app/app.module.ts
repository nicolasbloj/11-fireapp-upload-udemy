import { UploadImagesService } from './services/upload-images.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';

import { APP_ROUTING } from './app.routes';
import { AppComponent } from './app.component';
import { UploadComponent } from './components/upload/upload.component';
import { PhotosComponent } from './components/photos/photos.component';
import { environment } from '../environments/environment';
import { NgDropFilesDirective } from './directives/ng-drop-files.directive';


@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    PhotosComponent,
    NgDropFilesDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    APP_ROUTING,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
  ],
  providers: [UploadImagesService, AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
