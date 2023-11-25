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
      data: video,
    });
  }

  preguntar(video: TemarioModel){
    console.log(this.message)
    if(this.message.value) {
      this.youtubeService.getRespuestaChat(video, this.message.value || "" ).subscribe(
        responde => {
          this.chats.push({pregunta: this.message.value || "" , respuesta: responde.respuesta})
        }
      )

    }
  }

}
