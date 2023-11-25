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

  constructor(
    etag: string,
    videoId: string,
    channelId: string,
    title: string,
    description: string,
    channelTitle: string,
    publishTime: string,
    urlMiniatura: string
  ) {
    this.etag = etag
    this.videoId = videoId
    this.channelId = channelId
    this.title = title
    this.description = description
    this.channelTitle = channelTitle
    this.publishTime = publishTime
    this.urlMiniatura = urlMiniatura
    this.transcription = urlMiniatura
    this.resume = urlMiniatura
  }
}

export class TemarioModel {
  temaCentral: string;
  aspectos: Aspecto[];

  constructor() {
    this.temaCentral = "";
    this.aspectos = [];
  }
}

export class ChatModel {
  pregunta: string;
  respuesta: string;

  constructor() {
    this.pregunta = "";
    this.respuesta = "";
  }
}

