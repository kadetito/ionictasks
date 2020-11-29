import { Tareas } from "./tareas.interface";

export interface Paginado {
  ok: boolean;
  pagina: number;
  tareas: Tareas[];
}
