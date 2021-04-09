export interface User {	
	first_name?: string;	
	last_name?: string,
	document_type_id?:number,	
	email?:string,
    phone?:{
        code?:number,
        number?:number,
    }
}