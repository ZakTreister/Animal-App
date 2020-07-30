import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputDirective } from './directives/input.directive';
import { InputComponent } from './directives/input.component';



@NgModule({
  declarations: [
    InputDirective,
    InputComponent
  ],
  exports:[
    InputDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
