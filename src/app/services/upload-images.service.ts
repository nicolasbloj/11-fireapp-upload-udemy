import { AngularFireList } from 'angularfire2/database/interfaces';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

import { FileItem } from '../model/file-item.model';

@Injectable()
export class UploadImagesService {

  private FOLDER_IMAGES = 'imgs';

  constructor(public _angularFire: AngularFireDatabase) {
  }

  listLastImages(numberImagesTolist: number): AngularFireList< any[] > {
    return this._angularFire.list(`/${this.FOLDER_IMAGES}`, ref => ref.limitToLast(numberImagesTolist));
  }

  loadImages(files: FileItem[]): void {
    console.log(files);

    const storageRef = firebase.storage().ref();

    for (const item of files) {
      item.uploading = true;

      let uploadTask: firebase.storage.UploadTask;

      uploadTask = storageRef.child(`${this.FOLDER_IMAGES}/${item.name}`).put(item.file);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: any) => item.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        (error) => console.error('Erro al subir archivo'),
        () => {
          item.url = uploadTask.snapshot.downloadURL;
          item.uploading = false;
          this.saveImage({
            nombre: item.name, url: item.url
          });
        });

    }
  }

  private saveImage(image: any): void {
    this._angularFire.list(`/${this.FOLDER_IMAGES}`).push(image);
  }

}
