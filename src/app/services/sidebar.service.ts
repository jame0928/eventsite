import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu:any[] = [{
    title:'Instancias',
    icon:'mdi mdi-human',
    url:'instance'   
  },
  {
    title:'Restaurantes',
    icon:'mdi mdi-food',
    url:'restaurant'   
  }];

  constructor() { }
}
