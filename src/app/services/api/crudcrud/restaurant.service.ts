// Angular
import { Injectable } from '@angular/core';
//Base service
import {BaseApiService} from '@services/api/base-api.service';
//Enviroments
import { environment } from '@environments/environment';

@Injectable({
	providedIn:'root'
})
export class RestaurantService extends BaseApiService{
	// Public properties
	public url = environment.crudApiUrl+'restaurants/';
}
