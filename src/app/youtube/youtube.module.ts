import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    FavoritosComponent,
    PaginaPrincipalComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule
  ],
  exports: [
    PaginaPrincipalComponent
  ]
})
export class YoutubeModule { }
