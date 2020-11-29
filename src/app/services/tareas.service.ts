import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Paginado } from "../interfaces/paginado.interface";
import { UsuarioService } from "./usuario.service";
import { Tareas } from "../interfaces/tareas.interface";

const url = environment.url;

@Injectable({
  providedIn: "root",
})
export class TareasService {
  // token: string = null;
  paginaPosts = 0;

  nuevoPosteo = new EventEmitter<Tareas>(); //se puede usar rxjs
  pagina: any;
  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) {}

  getTareas() {
    return this.http.get<Paginado>(`${url}/tareas`);
  }
  crearTarea(tarea) {
    const headers = new HttpHeaders({
      "x-token": this.usuarioService.token,
    });
    return new Promise((resolve) => {
      this.http
        .post(`${url}/crttarea`, tarea, { headers })
        .subscribe((respuesta) => {
          this.nuevoPosteo.emit(respuesta["tareas"]);
          resolve(true);
        });
    });
  }
}
