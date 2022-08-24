import { EventEmitter, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ModalService {
  /* MODAL[1]  -->cliente.component.ts*/
modal:boolean = false;
/* EventEmitter[1] */
private _notidicarUpload = new EventEmitter<any>();

  constructor() { }

  /* EventEmitter[1] --->detalle.component.ts */
  get notidicarUpload(): EventEmitter<any>{
    return this._notidicarUpload;
  }

/*MODAL[1] */
  abrirModal(){
    this.modal = true;
  }
  /*MODAL[1] -->cliente.component.ts*/
  cerrarModal(){
    this.modal = false;
  }
}
