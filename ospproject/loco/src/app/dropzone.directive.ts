import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
 import * as _ from 'lodash';
@Directive({
  selector: '[Dropzone]'
})
export class DropzoneDirective {

  @Output() filesDropped = new EventEmitter<FileList>();
  @Output() filesHovered = new EventEmitter();

  constructor() { }

  @HostListener('drop', ['$event']) onDrop($event) {
    $event.preventDefault();
    const trans = $event.dataTransfer;
    this.filesDropped.emit(trans.files);
    this.filesHovered.emit(false);
  }
  @HostListener('dragover', ['$event']) onDragOver($event) {
    $event.preventDefault();
    this.filesHovered.emit(true);
  }

  @HostListener('dragleave', ['$event']) ondragLeave($event) {
    $event.preventDefault();
    this.filesHovered.emit(false);
  }

}
