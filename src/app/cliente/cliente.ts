import { Region } from "./region"

export class Cliente {
  id: number
  nombre: string
  apellido: string
  email: string
  createAt: string
  /* subirfoto[1]   -->cliente.service.ts*/
  foto:string
  /* region[2]---> detalle.component.html*/
  region:Region;
}
