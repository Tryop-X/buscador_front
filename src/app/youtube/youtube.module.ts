import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { MatTabsModule } from '@angular/material/tabs';
import { QuieroAprenderComponent } from './pagina-principal/quiero-aprender/quiero-aprender.component';
import { TemaComponent } from './pagina-principal/quiero-aprender/tema/tema.component';
import { PreguntasComponent } from './pagina-principal/quiero-aprender/preguntas/preguntas.component';
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    FavoritosComponent,
    PaginaPrincipalComponent,
    QuieroAprenderComponent,
    TemaComponent,
    PreguntasComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [
    PaginaPrincipalComponent
  ]
})
export class YoutubeModule { }
