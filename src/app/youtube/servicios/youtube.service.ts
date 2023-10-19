import { Injectable } from '@angular/core';
import { Video, Youtube } from '../interfaces/youtube.inteface';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  constructor(private httpClient: HttpClient) {
    if(localStorage.getItem("Favoritos"))
    this.videosFavoritos = JSON.parse(localStorage.getItem("Favoritos")!) || [];
  }

  public videosBuscados: Video[] = [];
  public videosFavoritos: Video[] = [];
  public estaCargando: boolean = false;

  private limit: number = 12;

  buscarVideo(busqueda: string) {
    this.estaCargando = true;
    busqueda = busqueda.trim();
    busqueda = busqueda.toLowerCase();

    if((busqueda != "")) {
      this.httpClient.get<Video[]>(`http://127.0.0.1:5000/get_video?consulta=${busqueda}`)
        .subscribe(
        (respuesta) =>  {
        if(respuesta) {
          console.log("llego")
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

  borrarTodosFavoritos() {
    Swal.fire({
      title: '¿Seguro que quieres borrar todos los vídeos?',
      text: "No podrás deshacer los cambios!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar todo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.videosFavoritos = [];
        localStorage.setItem("Favoritos", JSON.stringify(this.videosFavoritos));
        Swal.fire(
          'Borrado!',
          'Se han borrado todos los vídeos.',
          'success'
        )
      }
    })
  }

}
