import { Injectable } from '@angular/core';
import { Tema, Video, Youtube } from '../interfaces/youtube.inteface';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from "../../../environments/environment";
import {DocumentModel, TemarioModel, VideoYoutube} from "../interfaces/cursos.model";
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

  public videosFavoritos: Video[] = [];
  public temario: TemarioModel = new TemarioModel();
  public estaCargando: boolean = false;

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
  buscarTemario(busqueda: string, token: string, temarios: TemarioModel[]) {
    this.estaCargando = true;
    busqueda = busqueda.trim();
    busqueda = busqueda.toLowerCase();
    if((busqueda != "")) {
      this.httpClient.post<any>(
        `${this.apiUrl}/get_temario`,
        {'consulta': busqueda, token})
        .subscribe(
        (respuesta) =>  {
        if(respuesta) {
          this.estaCargando = false;
        }
        this.temario = respuesta;
        if(!temarios.map(tem => tem.idTemario).includes(this.temario.idTemario)){
          temarios.push(this.temario)
        }
    });
    }
  }

  getResumen(id_temario: string, videoId: string) {
    return this.httpClient.post<any>(
      `${this.apiUrl}/get_resumen`,
      {id_temario: id_temario, videoId: videoId})
  }

  getRespuestaChat(model: any) {
    return this.httpClient.post<any>(
      `${this.apiUrl}/chatear`, model)
  }
  generarDocumento(idTemario: string, idsVideo: string[], token: string) {
    return this.httpClient.post<any>(
      `${this.apiUrl}/generar_doc`,
      {id_temario: idTemario, videoSelected: idsVideo, token},     {responseType: 'blob' as 'json'})
  }

  getDocuments(idTemario: string, token: string) {
    return this.httpClient.post<any>(
      `${this.apiUrl}/get_documents`,
      {idTemario: idTemario, token})
      }
  getDocument(doc: DocumentModel) {
    return this.httpClient.post<any>(
      `${this.apiUrl}/get_document`,
      doc,{responseType: 'blob' as 'json'}
    )
  }

  // -----------------------------------------------------------------------------------------------------

}
