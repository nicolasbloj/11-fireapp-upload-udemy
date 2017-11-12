import { UploadImagesService } from './services/upload-images.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { APP_ROUTING } from './app.routes';
import { AppComponent } from './app.component';
import { UploadComponent } from './components/upload/upload.component';
import { PhotosComponent } from './components/photos/photos.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    PhotosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    APP_ROUTING,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
  ],
  providers: [UploadImagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
