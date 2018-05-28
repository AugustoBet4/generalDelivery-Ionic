import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from '@firebase/util';
import { isEmpty } from '@firebase/util';
import { AngularFireAuth } from 'angularfire2/auth';
import { Platform } from 'ionic-angular';


//PAGINAS
import { AgregarProductosPage } from '../agregar-productos/agregar-productos';
import { EditarProductoPage } from '../editar-producto/editar-producto';

//SERVICIOS
import { Producto } from '../../models/products';
import { ProductProvider } from '../../providers/product/product';
import { LoginPage } from '../login/login';
import { platformBrowser } from '@angular/platform-browser';

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
              public af: AngularFireAuth,
              private db: AngularFireDatabase,
              private plt: Platform,
              private toastr: ToastController) {​
  }

  ngOnInit() {
    if (this.af.auth.currentUser !== null){
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
    else{
      this.af.auth.signOut();
      this.navCtrl.push(LoginPage);
    }
  }

  empty(){
    if(!isEmpty(this.productList))
      return true;
    else
      return false;
  }

  navigateToAgregarProductoPage() {
    //Redirecciona al usuario a agregar producto
    this.navCtrl.push(AgregarProductosPage);
  }

  navigateToEditProductoPage() {
    //Redirecciona al usuario a editar producto
    this.navCtrl.push(EditarProductoPage);
  }

}
