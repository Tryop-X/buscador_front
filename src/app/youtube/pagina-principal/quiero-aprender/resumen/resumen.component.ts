import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {VideoYoutube} from "../../../interfaces/cursos.model";
import {VideoService} from "../../../servicios/video.service";
@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

  loadingResumen = false;
  errorResumen = '';


  constructor(
    public dialogRef: MatDialogRef<ResumenComponent>,  // Inyecta MatDialogRef aquí
    @Inject(MAT_DIALOG_DATA) public data: any,
    private youtubeService: VideoService
  ) { }

  ngOnInit(): void {
    if(this.data.video.resume.length <= 0){
      this.loadingResumen = true;
      this.errorResumen = '';
      this.youtubeService.getResumen(this.data.idTemario, this.data.video.videoId).subscribe(
        response => {
          this.loadingResumen = false;
          this.data.video.resume = response.resume
          this.data.video.transcription = response.transcription
        }, error => {
          this.errorResumen = error.error.message;
        }
      )
    }
  }

  close() {
    this.dialogRef.close();
  }


}
