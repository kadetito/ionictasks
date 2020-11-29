import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TareasComponent } from "./tareas/tareas.component";
import { TareaComponent } from "./tarea/tarea.component";
import { IonicModule } from "@ionic/angular";
import { UsuariotareasComponent } from "./usuariotareas/usuario.component";
import { PipesModule } from "../pipes/pipes.module";
import { AvatarSelectorComponent } from "./avatar-selector/avatar-selector.component";
import { MapaComponent } from "./mapa/mapa.component";

@NgModule({
  declarations: [
    TareasComponent,
    TareaComponent,
    UsuariotareasComponent,
    AvatarSelectorComponent,
    MapaComponent,
  ],
  imports: [CommonModule, IonicModule, PipesModule],
  exports: [TareasComponent, UsuariotareasComponent, AvatarSelectorComponent],
})
export class ComponentsModule {}
