import { Observable } from 'rxjs/Rx';
import { UploadImagesService } from '../../services/upload-images.service';
import { Component } from '@angular/core';
import { AngularFireList } from 'angularfire2/database';
import { FileItem } from '../../model/file-item.model';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html'
})
export class PhotosComponent {

  files: FileItem[];

  constructor(private _uploadImagesService: UploadImagesService) {

    this._uploadImagesService.listLastImages(11).subscribe(data => {
      this.files = data;
      console.log(this.files);
    });
  }

}
