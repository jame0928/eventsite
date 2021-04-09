import { Component, OnInit, Inject, OnDestroy, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

//services
import {RestaurantService} from '@services/api/crudcrud/restaurant.service';
//Interfaces
import { Restaurant } from '@interfaces/crudcrud/restaurant.interface';




@Component({
  selector: 'restaurant-modal-form',
  templateUrl: './restaurant-modal-form.component.html',
  styleUrls: []
})
export class RestaurantModalFormComponent implements OnInit,OnDestroy {

  autoCity: Observable<any[]>;

  // Public properties
  id:number; 
  restaurant:Restaurant = null;
  restaurantForm: FormGroup;
  hasFormErrors: boolean = false;
  is_new:boolean = true;
  viewLoading: boolean = false;
  
  @Input() childMessage: string;



  /**
   * constructor: Inyección de dependencias necesarias para el componente
   * @param {MatDialogRef<RestaurantModalFormComponent>} dialogRef
   * @param {*} data
   * @param {FormBuilder} fb
   * @param {RestaurantService} restaurantService
   * @memberof RestaurantModalFormComponent
   */
  constructor(
    public dialogRef: MatDialogRef<RestaurantModalFormComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public restaurantService: RestaurantService,
  ) { }



  /**
   * ngOnInit: Asigna los datos de la variable restaurant recibida en la data del modal, a la variable restaurant local
   * e inicializa el formulario
   *
   * @memberof RestaurantModalFormComponent
   */
  ngOnInit() {     
    this.restaurant = this.data?.restaurant || null;    
    this.createForm();
  } 



 /**
  * createForm: Intancia el formulario, con todos los campos necesarios
  *
  * @memberof RestaurantModalFormComponent
  */
 createForm() {
		this.restaurantForm = this.fb.group({    
      name: [this.restaurant?.name, Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(150)])], 
      address: [this.restaurant?.address, Validators.compose([Validators.required,Validators.maxLength(150)])],
      number_of_branches: [this.restaurant?.number_of_branches, Validators.compose([Validators.required,Validators.min(1)])],

      service_book: [this.restaurant?.service_book],
      service_delivery: [this.restaurant?.service_delivery],
      service_room: [this.restaurant?.service_room],
      service_table: [this.restaurant?.service_table],
      service_take_away: [this.restaurant?.service_take_away],
    });
    
    
  }



  /**
   * onSubmit: Se encarga de validar los datos del formulario, y enviarlos al backend
   *
   * @param {*} restaurantFormValues
   * @memberof RestaurantModalFormComponent
   */
  onSubmit(restaurantFormValues:any) {
    
    //validate form errors
    if(this.hasFormErrors = this.restaurantService.validateFormErrors(this.restaurantForm)){
      return;
    }    

    if(this.restaurant?._id){
      restaurantFormValues.id = this.restaurant._id;
    }
    

    this.restaurantService.save(restaurantFormValues)
    .subscribe(response => {
        this.dialogRef.close({ response:response});       
    });

	}
  

	getTitle(): string {
		if (this.restaurant?._id) {
			return `Editando Restaurante`;
		}

		return 'Creando Restaurante';
  }
  

  ngOnDestroy() {

	}

}
