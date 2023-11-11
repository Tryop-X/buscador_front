import { Injectable } from '@angular/core';
import { Tema, Video, Youtube } from '../interfaces/youtube.inteface';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  constructor(private httpClient: HttpClient) {
    if(localStorage.getItem("Favoritos"))
    this.videosFavoritos = JSON.parse(localStorage.getItem("Favoritos")!) || [];
  }

  //public currentTab = "";
  private currentTab = new BehaviorSubject<string>("S"); // Cambia 'any' y 'valorInicial' según tus necesidades
  datosActuales = this.currentTab.asObservable();

  public videosBuscados: Video[] = [];
  public videosFavoritos: Video[] = [];
  public searchedRoute: Tema[] = [];
  public estaCargando: boolean = false;

  private limit: number = 12;

  buscarVideo(busqueda: string) {
    this.estaCargando = true;
    busqueda = busqueda.trim();
    busqueda = busqueda.toLowerCase();

    if((busqueda != "")) {
      this.httpClient.get<Video[]>(`https://guarded-hamlet-56098-47facf15e6f9.herokuapp.com/get_video?consulta=${busqueda}`)
        .subscribe(
        (respuesta) =>  {
        if(respuesta) {
          this.estaCargando = false;
        }

      this.videosBuscados = respuesta;
    });
    }
  }

  agregarVideoAFavoritos(video: Video) {
    if(!this.videosFavoritos.some(videoEnArray => videoEnArray.cod == video.cod)) {
      this.videosFavoritos.push(video);
      console.log(this.videosFavoritos);

      localStorage.setItem("Favoritos", JSON.stringify(this.videosFavoritos));
    }
  }

  borrarVideoFavorito(id: string) {
    let indice = this.videosFavoritos.findIndex(videoEnArray => videoEnArray.cod == id);
    if(indice != -1) {
      this.videosFavoritos.splice(indice, 1);
      localStorage.setItem("Favoritos", JSON.stringify(this.videosFavoritos));
    }
  }

  actualizarDatos(nuevosDatos: string) {
    this.currentTab.next(nuevosDatos);
  }

  // Implementar nuevo método --------------------------------------------------------------------------
  buscarRutas(busqueda: string) {
    this.estaCargando = true;
    busqueda = busqueda.trim();
    busqueda = busqueda.toLowerCase();

    if((busqueda != "")) {
      this.httpClient.get<Tema[]>(`https://guarded-hamlet-56098-47facf15e6f9.herokuapp.com/get_video?consulta=${busqueda}`)
        .subscribe(
        (respuesta) =>  {
        if(respuesta) {
          this.estaCargando = false;
        }

      this.searchedRoute = respuesta;
    });
    }
  }

  // -----------------------------------------------------------------------------------------------------

}
