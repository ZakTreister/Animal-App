import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputDirective } from './directives/input.directive';
import { InputComponent } from './directives/input.component';
import { TableComponent } from './components/table/table.component';


@NgModule({
  declarations: [
    InputDirective,
    InputComponent,
    TableComponent
  ],
  exports: [
    TableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
