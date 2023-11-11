import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { YoutubeService } from '../../youtube/servicios/youtube.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  constructor(private service:YoutubeService) { }

  //suscripcionDatos: Subscription;
  tituloImagen: string = "brand.png";
  currentTab: string = "";

  @ViewChild("texto") texto!:ElementRef<HTMLInputElement> ;

  ngOnInit() {
    this.service.datosActuales.subscribe(datos => {
      this.currentTab = datos;
      console.log(datos); // Aquí manejas los datos recibidos
    });
  }

  buscar(busqueda: string) {
    this.service.buscarVideo(busqueda);
    this.texto.nativeElement.value = "";
  }

  buscarRuta(busqueda: string) {
    this.service.buscarRutas(busqueda);
    this.texto.nativeElement.value = "";
  }
}
