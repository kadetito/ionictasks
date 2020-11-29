import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TareasService } from "../../services/tareas.service";
import { UsuarioService } from "../../services/usuario.service";
import { Usuario } from "../../interfaces/usuario.interface";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
declare var window: any;
@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page implements OnInit {
  tempImages: string[] = [];
  cargandoGeo = false;
  myuser: Usuario = this.usuarioService.getUsuario();
  tarea_asignada = this.myuser[0].id_persona;
  tarea = {
    tarea_tarea: "",
    tarea_descripcion: "",
    tarea_asignada: this.tarea_asignada,
    tarea_coordenadas: null,
    posicion: false,
  };
  constructor(
    private usuarioService: UsuarioService,
    private tareasService: TareasService,
    private route: Router,
    private geolocation: Geolocation,
    private camera: Camera
  ) {}

  ngOnInit() {}

  async crearPost() {
    console.log("USUARIO:", this.tarea);

    const creado = await this.tareasService.crearTarea(this.tarea);
    this.tarea = {
      tarea_tarea: "",
      tarea_descripcion: "",
      tarea_asignada: this.tarea_asignada,
      tarea_coordenadas: null,
      posicion: false,
    };
    this.route.navigateByUrl("/main/tabs/tab1");
  }

  getGeo() {
    if (!this.tarea.posicion) {
      this.tarea.tarea_coordenadas = null;
      return;
    }
    this.cargandoGeo = true;

    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        this.cargandoGeo = false;
        const coords = `${resp.coords.latitude},${resp.coords.longitude}`;
        console.log(coords);
        this.tarea.tarea_coordenadas = coords;
      })
      .catch((error) => {
        console.log("Error getting location", error);
        this.cargandoGeo = false;
      });
  }

  camara() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA,
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        const imagen = window.Ionic.WebView.convertFileSrc(imageData);
        console.log(imagen);
        this.tempImages.push(imagen);
      },
      (err) => {
        // Handle error
      }
    );
  }
}
