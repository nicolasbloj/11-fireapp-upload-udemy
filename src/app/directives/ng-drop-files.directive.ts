import { FileItem } from '../model/file-item.model';
import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input()
  files: FileItem[] = [];

  @Output()
  fileOver: EventEmitter<boolean> = new EventEmitter<boolean>();

  // hacemos referenca al elemento html
  constructor(public _elementRef: ElementRef) {
  }

  @HostListener('dragenter', ['$event'])
  public onDragEnter(event: any) {
    this.fileOver.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.fileOver.emit(false);
  }

  @HostListener('dragover', ['$event'])
  public onDragOver(event: any) {
    this.fileOver.emit(true);
  }
}
