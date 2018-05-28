import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AgregarProductosPage } from '../agregar-productos/agregar-productos';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Producto } from '../../models/products';
import { Observable } from '@firebase/util';
import { map } from 'rxjs/operators';

import { ProductProvider } from '../../providers/product/product';

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

  productList: Producto[];
  isOn: false;
  subscription: any = '';

  constructor(public productService: ProductProvider,
              public navCtrl: NavController,
              public navParams: NavParams,
              private db: AngularFireDatabase) {
  }

  ngOnInit() {
    this.subscription = this.productService.getProducts()
      .snapshotChanges()
      .subscribe(item => {
      this.productList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.productList.push(x as Producto);
      });
    });
  }



  navigateToAgregarProductoPage() {
    //Redirecciona al usuario a agregar producto
    this.navCtrl.push(AgregarProductosPage);
  }

  // navigateToEditProductoPage() {
  //   //Redirecciona al usuario a editar producto
  //   this.navCtrl.push(ModificarProductosPage);
  // }

}
