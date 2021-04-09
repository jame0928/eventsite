import { FormControl, ValidationErrors } from '@angular/forms';


/**
 * fullAddressRequired: Recibe un arreglo de controles de los cuales si alguno 
 * contiene un error se activa esta validacion
 *
 * @param {string[]} [controls=null]
 */
export const fullAddressRequired = (controls:string[] = null) => (
    control: FormControl,
  ): ValidationErrors | null => {

    if(control?.parent){
        let invalid = false;
        controls.forEach(thisControl => {
            console.log(control?.parent.get(thisControl))
            if(control?.parent.get(thisControl).invalid){
                invalid = true;
                return ;
            }
        })
        return (invalid)?{fullAddressRequired:true}:null;
    }
  };
