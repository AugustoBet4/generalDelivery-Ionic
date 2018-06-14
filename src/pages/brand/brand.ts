import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Toast, ModalController, Modal, ModalOptions } from 'ionic-angular';
import { NgForm, FormGroup } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subscription } from 'rxjs/Subscription';

// Paginas
import { LoginPage } from '../login/login';
import { ModalPage } from '../brand/modal/modal';

// Service
import { UserProvider } from "../../providers/user/user";
import { ToastController } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';

// User Class
import { Users } from "../../models/user";
import { Producto } from '../../models/products';
import { AngularFireList } from 'angularfire2/database';
import { Pedido } from '../../models/pedido';

@IonicPage()
@Component({
  selector: 'page-brand',
  templateUrl: 'brand.html',
})
export class BrandPage {

  user: Users[];
  productList: Producto[];
  productosSeleccionados: Producto[] = new Array();
  isOn = false;
  subscription: any = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userService: UserProvider,
              public toastr: ToastController,
              public af: AngularFireAuth,
              public productService: ProductProvider,
              public modalCtrl: ModalController) {
  }

  ngOnInit() {
    if (this.af.auth.currentUser !== null){
      this.subscription = this.userService.getUsers()
      .snapshotChanges()
      .subscribe(item => {
        this.user = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.user.push(x as Users);
          console.log(this.user);
        });
      });
    }
    else{
      this.af.auth.signOut();
      this.navCtrl.push(LoginPage);
    }
  }

  productsByCompany($key: string) {
    if (this.af.auth.currentUser !== null){
      this.isOn =! this.isOn;
      this.subscription = this.productService.getProductByCompany($key)
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

  openModal(name: string, price: string) {
    let pedido = this.modalCtrl.create(ModalPage, {name: name, price: price});
    pedido.onDidDismiss(data => {
      console.log(data);
    });
    pedido.present();
  }
  addOrder(name: string, price: string) {
    var order = new Producto;
    order.name = name;
    order.price = price;
    this.productosSeleccionados.push(order);
    console.log((this.productosSeleccionados));
  }

  onChange() {
    let pedido = this.modalCtrl.create(ModalPage, {order: this.productosSeleccionados});
    pedido.onDidDismiss(data => {
      console.log(data);
    });
    pedido.present();
  }
}
