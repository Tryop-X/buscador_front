import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { VideoService } from '../../youtube/servicios/video.service';
import { Subscription } from 'rxjs';
import {LoginService} from "../../youtube/servicios/login.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  constructor(
    private service:VideoService,
    private loginService: LoginService,
  ) { }

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

  buscarRuta(busqueda: string) {
    this.service.buscarTemario(busqueda, this.loginService.token, this.loginService.temarios);
    this.texto.nativeElement.value = "";
  }

}
