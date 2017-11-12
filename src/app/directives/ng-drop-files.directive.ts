import { FileItem } from '../model/file-item.model';
import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input()
  files: FileItem[] = [];

  // @Output()
  // emitterFilesToSave: EventEmitter<FileItem[]> = new EventEmitter<FileItem[]>();
  // no es necesario.

  @Output()
  emitterFileOver: EventEmitter<boolean> = new EventEmitter<boolean>();

  // hacemos referenca al elemento html
  constructor(public _elementRef: ElementRef) {
  }

  @HostListener('dragenter', ['$event'])
  public onDragEnter(event: any) {
    this.emitterFileOver.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.emitterFileOver.emit(false);
  }

  @HostListener('dragover', ['$event'])
  public onDragOver(event: any) {
    const transfer: any = this._getTransfer(event);
    transfer.dropEffect = 'copy';
    this._preventAndStop(event);
    this.emitterFileOver.emit(true);
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any) {
    const transfer: any = this._getTransfer(event);
    if (!transfer) {
      return;
    }
    this._addFiles(transfer.files);
    this.emitterFileOver.emit(false);

    this._preventAndStop(event);
  }

  // necesitamos controlar si existe algo a transferir
  private _getTransfer(event: any): boolean {
    // console.log('_getTransfer - event ', event);
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  // stop propagation!
  // necesitamos prevenir el comportamiento por defecto
  private _preventAndStop(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  // determinar si el archivo ya fue dropeado para agregar a array this.files
  // Archivo Ya Fue Dropeado
  private _fileWasDropedYet(fileName: string): boolean {

    // tslint:disable-next-line:forin
    for (const i in this.files) {
      const file = this.files[i];
      if (file.name === fileName) {
        console.log('Archivo ya existe en la lista', fileName);
        return true;
      }
    }
    return false;
  }

  // Validamos que sea imagen el archivo
  private _fileIsImage(fileType: string): boolean {
    return (fileType === '' || fileType === undefined) ? false : fileType.startsWith('image');
  }

  // resumimos todas las validaciones
  private _fileCanSave(file: File) {
    if (!this._fileWasDropedYet(file.name) && this._fileIsImage(file.type)) {
      return true;
    }
    return false;
  }


  private _addFiles(fileList: FileList) {

    // propiedad o indice.
    // tslint:disable-next-line:forin
    for (const property in Object.getOwnPropertyNames(fileList)) {
      const file_tmp = fileList[property];

      if (this._fileCanSave(file_tmp)) {
        const newFile = new FileItem(file_tmp);
        this.files.push(newFile);
      }
    }

    console.log('files ', this.files);

    // this.emitterFilesToSave.emit(this.files);

  }
}
