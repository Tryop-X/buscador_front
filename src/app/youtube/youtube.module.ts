import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { MatTabsModule } from '@angular/material/tabs';
import { QuieroAprenderComponent } from './pagina-principal/quiero-aprender/quiero-aprender.component';
import { ResumenComponent } from './pagina-principal/quiero-aprender/resumen/resumen.component';
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from '@angular/material/dialog';
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    FavoritosComponent,
    PaginaPrincipalComponent,
    QuieroAprenderComponent,
    ResumenComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    PaginaPrincipalComponent
  ]
})
export class YoutubeModule { }
