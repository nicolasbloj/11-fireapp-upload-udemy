import { any } from 'codelyzer/util/function';
import { Component } from '@angular/core';

import { UploadImagesService } from '../../services/upload-images.service';
import { FileItem } from '../../model/file-item.model';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html'
})
export class UploadComponent {

  fileIsOnDropZone = false;
  allowedSaveFile = false;
  filesToSave: FileItem[] = [];

  constructor(public _uploadImagesService: UploadImagesService) { }

  uploadImagesToFirebase() {
    this.allowedSaveFile = false;
    this._uploadImagesService.loadImages(this.filesToSave);
  }

  clearFiles() {
    this.filesToSave = [];
    this.allowedSaveFile = true;
  }

  isOnDropZone(event: any) {
    this.fileIsOnDropZone = event;
  }

}
