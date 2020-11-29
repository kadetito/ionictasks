import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NavController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { Usuario } from "../interfaces/usuario.interface";
import { environment } from "../../environments/environment";
const url = environment.url;
@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  token: string = null;
  private usuario: Usuario = {};
  constructor(
    private http: HttpClient,
    private storage: Storage,
    private navCtrl: NavController
  ) {}

  getUsuarioTarea(userId) {
    return this.http.get(
      `${url}/user/${userId}` //harcodeado de momento TODO
    );
  }

  login(email: string, password: string) {
    const data = { email, password };
    return new Promise((resolve) => {
      this.http.post(`${url}/login`, data).subscribe((resp: Usuario) => {
        if (resp["ok"]) {
          this.guardarToken(resp["usuario"][0]["token"]);
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
          console.log("FALSE");
        }
      });
    });
  }
  //crtuser
  registro(usuario: Usuario) {
    return new Promise((resolve) => {
      this.http.post(`${url}/crtuser`, usuario).subscribe((resp) => {
        if (resp["ok"]) {
          this.guardarToken(resp["token"]);
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
    });
  }

  getUsuario() {
    if (this.usuario.id_persona) {
      this.validaToken();
    }
    return { ...this.usuario };
  }

  async guardarToken(token: string) {
    this.token = token;
    await this.storage.set("token", token);
  }
  async cargarTokenStorage() {
    this.token = (await this.storage.get("token")) || null;
  }

  async validaToken(): Promise<boolean> {
    await this.cargarTokenStorage();
    if (!this.token) {
      console.log("Entro aqui");
      this.navCtrl.navigateRoot("/login");
      return Promise.resolve(false);
    }
    return new Promise<boolean>((resolve) => {
      const headers = new HttpHeaders({
        "x-token": this.token,
      });

      this.http.get(`${url}/vltkn`, { headers }).subscribe((resp) => {
        if (resp["ok"]) {
          this.usuario = resp["usuario"];
          resolve(true);
        } else {
          this.navCtrl.navigateRoot("/login");
          resolve(false);
        }
      });
    });
  }

  actualizarUsuario(usuario: Usuario) {
    const headers = new HttpHeaders({
      "x-token": this.token,
    });

    return new Promise((resolve) => {
      this.http
        .put(`${url}/upduser`, usuario, {
          headers,
        })
        .subscribe((resp) => {
          if (resp["ok"]) {
            this.guardarToken(resp["token"]);
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }
}
