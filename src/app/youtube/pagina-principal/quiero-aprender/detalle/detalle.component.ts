import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DocumentModel, VideoYoutube} from "../../../interfaces/cursos.model";
import {VideoService} from "../../../servicios/video.service";

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  document: DocumentModel = new DocumentModel()
  videos: VideoYoutube[] = []
  selectedValue: number = 0;
  error = "";
  loading = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private youtubeService: VideoService
  ) { }

  ngOnInit(): void {
    this.document = this.data.document;
    this.videos = this.data.videos;
    this.selectedValue = this.document.qualification
  }

  selectChip(value: number) {
    this.selectedValue = value;
  }
  descargarDoc() {
    this.loading = true;
    this.error = '';
    this.document.qualification = this.selectedValue
    this.youtubeService.getDocument(this.document).subscribe(
      docResult => {

        const file = new Blob([docResult], {type: 'application/pdf'});
        const fileURL = URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = fileURL;
        link.download = 'revision_sistematica.pdf';
        link.click();
        this.loading = false;
      }, errorResult => {
        this.loading = false;
        this.error = errorResult.error;
      }
    )
  }
}
