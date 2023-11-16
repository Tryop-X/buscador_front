import { Component } from '@angular/core';
import { VideoService } from '../servicios/video.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent {

  constructor(private service:VideoService) { }

  get getVideosFavoritos() {
    return this.service.videosFavoritos;
  }

  borrarVideoFavorito(id: string) {
    this.service.borrarVideoFavorito(id);
  }

  borrarTodosFavoritos() {
  }

}
