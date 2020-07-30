import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CattleComponent } from './pages/cattle/cattle.component';

const routes: Routes = [
  { path: '', component: CattleComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
