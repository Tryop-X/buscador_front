import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { YoutubeModule } from '../youtube/youtube.module';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    YoutubeModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class CompartidoModule { }
