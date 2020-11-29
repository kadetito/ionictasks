import { Component, Input, OnInit, ViewChild } from "@angular/core";

declare var mapboxgl: any;
@Component({
  selector: "app-mapa",
  templateUrl: "./mapa.component.html",
  styleUrls: ["./mapa.component.scss"],
})
export class MapaComponent implements OnInit {
  @Input() tarea_coordenadas: string;
  @ViewChild("mapa", { static: true }) mapa: any;
  constructor() {}

  ngOnInit() {
    const latLng = this.tarea_coordenadas.split(",");
    const lat = Number(latLng[0]);
    const lng = Number(latLng[1]);
    mapboxgl.accessToken =
      "pk.eyJ1IjoicmFmYXBlbnlhIiwiYSI6ImNrM290dzE1azFuaTEzY3F4Mjh3aGI0bHcifQ.InIgGFb6-JhpleDfdgRuKw";
    const map = new mapboxgl.Map({
      container: this.mapa.nativeElement,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: 15,
    });

    const marcador = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
  }
}
