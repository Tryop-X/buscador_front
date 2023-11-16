export class RespuestaModel {
  correcto: boolean;
  respuesta: string;

  constructor(correcto: boolean, respuesta: string) {
    this.correcto = correcto;
    this.respuesta = respuesta;
  }
}

export class PreguntaModel {
  pregunta: string;
  respuestas: RespuestaModel[];

  constructor(pregunta: string, respuestas: RespuestaModel[]) {
    this.pregunta = pregunta;
    this.respuestas = respuestas;
  }
}

export class VideoModel {
  cod: string;
  similarity: number;
  title: string;
  url: string;

  constructor(cod: string, similarity: number, title: string, url: string) {
    this.cod = cod;
    this.similarity = similarity;
    this.title = title;
    this.url = url;
  }
}

export class CursoModel {
  tema: string;
  preguntas: PreguntaModel[];
  videos: VideoModel[];

  constructor() {
    this.tema = "";
    this.preguntas = [];
    this.videos = [];
  }
}
