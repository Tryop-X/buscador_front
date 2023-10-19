import { Component } from '@angular/core';
import { YoutubeService } from '../servicios/youtube.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent {

  constructor(private service:YoutubeService) { }

  get getVideosFavoritos() {
    return this.service.videosFavoritos;
  }

  borrarVideoFavorito(id: string) {
    this.service.borrarVideoFavorito(id);
  }

  borrarTodosFavoritos() {
  }

}
