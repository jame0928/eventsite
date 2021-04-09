import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'afirmationNegation' })
export class AfirmationNegationPipe implements PipeTransform{
    /**
     * @param  {object} object 
     * @param  {Array} attrs Array de campos a concatenar
     * @returns an
     */
    transform(value: boolean = null): any {    
        if(value){
            return '<span class="text-success">Sí</span>';
        }

        return '<span class="text-danger">No</span>';
    }
}