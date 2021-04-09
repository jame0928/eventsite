import { Injectable } from '@angular/core';
import { Address } from '@interfaces/eventsite/address.interface';
import PlaceResult = google.maps.places.PlaceResult;

@Injectable({
  providedIn: 'root'
})
export class GeocoderService {
  constructor() { 

  }

  formatAddress(place:PlaceResult,validateFullAddress:boolean = true){

    let formatAddress:Address = {
        city:{
            long_name:null
        },
        country:{long_name:null},
        location:{
            address:null,
            longitude:null,
            latitude:null,
        },
    };
    
    let street_number:boolean = false;
    let route:boolean = false;
    let postcode:string = '';

    for (const component of place.address_components as google.maps.GeocoderAddressComponent[]) {
        // @ts-ignore remove once typings fixed
        const componentType = component.types[0];
    
        switch (componentType) {
          case "street_number": {
            street_number = true;
            break;
          }
    
          case "route": {
            route = true;
            break;
          }
    
          case "locality":
            formatAddress.city.long_name = component.long_name;
          break;

          case "country":
            formatAddress.country.long_name = component.long_name;
            break;
        }
      }

      if(validateFullAddress){
          if(street_number && route){
            formatAddress.location.address = place.name;
          }else{
            formatAddress.location.address = null;
          }
      }else{
        formatAddress.location.address = place.name;
      }

      formatAddress.location.latitude = place?.geometry?.location?.lat();
      formatAddress.location.longitude = place?.geometry?.location?.lng();

      return formatAddress;

  }
}
