import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pedido } from '../../../models/pedido';
import { ProductProvider } from '../../../providers/product/product';
import { AngularFireList } from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  public form: FormGroup;
  pedido: AngularFireList<any>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public view: ViewController,
              private _FB: FormBuilder,
              private params: NavParams,
              private productService: ProductProvider,
              private toastr: ToastController) {
    this.form = _FB.group({
      'name': ['', Validators.required],
      'price': ['', Validators.required],
      'quantity': ['', Validators.required]
      });
  }

  realizarPedido(pedido: Pedido) {
    console.log(pedido);
    if (pedido != undefined){
      this.productService.insertPedido(pedido);
      let toaster = this.toastr.create({
        message: 'Operación Exitosa\n Pedido Agregado',
        duration: 3000,
        position: 'top',
        cssClass: 'toastcorrect'
      });
      toaster.present();
    }
  }

  closeModal() {
    const data = {
      name: this.form.value.name,
      price: this.form.value.price,
      quantity: this.form.value.quantity
    };
    this.view.dismiss(data);
  }

}
