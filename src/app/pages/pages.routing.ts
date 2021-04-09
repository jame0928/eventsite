import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

//Guards
import { AuthGuard } from '../guards/auth.guard';

//Components
import { PagesComponent } from './pages.component';
import { InstanceFormComponent } from './instance-form/instance-form.component';
import { RestaurantComponent } from './restaurant/restaurant.component';

const routes: Routes = [
    { 
        path: 'home', 
        component: PagesComponent,
        canActivate:[AuthGuard],
        children: [
            { path: 'instance', component: InstanceFormComponent },
            { path: 'restaurant', component: RestaurantComponent },
            { path: '', redirectTo: 'instance', pathMatch: 'full'},
        ]
    },
    { path: '', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}


