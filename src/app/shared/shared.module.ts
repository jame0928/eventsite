import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { AfirmationNegationPipe } from './pipes/afirmation-negation.pipe';



@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    AfirmationNegationPipe
  ],  
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SidebarComponent,
    HeaderComponent,
    AfirmationNegationPipe
  ],
})
export class SharedModule { }
