import { Component, OnInit, Input } from '@angular/core';
import {Aspecto, ChatModel, TemarioModel, VideoYoutube} from "../../interfaces/cursos.model";
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ResumenComponent} from "./resumen/resumen.component";
import {VideoService} from "../../servicios/video.service";
import {FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-quiero-aprender',
  templateUrl: './quiero-aprender.component.html',
  styleUrls: ['./quiero-aprender.component.css']
})
export class QuieroAprenderComponent implements OnInit {

  @Input("estado") estado: boolean = false;
  @Input("temario") temario: TemarioModel = new TemarioModel();

  message = new FormControl('', [Validators.required]);
  chats: ChatModel[] = []

  constructor(
    public dialog: MatDialog,
    private youtubeService: VideoService
  ) { }

  ngOnInit(): void {
  }

  abrirCurso(video: VideoYoutube){
    this.dialog.open(ResumenComponent, {
      width: '700px',
      data: {_id_temario: this.temario.id_temario, video},
    });
  }

  preguntar(temario: TemarioModel){
    console.log(this.message)
    if(this.message.value) {
      this.youtubeService.getRespuestaChat(temario, this.message.value || "" ).subscribe(
        responde => {
          this.chats.push({pregunta: this.message.value || "" , respuesta: responde.respuesta})
        }
      )

    }
  }

  generarDocumento(temario: TemarioModel) {
    let videoSelected: string[] = []

    temario.aspectos.forEach( asp => {
      asp.videos.forEach( vid => {
        if (vid.isSelected) {
          videoSelected.push(vid.videoId)
        }
      });
    });

    this.youtubeService.generarDocumento(temario.id_temario, videoSelected).subscribe(
      responde => {
        const file = new Blob([responde], {type: 'application/pdf'});
        const fileURL = URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = fileURL;
        link.download = 'test.pdf';
        link.click();      }
    )

    console.log(videoSelected, 'videoSelected')

  }

  protected readonly Date = Date;
}
