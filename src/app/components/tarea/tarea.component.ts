import { Component, Input, OnInit } from "@angular/core";
import { Tareas } from "../../interfaces/tareas.interface";

@Component({
  selector: "app-tarea",
  templateUrl: "./tarea.component.html",
  styleUrls: ["./tarea.component.scss"],
})
export class TareaComponent implements OnInit {
  @Input() tarea: Tareas = {};

  img1 = "../assets/perro-1.jpg";
  img2 = "../assets/perro-2.jpg";
  img3 = "../assets/perro-3.jpg";

  constructor() {}

  ngOnInit() {}
}
