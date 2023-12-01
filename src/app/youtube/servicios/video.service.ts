import { Injectable } from '@angular/core';
import { Tema, Video, Youtube } from '../interfaces/youtube.inteface';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from "../../../environments/environment";
import {TemarioModel, VideoYoutube} from "../interfaces/cursos.model";
@Injectable({
  providedIn: 'root'
})
export class VideoService {

  apiUrl = environment.api;

  constructor(private httpClient: HttpClient) {
    if(localStorage.getItem("Favoritos"))
    this.videosFavoritos = JSON.parse(localStorage.getItem("Favoritos")!) || [];
  }

  //public currentTab = "";
  private currentTab = new BehaviorSubject<string>("S"); // Cambia 'any' y 'valorInicial' según tus necesidades
  datosActuales = this.currentTab.asObservable();

  public videosBuscados: Video[] = [];
  public videosFavoritos: Video[] = [];
  public temario: TemarioModel = new TemarioModel();
  public estaCargando: boolean = false;

  private limit: number = 12;

  buscarVideo(busqueda: string) {
    this.estaCargando = true;
    busqueda = busqueda.trim();
    busqueda = busqueda.toLowerCase();

    if((busqueda != "")) {
      this.httpClient.get<Video[]>(`${this.apiUrl}/get_video?consulta=${busqueda}`)
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
  buscarTemario(busqueda: string) {
    this.estaCargando = true;
    busqueda = busqueda.trim();
    busqueda = busqueda.toLowerCase();

    if((busqueda != "")) {
      this.httpClient.post<any>(
        `${this.apiUrl}/get_temario`,
        {'consulta': busqueda})
        .subscribe(
        (respuesta) =>  {

        if(respuesta) {
          this.estaCargando = false;
        }
      this.temario = respuesta;
    });
    }
  }

  getResumen(id_temario: string, videoId: string) {
    return this.httpClient.post<any>(
      `${this.apiUrl}/get_resumen`,
      {id_temario: id_temario, videoId: videoId})
  }

  getRespuestaChat(temarioModel: TemarioModel, pregunta: string) {
    return this.httpClient.post<any>(
      `${this.apiUrl}/chatear`,
      {temario: temarioModel, pregunta: pregunta})
  }
  generarDocumento(idTemario: string, idsVideo: string[]) {
    return this.httpClient.post<any>(
      `${this.apiUrl}/generar_doc`,
      {id_temario: idTemario, videoSelected: idsVideo},     {responseType: 'blob' as 'json'})
  }
  // -----------------------------------------------------------------------------------------------------

}
