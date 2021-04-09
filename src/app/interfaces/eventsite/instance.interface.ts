import { City } from "./city.interface";
import { Country } from "./country.interface";
import { Customer } from "./customer.interface";
import { User } from "./user.interface";

export interface Instance {	
	user?:User,
    customer?:Customer,
    location?:Location,
    city?:City,
    country?:Country
}