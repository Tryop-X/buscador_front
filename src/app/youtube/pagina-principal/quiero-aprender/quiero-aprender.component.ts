import { Component, OnInit, Input } from '@angular/core';
import {Aspecto, ReqQues, DocumentModel, TemarioModel, VideoYoutube, ChatModel} from "../../interfaces/cursos.model";
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ResumenComponent} from "./resumen/resumen.component";
import {VideoService} from "../../servicios/video.service";
import {FormControl, Validators} from '@angular/forms';
import {LoginService} from "../../servicios/login.service";
import {DetalleComponent} from "./detalle/detalle.component";
import {YoutubeModule} from "../../youtube.module";
import {error} from "@angular/compiler-cli/src/transformers/util";
@Component({
  selector: 'app-quiero-aprender',
  templateUrl: './quiero-aprender.component.html',
  styleUrls: ['./quiero-aprender.component.css']
})
export class QuieroAprenderComponent implements OnInit {

  @Input("estado") estado: boolean = false;
  @Input("temario") temario: TemarioModel = new TemarioModel();

  message = new FormControl('', [Validators.required]);
  conversation: ReqQues[] = []
  documents: DocumentModel[] = []
  loadingPdf = false;
  errorPdf = '';
  loadingChat  = false;
  errorChat  = '';
  nuevaVista = true;
  chat = new ChatModel();
  constructor(
    public dialog: MatDialog,
    private youtubeService: VideoService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.nuevaVista = true;
  }

  abrirCurso(video: VideoYoutube){
    this.dialog.open(ResumenComponent, {
      width: '700px',
      data: {idTemario: this.temario.idTemario, video},
    });
  }

  preguntar(isPosible: boolean){
    if (isPosible) {
      return
    }

    this.errorChat = "";
    this.loadingChat = true;

    if(this.message.value) {
      let videoSelected: string[] = []
      this.temario.aspectos.forEach( asp => {
        asp.videos.forEach( vid => {
          if (vid.isSelected) {
            videoSelected.push(vid.videoId)
          }
        });
      });

      const model = {
        videoSelected,
        token: this.loginService.token,
        idTemario: this.temario.idTemario,
        pregunta: this.message.value,
        idChat: this.chat.idChat
      }

      this.youtubeService.getRespuestaChat(model).subscribe(
        response => {
          this.conversation.push({question: this.message.value || "" , response: response.respuesta, date: ''})
          this.loadingChat = false;
        }, error => {
          this.errorChat = error.error.message
          this.loadingChat = false;
        }
      )
    }
  }

  getDocuments(){
    this.loadingPdf = true;
    this.errorPdf = '';
    this.youtubeService.getDocuments(this.temario.idTemario, this.loginService.token).subscribe(
      responde => {
        this.documents = responde;
        this.loadingPdf = false;
      }, error => {
        this.loadingPdf = false;
        this.errorPdf = error.error.message
      }
    )
  }

  generarDocumento(temario: TemarioModel) {
    this.loadingPdf = true;
    this.errorPdf = '';
    let videoSelected: string[] = []
    temario.aspectos.forEach( asp => {
      asp.videos.forEach( vid => {
        if (vid.isSelected) {
          videoSelected.push(vid.videoId)
        }
      });
    });
    this.youtubeService.generarDocumento(temario.idTemario, videoSelected, this.loginService.token).subscribe(
      responde => {
        const file = new Blob([responde], {type: 'application/pdf'});
        const fileURL = URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = fileURL;
        link.download = 'revision_sistematica.pdf';
        link.click();
        this.loadingPdf = false;
        this.getDocuments()
      }, error => {
        this.loadingPdf = false;
        this.errorPdf = error.error.message
      }
    )

  }

  abrirDetalle(doc: DocumentModel){
    let videos: VideoYoutube[] = []
    this.temario.aspectos.forEach( asp => {
      asp.videos.forEach( vid => {
        if (doc.citas.includes(vid.videoId)) {
          videos.push(vid)
        }
      });
    });


    this.dialog.open(DetalleComponent, {
      width: '500px',
      data: {document: doc, videos},
    });
  }

  getConversation() {
    this.loadingChat = true;
    this.chat.conversation = [];
    const model = {
      idTemario: this.temario.idTemario,
      token: this.loginService.token
    }
    this.youtubeService.getConversarion(model).subscribe(
      response => {
        this.loadingChat = false;

        this.chat = response
        this.conversation = this.chat.conversation ? this.chat.conversation : []
      }, error => {
        console.log(error)
        this.loadingChat = false;
        this.errorChat = error.error.message
      }
    )
  }

  getSelectedVideo(videos: any){

  }

}
