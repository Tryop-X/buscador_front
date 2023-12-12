import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { MatTabsModule } from '@angular/material/tabs';
import { QuieroAprenderComponent } from './pagina-principal/quiero-aprender/quiero-aprender.component';
import { ResumenComponent } from './pagina-principal/quiero-aprender/resumen/resumen.component';
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from '@angular/material/dialog';
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { DetalleComponent } from './pagina-principal/quiero-aprender/detalle/detalle.component';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
  declarations: [
    FavoritosComponent,
    PaginaPrincipalComponent,
    QuieroAprenderComponent,
    ResumenComponent,
    DetalleComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatIconModule,
    MatExpansionModule,
    NgOptimizedImage,
    MatProgressSpinnerModule,
    MatChipsModule
  ],
  exports: [
    PaginaPrincipalComponent
  ]
})
export class YoutubeModule { }
