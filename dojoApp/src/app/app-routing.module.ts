import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DojoComponent } from './pages/dojo/dojo.component';
import { LuchadorComponent } from './pages/luchador/luchador.component';

const routes: Routes = [
  { path: '', redirectTo: '/dojo', pathMatch: 'full' },
  { path: 'dojo', component: DojoComponent },
  { path: 'luchador/:id', component: LuchadorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
