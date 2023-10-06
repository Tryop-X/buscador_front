import { Component, ViewChild, ElementRef } from '@angular/core';
import { YoutubeService } from '../../youtube/servicios/youtube.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private service:YoutubeService) { }

  tituloImagen: string = "brand.png";

  @ViewChild("texto") texto!:ElementRef<HTMLInputElement> ;

  buscar(busqueda: string) {
    this.service.buscarVideo(busqueda);
    this.texto.nativeElement.value = "";
  }

}
