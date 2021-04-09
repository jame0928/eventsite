import {Location} from './location.interface';
import { City } from './city.interface';
import { Country } from './country.interface';

export interface Address {	
	location?:Location,
    city?:City,
    country?:Country
}