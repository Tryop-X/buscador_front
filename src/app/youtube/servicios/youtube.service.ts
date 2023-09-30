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

  private api_key: string = "AIzaSyAdMSwiKNQevSh82RQHaEBGpoY1uYYX3xo";
  private limit: number = 12;

  buscarVideo(busqueda: string) {
    this.estaCargando = true;
    busqueda = busqueda.trim();
    busqueda = busqueda.toLowerCase();

    if((busqueda != "")) {
      this.httpClient.get<Youtube>(`https://www.googleapis.com/youtube/v3/search?key=${this.api_key}&q=${busqueda}&part=snippet&type=video&maxResults=${this.limit}`).subscribe((respuesta) =>  {
        if(respuesta) {
          this.estaCargando = false;
        }
        
      this.videosBuscados = respuesta.items;
    });
    }
  }

  agregarVideoAFavoritos(video: Video) {
    if(!this.videosFavoritos.some(videoEnArray => videoEnArray.id.videoId == video.id.videoId)) {
      this.videosFavoritos.push(video);
      console.log(this.videosFavoritos);
      
      localStorage.setItem("Favoritos", JSON.stringify(this.videosFavoritos));
    }
  }

  borrarVideoFavorito(id: string) {
    let indice = this.videosFavoritos.findIndex(videoEnArray => videoEnArray.id.videoId == id);
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
