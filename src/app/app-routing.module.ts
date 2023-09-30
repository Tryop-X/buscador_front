import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritosComponent } from './youtube/favoritos/favoritos.component';
import { PaginaPrincipalComponent } from './youtube/pagina-principal/pagina-principal.component';

const routes: Routes = [
  {path: '', component: PaginaPrincipalComponent},
  {path: 'favoritos', component: FavoritosComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
