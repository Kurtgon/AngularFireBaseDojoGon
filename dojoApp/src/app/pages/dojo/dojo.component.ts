import { Component, OnInit } from '@angular/core';
import { LuchadorModel } from 'src/app/models/luchador.model';
import { DojoService } from 'src/app/services/dojo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dojo',
  templateUrl: './dojo.component.html',
  styleUrls: ['./dojo.component.css']
})
export class DojoComponent implements OnInit {

  
  luchadores: LuchadorModel [] = [];
  cargando = false;

  constructor(private dojoService: DojoService) { }

  ngOnInit(): void {

    //disparamos la barra de cargar antes de que muestre a los luchadores
    this.cargando = true;
    this.dojoService.getLuchadores().subscribe(resp => { 
      this.luchadores = resp;
      this.cargando = false;
    });

  }

  eliminarLuchador( luchador: LuchadorModel, i: number ) {

    //Preguntamos al usuario con una alerta si realmente quiere eliminar al luchador
    Swal.fire({
      title: '¿Seguro?',
      text: `Estás a punto de eliminar a ${luchador.nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then ( resp => {

      if ( resp.value ) { // si la condición se cumple elimina al luchador

        //Para eliminarlo de la tabla sin tener que recargar la página
        this.luchadores.splice(i,1);
        this.dojoService.eliminarLuchador( luchador.id).subscribe();
          }
    })

 
  }
}
