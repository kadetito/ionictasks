import { Component, Input, OnInit } from "@angular/core";
import { Tareas } from "../../interfaces/tareas.interface";

@Component({
  selector: "app-tareas",
  templateUrl: "./tareas.component.html",
  styleUrls: ["./tareas.component.scss"],
})
export class TareasComponent implements OnInit {
  @Input() tareas: Tareas[] = [];

  constructor() {}

  ngOnInit() {}
}
