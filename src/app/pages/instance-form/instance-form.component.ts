import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import PlaceResult = google.maps.places.PlaceResult;

//services
import {InstanceService} from '@services/api/eventsite/instance.service';
import { Instance } from 'app/interfaces/eventsite/instance.interface';

//Validators
import { passwordMatchValidator } from '@shared/validators/password-match.validator';
import { fullAddressRequired } from '@shared/validators/full-address-required.validator';
import { GeocoderService } from '@services/geocoder.service';
import { Address } from '@interfaces/eventsite/address.interface';



@Component({
  selector: 'instance-form',
  templateUrl: './instance-form.component.html',
  styleUrls: []
})
export class InstanceFormComponent implements OnInit {

  autoCity: Observable<any[]>;

  // Public properties
  id:number; 
  instance:Instance;
  instanceForm: FormGroup;
  hasFormErrors: boolean = false;
  is_new:boolean = true;
  viewLoading: boolean = false;


  
  @Input() childMessage: string;

  constructor(
    private fb: FormBuilder,
    private geocoderService:GeocoderService,
    public instanceService: InstanceService,
  ) { }

  
  
  ngOnInit() {  
    this.createForm();
  } 


  /**
   * createForm: Instancia el formulario, con sus respectivos campos
   *
   * @memberof InstanceFormComponent
   */
  createForm() {
		this.instanceForm = this.fb.group({    

      user:this.fb.group({
        first_name: [null, Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(150)])], 
        last_name: [null, Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(150)])], 
        email: [null, Validators.compose([Validators.required,Validators.email])], 
        password: [null, Validators.compose([Validators.required,Validators.minLength(6),Validators.maxLength(20)])], 
        re_password: [null, Validators.compose([passwordMatchValidator])], 
        phone: this.fb.group({
          code: ['+57'], 
          number: [null], 
        })
      }),

      customer:this.fb.group({
        name: [null, Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(150)])],         
        number_of_branches: [null, Validators.compose([Validators.required,Validators.min(1)])],

        service_book: [null],
        service_delivery: [null],
        service_table: [null],
        service_take_away: [null],
      }),

      location:this.fb.group({
        latitude: [null, Validators.compose([Validators.required])],         
        longitude: [null, Validators.compose([Validators.required])],
        address: [null, Validators.compose([Validators.required,Validators.maxLength(150)])],
      }),
      
      city:this.fb.group({
        long_name: [null, Validators.compose([Validators.required])]
      }),
      
      country:this.fb.group({
        long_name: [null, Validators.compose([Validators.required])]
      }),

      search_address:[null, Validators.compose([Validators.required,fullAddressRequired(['location','city','country'])])]
    });
    
    
  }



  /**
   * user: Devuelve la instancia correspondiente al grupo user del formulario
   *
   * @readonly
   * @memberof InstanceFormComponent
   * @returns user:FormGroup
   */
  get user(){
    return this.instanceForm.get('user') as FormGroup;
  }

  
  
  /**
   * phone: Devuelve la instancia correspondiente al grupo phone del formulario
   *
   * @readonly
   * @memberof InstanceFormComponent
   * @returns phone:FormGroup
   */
  get phone(){
    return this.instanceForm.get('user').get('phone') as FormGroup;
  }
  


  /**
   * customer: Devuelve la instancia correspondiente al grupo customer del formulario
   *
   * @readonly
   * @memberof InstanceFormComponent
   * @return customer:FormGroup
   */
  get customer(){
    return this.instanceForm.get('customer') as FormGroup;
  }


  /**
   * onAutocompleteSelected: se activa al seleccionar un sitio mediante el componente google-place
   * Luego formatea la data por medio del servicio geocoderService.formatAddress($e), y asigna los datos al formulario
   *
   * @param {PlaceResult} $e
   * @memberof InstanceFormComponent
   */
  onAutocompleteSelected($e:PlaceResult){
    const formatAddress:Address = this.geocoderService.formatAddress($e);
    this.instanceForm.patchValue(formatAddress);
    this.instanceForm.get('search_address').updateValueAndValidity();
  }




  /**
   * onSubmit: Valida el formulario, y realiza el envio de la data al backend
   *
   * @param {any} instanceFormValues
   * @memberof InstanceFormComponent
   */
  onSubmit(instanceFormValues:any) {
    //validate form errors
    if(this.hasFormErrors = this.instanceService.validateFormErrors(this.instanceForm)){
      return;
    }   
    const data = {
      wizard:instanceFormValues
    }

    this.instanceService.save(data)
    .subscribe(response => {    
      window.location.reload();
    });

	}

}
