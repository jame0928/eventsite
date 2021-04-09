import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Material
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

//Routing module
import { PagesRoutingModule } from './pages.routing';

// Application modules
import { SharedModule } from '../shared/shared.module';

import {AgmCoreModule} from '@agm/core';
import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';

//Components
import { PagesComponent } from './pages.component';

//THRID PARTIES COMPONENTS
import { InstanceFormComponent } from './instance-form/instance-form.component';

//VEHICLES COMPONENTS
import { RestaurantComponent } from './restaurant/restaurant.component';
import { RestaurantFormComponent } from './restaurant/restaurant-form/restaurant-form.component';
import { RestaurantModalFormComponent } from './restaurant/restaurant-form/restaurant-modal-form/restaurant-modal-form.component';




@NgModule({
  imports: [ 
    CommonModule,
    FormsModule,
    SharedModule,
    PagesRoutingModule,  
    FormsModule,    
    ReactiveFormsModule,  
        
    MatTableModule,
    MatPaginatorModule,
		MatSortModule,
    MatCheckboxModule,    
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,

    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBYgB5U85_FQvovNgeDJhGVxUpVuP4AmgI',
      libraries: ['places']
    }),
    MatGoogleMapsAutocompleteModule
  ],
  declarations: [
    PagesComponent,
    InstanceFormComponent,

    RestaurantComponent,
    RestaurantFormComponent,
    RestaurantModalFormComponent
  ],
  exports: [
    PagesComponent,
  ],
  
})
export class PagesModule { }
