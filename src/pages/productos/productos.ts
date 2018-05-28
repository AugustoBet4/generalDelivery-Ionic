import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AgregarProductosPage } from '../agregar-productos/agregar-productos';

/**
 * Generated class for the ProductosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productos',
  templateUrl: 'productos.html',
})
export class ProductosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  navigateToAgregarProductoPage() {
    //Redirecciona al usuario a agregar producto
    this.navCtrl.push(AgregarProductosPage);
  }

}
