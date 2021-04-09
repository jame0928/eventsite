import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Modulos
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';


const routes: Routes = [

	//Application routes
  { path: '', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)},


  //Redirect to 404
	{ path: '**', component: NoPageFoundComponent },
];



@NgModule({
  imports: [
    RouterModule.forRoot( routes ),
    
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
