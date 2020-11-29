import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Usuario } from "../../interfaces/usuario.interface";
import { UsuarioService } from "../../services/usuario.service";
import { UiServiceService } from "../../services/ui-service.service";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
})
export class Tab3Page implements OnInit {
  usuario: Usuario = {};
  usuar: Usuario = {};
  constructor(
    private usuarioService: UsuarioService,
    private uiServiceService: UiServiceService
  ) {}
  ngOnInit() {
    this.usuar = this.usuarioService.getUsuario();
    this.usuario = this.usuar[0];
  }

  async actualizar(fActualizar: NgForm) {
    if (fActualizar.invalid) {
      return;
    }
    console.log(this.usuar);
    const actualizado = await this.usuarioService.actualizarUsuario(
      this.usuario
    );
    console.log(actualizado);
    if (actualizado) {
      //toast mensaje actualizado
      this.uiServiceService.presentToast("Registro actualizado!");
    } else {
      //toast error
      this.uiServiceService.presentToast(
        "No se ha podido actualizar el registro!"
      );
    }
  }

  logout() {}
}
