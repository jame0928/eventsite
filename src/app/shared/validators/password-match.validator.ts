import { AbstractControl } from '@angular/forms';


/**
 * passwordMatchValidator: Valida que la contraseña y su confirmacion coincidan
 *
 * @export
 * @param {AbstractControl} control
 * @return {*} 
 */
export function passwordMatchValidator(control: AbstractControl) {       
    if(control?.parent){
        return (control.parent.controls['password'].value === control.value) ? null : {
            passwordMatch: true,
        }; 
    }
    
  }; 