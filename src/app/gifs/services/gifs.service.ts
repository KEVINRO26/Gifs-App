import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SerchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'

  //servcios globales
})
export class GifsService {

  private apiKey : string = '3b82Zt6C0Z8zZB6Z2hhHkXWM4tsU6uc7';
  private servicioUrl : string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];
  //le ponemos _ bajo para que en tiempo de ejecuacion se este cambiando

  public resultados: Gif[] = [];

  get historial(){   
    //ponemos de esta manera para que no me modifique el arreglo inicial
    return [...this._historial];   
  }


  constructor ( private http: HttpClient){

    // ! le decimos a angrular que confie en nosotros xd 
    // [] le mandamos un arrglo vacio ya que a la hora de eliminar 
    // el historial saldra un error
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [] ;
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [] ;
  }


  //termino de busqueda de tipo string
  buscarGifs( query: string = ''){
    //para que se guarden en el arreglo en minuscula
    //trim sirve para eliminar espacios adelate y
    query = query.trim().toLocaleLowerCase();

    if( !this._historial.includes( query) ){
      //unshift para insertarlo al inicio
      this._historial.unshift( query );

      //me va a permitir que solo se puedan crear 10 elementos 
      this._historial = this._historial.splice(0,10);

      //almacena el historial, JSON.stringify transforma un objeto a string
      localStorage.setItem('historial', JSON.stringify(this._historial));




    }

    const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('limit', '10')
        .set('q', query);

    this.http.get<SerchGifsResponse>(`${ this.servicioUrl }/search`, { params } )
        .subscribe( ( resp ) => {
          console.log( resp.data )
          this.resultados = resp.data;
          localStorage.setItem('resultados', JSON.stringify(this.resultados));

         
        });
  }


}
