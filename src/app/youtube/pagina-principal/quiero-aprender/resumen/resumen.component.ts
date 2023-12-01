import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {VideoYoutube} from "../../../interfaces/cursos.model";
import {VideoService} from "../../../servicios/video.service";
@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private youtubeService: VideoService
  ) { }

  ngOnInit(): void {

    if(this.data.video.resume.length <= 0){
      this.youtubeService.getResumen(this.data._id_temario, this.data.video.videoId).subscribe(
        response => {
          this.data.video.resume = response.resume
          this.data.video.transcription = response.transcription
        }
      )
    }
  }

}
