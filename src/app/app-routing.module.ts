import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnunciosComponent } from './components/anuncios/anuncios.component';
import { CrearAnuncioComponent } from './components/crear-anuncio/crear-anuncio.component';

const routes: Routes = [
  { path: 'crear-anuncio', component: CrearAnuncioComponent },
  { path: 'anuncios', component: AnunciosComponent },
  { path: '', pathMatch: 'full', redirectTo: 'anuncios' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
