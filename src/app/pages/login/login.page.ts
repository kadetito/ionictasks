import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { IonSlides, NavController } from "@ionic/angular";
import { UsuarioService } from "../../services/usuario.service";
import { UiServiceService } from "../../services/ui-service.service";
import { Usuario } from "../../interfaces/usuario.interface";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit, AfterViewInit {
  @ViewChild("slidePrincipal") slides: IonSlides;

  loginUser = {
    email: "RO@jeremy.com",
    password: "JRK441e22",
  };

  registerUser: Usuario = {
    email: "",
    password: "",
    nombres: "",
    imagen: "",
  };

  constructor(
    private usuarioService: UsuarioService,
    private navCtrl: NavController,
    private uiControllerService: UiServiceService
  ) {}

  ngOnInit() {}
  ngAfterViewInit() {
    this.slides.lockSwipes(true);
  }

  async login(fLogin: NgForm) {
    if (fLogin.invalid) {
      return;
    }
    const valido = await this.usuarioService.login(
      this.loginUser.email,
      this.loginUser.password
    );
    if (valido) {
      //ir al contenido
      this.navCtrl.navigateRoot("/main/tabs/tab1", { animated: true });
    } else {
      //alerta no correcto
      this.uiControllerService.alertaInformativa(
        "Usuario y/o contraseña no son correctos"
      );
    }
  }

  async registro(fRegistro: NgForm) {
    if (fRegistro.invalid) {
      return;
    }
    const valido = await this.usuarioService.registro(this.registerUser);
    if (valido) {
      //ir al contenido
      this.navCtrl.navigateRoot("/main/tabs/tab1", { animated: true });
    } else {
      //alerta no correcto
      this.uiControllerService.alertaInformativa("El e-mail ya existe");
    }
  }

  mostrarRegistro() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }

  mostrarLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }
}
