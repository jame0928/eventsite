import { Component, OnInit, ChangeDetectionStrategy, ViewChild, AfterViewInit } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import swal from 'sweetalert2';

//Services
import {RestaurantService} from '@services/api/crudcrud/restaurant.service';
import { TableDataSourceService } from '@services/table-data-source.service';
import { Restaurant } from '@interfaces/crudcrud/restaurant.interface';



@Component({
  selector: 'restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush 
})

export class RestaurantComponent implements AfterViewInit,OnInit {

  displayedColumns = [
    'name',
    'address',
    'number_of_branches',
    'service_book',
    'service_delivery',
    'service_room',
    'service_table',
    'service_take_away',
    'actions'
  ];
  dataSource: TableDataSourceService;

  
  @ViewChild(MatPaginator,{ static: true }) paginator: MatPaginator;
  @ViewChild(MatSort,{ static: true }) sort: MatSort;


  /**
   * constructor: Inyectamos las dependencias necesarias para el funcionamiento del componente
   * @param {RestaurantService} restaurantService
   * @memberof RestaurantComponent
   */
  constructor(
    public restaurantService: RestaurantService
  ) {
    
  }


  /**
   * ngOnInit: Inicializamos el dataSource que se encarga de gestionar los datos de la tabla
   *
   * @memberof RestaurantComponent
   */
  ngOnInit() {    
    this.dataSource = new TableDataSourceService(this.restaurantService,this.paginator,this.sort);
  }



  /**
   * deleteRestaurant: Metodo que nos permite eliminar un resturante, y refresca los datos de la tabla al finalizar
   *
   * @param {Restaurant} restaurant
   * @memberof RestaurantComponent
   */
  deleteRestaurant(restaurant:Restaurant){
    swal.fire({
			title: '¿ Esta seguro(a) ?',
			text: '¿ De eliminar este restaurante?',			
      showCancelButton:true,
      confirmButtonText:'Si',
      cancelButtonText:'No',
		}).then((result) => {
			if (result.value) {
        
				this.restaurantService.delete(restaurant._id).subscribe(response => {
          this.dataSource.loadData()
        });
			}
		})
  }



  /**
   * ngAfterViewInit: Una vez cargado nuestor componente, inicializamos la paginación de la tabla
   *
   * @memberof RestaurantComponent
   */
  ngAfterViewInit() {
    this.dataSource.initPaginator();
  }
}

