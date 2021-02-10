import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LuchadorModel } from '../models/luchador.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DojoService {

  private ulr = 'https://dojogon-50d3a-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) { }

  /* Método Post para crear un luchador */
  crearLuchador (luchador: LuchadorModel) {

    /* Colocamos el endpoint */
    return this.http.post(`${this.ulr}/luchadores.json`, luchador)
            .pipe(
              map( (resp : any ) =>{
                luchador.id = resp.name;
                return luchador;
              })
            );

  }

  /* Método Put para modificar a un luchador */
  actualizarLuchador (luchador: LuchadorModel){

    const luchadorTemp = {
      ...luchador
    };

    /*Rompemos la refencia del objeto para poder eliminar el id que no queremos que incluya en firebase*/
    delete luchadorTemp.id;

    /* Colocamos el endpoint  .json es propio del firebase*/
    return this.http.put(`${ this.ulr }/luchadores/${ luchador.id }.json`, luchadorTemp);
  }

  // Método Get por id
  getLuchador(id: string){
    return this.http.get(`${ this.ulr }/luchadores/${ id }.json`);
  }

  // Método Get para obtener una lista de luchadores
  getLuchadores(){

    return this.http.get(`${ this.ulr }/luchadores.json`)
            .pipe(
              map (this.crearArrayLuchadores)
            );

  } 


  // Método Delete para eliminar a un luchador con id
  eliminarLuchador (id: string){

    return this.http.delete(`${ this.ulr }/luchadores/${ id }.json`);

  }


  // Creamos un método para crear un array
  private crearArrayLuchadores(dojoObj: object ){

      const luchadores: LuchadorModel[] = [];

      console.log(dojoObj);

      Object.keys(dojoObj).forEach( key => {

        const luchador: LuchadorModel = dojoObj [key]; //Extraemos del objeto
        luchador.id = key;

        luchadores.push(luchador);
      });

      //validación por si no hay nada en la base de datos
      if(dojoObj === null) {return []; }

    return luchadores;

  }

}
