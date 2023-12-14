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

  private logout = new BehaviorSubject<string>('');
  logout$ = this.logout.asObservable()

  constructor(private httpClient: HttpClient) {
    if(localStorage.getItem("token")){
      this.token = JSON.parse(localStorage.getItem("token")!) || '';
    }
  }

  //public currentTab = "";

  loginOut(){
    this.logout.next("logout")
  }

  login(usuario: string, contrasegna: string) {
    this.loading = true;
    return this.httpClient.post<any>(
      `${this.apiUrl}/login`,
      {usuario: usuario, contrasegna: contrasegna}).subscribe(
        result => {
          this.token = result.token
          this.temarios = result.temarios
          this.loading = false;
          this.logout.next("")
        }, error => {
          this.loading = false;
          this.logout.next("logout")
          this.error = error.error.message
      }
    )
  }

  registrar(usuario: string, nombreUsuario: string, contrasegna: string) {
    this.loading = true;
    return this.httpClient.post<any>(
      `${this.apiUrl}/registrar`,
      {usuario: usuario, nombreUsuario: nombreUsuario, contrasegna: contrasegna}).subscribe(
      result => {
        this.token = result.idUsuario
        this.temarios = []
        this.loading = false;
        this.logout.next("")
      }, error => {
        this.loading = false;
        this.logout.next("logout")
        this.error = error.error.message
      }
    )
  }



  // -----------------------------------------------------------------------------------------------------

}
