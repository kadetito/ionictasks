import { Component, OnInit } from "@angular/core";
import { TareasService } from "../../services/tareas.service";
import { Tareas } from "../../interfaces/tareas.interface";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page implements OnInit {
  tareas: Tareas[] = [];
  constructor(private tareasService: TareasService) {}

  ngOnInit() {
    this.siguientes();
    this.tareasService.nuevoPosteo.subscribe((posteo) => {
      this.tareas.unshift(posteo);
    });
  }

  recargar(event) {
    this.siguientes(event, true);
  }

  siguientes(event?, pull: boolean = false) {
    this.tareasService.getTareas().subscribe((respuesta) => {
      this.tareas.push(...respuesta.tareas);

      if (event) {
        event.target.complete();

        if (pull === false) {
          if (respuesta.tareas.length === respuesta.tareas.length) {
            event.target.disabled = true;
          }
        }
      }
    });
  }
}
