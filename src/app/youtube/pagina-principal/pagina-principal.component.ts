import { Component } from '@angular/core';
import { Video } from '../interfaces/youtube.inteface';
import { YoutubeService } from '../servicios/youtube.service';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent {

  constructor(private youtubeService:YoutubeService) { }

  get getVideos() {
    return this.youtubeService.videosBuscados;
  }

  get getEstado() {
    return this.youtubeService.estaCargando;
  }

  agregarVideo(video: Video) {
    this.youtubeService.agregarVideoAFavoritos(video);
  }
}
