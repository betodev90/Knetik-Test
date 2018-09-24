import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default-dark.css',
    tema: 'default'
  };

  constructor() { 
    this.cargarAjustes();
  }

  guardarAjustes() {
    console.log('Guardando en el localStorage');
    localStorage.setItem('ajustes', JSON.stringify( this.ajustes ));
  }
  cargarAjustes() {
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      console.log('Cargando del localStorage');
    }else{
      console.log('Usando valores por defecto');
    }
  }

}

interface Ajustes {
  temaUrl: string;
  tema: string;
}