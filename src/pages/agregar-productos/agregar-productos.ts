import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Producto } from '../../models/products';

@IonicPage()
@Component({
  selector: 'page-agregar-productos',
  templateUrl: 'agregar-productos.html',
})
export class AgregarProductosPage {

  productos = {} as Producto;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  agregarProducto(productos: Producto) {
    console.log(productos);
  }

}
