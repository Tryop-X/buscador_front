import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CursoModel} from "../../../interfaces/cursos.model";
@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CursoModel
  ) { }

  ngOnInit(): void {
  }

}
