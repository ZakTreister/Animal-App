import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CattleComponent } from './cattle/cattle.component';
import { SharedModule } from 'src/@shared/shared.module';

@NgModule({
  declarations: [CattleComponent],
  exports: [CattleComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class PagesModule { }
