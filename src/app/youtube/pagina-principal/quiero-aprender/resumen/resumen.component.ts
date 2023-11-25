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
    @Inject(MAT_DIALOG_DATA) public data: VideoYoutube,
    private youtubeService: VideoService
  ) { }

  ngOnInit(): void {

    if(this.data.resume.length <= 0){
      this.youtubeService.getResumen(this.data).subscribe(
        response => {
          this.data.resume = response.resume
          this.data.transcription = response.transcription
        }
      )
    }
  }

}
