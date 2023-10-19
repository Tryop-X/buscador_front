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
  convertSecondsToMinutes(seconds: number, duration: number): string {
    if (!Number.isFinite(seconds) || !Number.isFinite(duration)) {
      return '';
    }

    // Convertir el valor inicial 'seconds' a minutos y segundos
    const initialMinutes: number = Math.floor(seconds / 60);
    const initialSeconds: number = seconds - initialMinutes * 60;

    // Sumar 'seconds' y 'duration' y luego convertir el resultado a minutos y segundos
    const totalSeconds: number = seconds + duration;
    const totalMinutes: number = Math.floor(totalSeconds / 60);
    const remainingSeconds: number = totalSeconds - totalMinutes * 60;

    // Devolver el string en el formato deseado
    return `${initialMinutes}m ${initialSeconds.toFixed(0)}s - ${totalMinutes}m ${remainingSeconds.toFixed(0)}s`;
  }
}
