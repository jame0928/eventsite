import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { Restaurant } from '@interfaces/crudcrud/restaurant.interface';

//Forms
import { RestaurantModalFormComponent } from './restaurant-modal-form/restaurant-modal-form.component';

@Component({
  selector: 'restaurant-form',
  templateUrl: './restaurant-form.component.html',
  styleUrls: []
})
export class RestaurantFormComponent implements OnInit {

  @Input() restaurant:Restaurant = null;
  @Output() success = new EventEmitter<any>();

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    
  }



  /**
   * admRestaurant: Se encarga de abrir el modal del formulario, y ejecuta la funcion success, recibida en el @Input() success
   *
   * @memberof RestaurantFormComponent
   */
  admRestaurant(){ 
    const dialogRef = this.dialog.open(RestaurantModalFormComponent, { data: {
      restaurant:this.restaurant
    },disableClose:true });
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
      }
      if(this.success){
        this.success.emit(res);
      }
		});

  }

}