import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Region } from './region';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public cliente:Cliente = new Cliente();
  public errores:string[];
  regiones:Region[];
  constructor(private acticatedRoute:ActivatedRoute,
    private clienteService:ClienteService,
    private router:Router,

    ) { }

    /* cargar clientes */
    // /*cargar cliente en el form[3]*/
  ngOnInit(): void {

    this.acticatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.clienteService.obtenerClientePorId(id)
        .subscribe((cliente) => {
          this.cliente = cliente
        })
      }
    });
    /* REGIONES[5]  --->form.component.html*/
    this.clienteService.getRegiones().subscribe(regiones =>this.regiones = regiones); ;/*el observable asigna las regiones del apirest y se lo asiga al atributo this.regiones*/
  }



  crearCliente(): void {
    this.clienteService.crearCliente(this.cliente)
    .subscribe(json=>{
      this.router.navigate(['/clientes'])
      swal('Nuevo Cliente', `${json.mensaje}`, 'success')
    },
    err=>{
      this.errores = err.error.errors as string[];
    }
    );
  }

  actualizarCliente(): void {
    this.clienteService.actualizarCliente(this.cliente)
    .subscribe(json=>{
      this.router.navigate(['/clientes'])
      swal('Cliente',  `${json.mensaje}`, 'success')
    },
    err=>{
      this.errores = err.error.errors as string[];
    }
    )
  }

  /*REGIONES[5] solopara editar */
  compararRegion(o1:Region, o2:Region):boolean{
    /* si el combobox es undefined(vaciao) mostrara el texto --selecione una region-- */
    if(o1 === undefined && o2 === undefined){
      return true;
    }
    return o1 ==null || o2==null || o1 ===undefined || o2===undefined? false: o1.id===o2.id;
  }
}
