
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { LuchadorModel } from 'src/app/models/luchador.model';
import { DojoService } from 'src/app/services/dojo.service';

import  Swal from 'sweetalert2'; //objeto de una libreria para avisar al usuario

@Component({
  selector: 'app-luchador',
  templateUrl: './luchador.component.html',
  styleUrls: ['./luchador.component.css']
})
export class LuchadorComponent implements OnInit {

  luchador = new LuchadorModel();

  constructor(private dojoService: DojoService,
              private route: ActivatedRoute) { } //con el route ya puedo recibir por url el id

  ngOnInit(): void {

    //declaramos una constante para tratar con el id
    const id = this.route.snapshot.paramMap.get('id');

    //Tenemos que traernos toda la información del firebase
    if ( id !== 'nuevo' ){

      this.dojoService.getLuchador ( id ).subscribe ( (resp: LuchadorModel) => {
              this.luchador = resp;
              this.luchador.id = id;
          });

      }
  }

  guardar(form: NgForm) {

    if (form.invalid) {
      console.log('Formulario no válido')
      return;
    }

    Swal.fire({
      icon:'info',
      title: 'Espere por favor',
      text:'Guardando al luchador',
      allowOutsideClick: false
    });

    Swal.showLoading();
    
      let peticion: Observable<any>;

    if (this.luchador.id) {

      peticion = this.dojoService.actualizarLuchador(this.luchador);

    } else {

      peticion = this.dojoService.crearLuchador(this.luchador);
    }

    peticion.subscribe (resp => {

      Swal.fire({
        title: this.luchador.nombre,
        text: 'Se ha actualizó correctamente',
        icon: 'success'
      });
      
    })

  }
}
