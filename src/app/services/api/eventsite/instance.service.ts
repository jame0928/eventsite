// Angular
import { Injectable } from '@angular/core';
//Base service
import {BaseApiService} from '@services/api/base-api.service';
//Enviroments
import { environment } from '@environments/environment';

@Injectable({
	providedIn:'root'
})
export class InstanceService extends BaseApiService{
	// Public properties
	public url = environment.evensiteApiUrl+'wizard/create_full.json';
}
