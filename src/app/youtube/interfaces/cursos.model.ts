export class Aspecto {
  aspecto: string;
  temas: string[];
  videos: VideoYoutube[];

  constructor() {
    this.aspecto = "";
    this.temas = [];
    this.videos = [];
  }
}

export class VideoYoutube {
  etag: string;
  videoId: string;
  channelId: string;
  title: string;
  description: string;
  channelTitle: string;
  publishTime: string;
  urlMiniatura: string;
  transcription: string;
  resume: string;
  isSelected: boolean;

  constructor( ) {
    this.etag = '';
    this.videoId = '';
    this.channelId = '';
    this.title = '';
    this.description = '';
    this.channelTitle = '';
    this.publishTime = '';
    this.urlMiniatura = '';
    this.transcription = '';
    this.resume = '';
    this.isSelected = false;
  }
}

export class TemarioModel {
  idTemario: string;
  temaCentral: string;
  aspectos: Aspecto[];

  constructor() {
    this.idTemario = "";
    this.temaCentral = "";
    this.aspectos = [];
  }
}

export class ReqQues {
  response: string;
  question: string;
  date: string;


  constructor() {
    this.question = "";
    this.response = "";
    this.date = "";
  }
}

export class ChatModel {
  idChat: string;
  idTemario: string;
  idUsuario: string;
  date: string;
  conversation: ReqQues[];

  constructor() {
    this.idChat = "";
    this.idTemario = "";
    this.idUsuario = "";
    this.date = "";
    this.conversation = [];
  }
}



export class DocumentModel {
  idDocument: string;
  idUsuario: string;
  idTemario: string;
  temaCentral: string;
  contendPdf: string;
  qualification: number;
  citas: string[];
  date: string;

  constructor() {
    this.idDocument = '';
    this.idUsuario = '';
    this.idTemario = '';
    this.temaCentral = '';
    this.contendPdf = '';
    this.qualification = -1;
    this.citas = [];
    this.date = '';
  }
}

