import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { VideoService } from '../servicios/video.service';
import {MatTabChangeEvent, MatTabGroup} from '@angular/material/tabs';
import {LoginService} from "../servicios/login.service";
import {TemarioModel} from "../interfaces/cursos.model";

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent implements OnInit{

  hide = true;
  usuario = '';
  contrasegna = '';
  nombreCompleto = '';
  isRegistro = false;
  @ViewChild(MatTabGroup) mattab!: MatTabGroup ;

  constructor(
    private youtubeService: VideoService,
    private loginService: LoginService,
  ) {

  }

  ngOnInit(): void {
    this.loginService.logout$.subscribe( value => {
      if (value === "logout") {
        this.nombreCompleto = '';
        this.contrasegna = '';
        this.usuario = '';
        this.isRegistro = false;
        this.mattab.selectedIndex = 0;
      }
    })
  }

  get getTemario() {
    return this.youtubeService.temario;
  }

  get getEstado() {
    return this.youtubeService.estaCargando;
  }

  get getToken() {
    return this.loginService.token
  }

  get getError() {
    return this.loginService.error
  }
  get getLoading() {
    return this.loginService.loading
  }

  get getListaTemario() {
    return this.loginService.temarios
  }

  login() {
    this.loginService.login(this.usuario, this.contrasegna)
  }

  registrar() {
    this.loginService.registrar(this.usuario, this.nombreCompleto, this.contrasegna)
  }


  revisar(temario: TemarioModel) {
    this.youtubeService.temario = temario
    this.mattab.selectedIndex = 1;
  }


  onTabChanged(event: MatTabChangeEvent): void {
    let current : string;
    if( event.index === 0 ){
      current = "S";
   }else{
      current = "R";
   }
    this.youtubeService.actualizarDatos(current);
  }
}
