import { Component, OnInit, Input } from '@angular/core';
import {CursoModel} from "../../interfaces/cursos.model";
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {PreguntasComponent} from "./preguntas/preguntas.component";

@Component({
  selector: 'app-quiero-aprender',
  templateUrl: './quiero-aprender.component.html',
  styleUrls: ['./quiero-aprender.component.css']
})
export class QuieroAprenderComponent implements OnInit {

  @Input("estado") estado: boolean = false;
  @Input("cursos") cursos: CursoModel[] = [];



  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  abrirCurso(curso: CursoModel){
    this.dialog.open(PreguntasComponent, {
      width: '700px',
      data: curso,
    });
  }

}
