import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import swal from 'sweetalert2';
import { ModalService } from './modal.service';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
/* subirfoto[1] subir una foto por cliente y  se necsetia el id del cliente y el objeto cliente */
  @Input() cliente:Cliente; /* MODAL[4] con esto se coloca la instancia(seleccionarCliente) de cliente en detalle.component.ts  -->cliente.component.html*/
  public fotoSeleccionada:File;
  constructor(private clienteService:ClienteService,
    /* activatedRoute para subscribir cuando cambia el parametro del id */
     private acticatedRoute:ActivatedRoute, public modalService:ModalService
    ) { }

    /* subirfoto[2]  -->detalle.component.html*/
  ngOnInit(): void { /* MODAL[4]  --->cliente.compoent.ts*/
    // this.acticatedRoute.paramMap.subscribe(params=>{
    //   let id: number = +params.get('id');
    //   if(id){
    //     this.clienteService.obtenerClientePorId(id).subscribe(cliente => {
    //       this.cliente = cliente;
    //     });
    //   }
    // });
  }



  /* subirFoto[3]  -->detalle.component.html va en el input*/
  seleccionarFoto(event){
    /* crer variable provada */
    this.fotoSeleccionada = event.target.files[0];/* dentro del arreglo de archivos agarrams el unico, o sea de laposicion 0 */
    console.log(this.fotoSeleccionada);
    /* validar que el arcvhivo sea de tipo imagen */
    if(this.fotoSeleccionada.type.indexOf('image') < 0){
      swal('Error selecionar iamgen', 'El archivo debe ser  de tipo iamgen', 'error');
        this.fotoSeleccionada = null ;
    }

  }
/* subirFoto[3]  -->detalle.component.html va en el button*/
  subirFoto(){
    /* validar si es que no se selcciona ninguna foto*/
    if (!this.fotoSeleccionada){
      swal('Error Upload: ', 'Debe seleccionar una foto', 'error');

    }
    this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id)
    .subscribe(cliente=>{
      /*  cambio del cliente con su viena foto*/
      this.cliente = cliente;
      /* EventEmitter[2] solo este this| --> clientes.component.ts*/
      this.modalService.notidicarUpload.emit(this.cliente);

      swal("La foto se ha subido completamente!", `La foto se ha subido con exito: ${this.cliente.foto}`, 'success')
    })
  }

  /* MODAL[4]   --> detalle.component.html*/
  cerrarModal(){
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
  }

}
