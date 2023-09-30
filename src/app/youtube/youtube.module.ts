import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';

@NgModule({
  declarations: [
    FavoritosComponent,
    PaginaPrincipalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PaginaPrincipalComponent
  ]
})
export class YoutubeModule { }
