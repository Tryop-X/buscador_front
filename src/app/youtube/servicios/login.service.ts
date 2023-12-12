import { Injectable } from '@angular/core';
import { Tema, Video, Youtube } from '../interfaces/youtube.inteface';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from "../../../environments/environment";
import {TemarioModel, VideoYoutube} from "../interfaces/cursos.model";
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl = environment.api;

  public token: string = '';
  public error: string = '';
  public loading = false;
  public temarios: TemarioModel[] = [];


  constructor(private httpClient: HttpClient) {
    if(localStorage.getItem("token")){
      this.token = JSON.parse(localStorage.getItem("token")!) || '';
    }
  }

  //public currentTab = "";


  login(usuario: string, contrasegna: string) {
    this.loading = true;
    return this.httpClient.post<any>(
      `${this.apiUrl}/login`,
      {usuario: usuario, contrasegna: contrasegna}).subscribe(
        result => {
          this.token = result.token
          this.temarios = result.temarios
          console.log(this.temarios)
          this.loading = false;
        }, error => {
          this.loading = false;
          console.log(error)
          this.error = 'Ha sucedido un error al intentar iniciar sesión'
      }
    )
  }


  // -----------------------------------------------------------------------------------------------------

}
