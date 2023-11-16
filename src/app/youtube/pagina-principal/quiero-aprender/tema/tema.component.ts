import { Component, OnInit, Input } from '@angular/core';
import {CursoModel} from "../../../interfaces/cursos.model";

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {
  @Input("tema") tema: CursoModel = new CursoModel()

  constructor() { }

  ngOnInit(): void {
  }



}
