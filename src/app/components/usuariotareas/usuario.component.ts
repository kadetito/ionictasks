import { Component, Input, OnInit } from "@angular/core";
import { Usuario } from "../../interfaces/usuario.interface";
import { UsuarioService } from "../../services/usuario.service";
import { Tareas } from "../../interfaces/tareas.interface";

@Component({
  selector: "app-usuario",
  templateUrl: "./usuario.component.html",
  styleUrls: ["./usuario.component.scss"],
})
export class UsuariotareasComponent implements OnInit {
  @Input() tarea: Tareas = {};

  user: Usuario = {};
  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    const userId = this.tarea.tarea_asignada;
    this.usuarioService.getUsuarioTarea(userId).subscribe((respuesta: any) => {
      this.user = respuesta.usuario[0];
    });
  }
}
