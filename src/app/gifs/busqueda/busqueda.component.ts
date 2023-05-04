import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html'

})
export class BusquedaComponent {
  //no olvidar para poder eliminar y usar sus propiedades
  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;
  //para usar el servicio hay que inyectarlo xd
  constructor( private gifsService: GifsService ){

  }


  buscar(  ){

    const valor = this.txtBuscar.nativeElement.value;

    //va a permitir que no se guarden en el arreglo cuando este vacio
    if( valor.trim().length == 0 ){ return;}

    this.gifsService.buscarGifs(valor);

    //Elimina el contenido del txt
    this.txtBuscar.nativeElement.value = '';
  }

}
