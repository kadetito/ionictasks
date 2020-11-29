import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-avatar-selector",
  templateUrl: "./avatar-selector.component.html",
  styleUrls: ["./avatar-selector.component.scss"],
})
export class AvatarSelectorComponent implements OnInit {
  @Output() avatarSel = new EventEmitter<string>();
  @Input() avatarActual: string = "av-1.png";
  imagenes = [
    {
      imagen: "av-1.png",
      seleccionado: true,
    },
    {
      imagen: "av-2.png",
      seleccionado: false,
    },
    {
      imagen: "av-3.png",
      seleccionado: false,
    },
    {
      imagen: "av-4.png",
      seleccionado: false,
    },
    {
      imagen: "av-5.png",
      seleccionado: false,
    },
    {
      imagen: "av-6.png",
      seleccionado: false,
    },
    {
      imagen: "av-7.png",
      seleccionado: false,
    },
    {
      imagen: "av-8.png",
      seleccionado: false,
    },
  ];

  avatarSlide = {
    slidesPerView: 3.5,
  };
  constructor() {}

  ngOnInit() {
    this.imagenes.forEach((imagen) => (imagen.seleccionado = false));
    for (const imagen of this.imagenes) {
      if (imagen.imagen === this.avatarActual) {
        imagen.seleccionado = true;
        break;
      }
    }
  }

  seleecionarAvatar(imagen) {
    this.imagenes.forEach((av) => (av.seleccionado = false));
    imagen.seleccionado = true;
    console.log("emitter: ", imagen.imagen);
    this.avatarSel.emit(imagen.imagen);
  }
}
