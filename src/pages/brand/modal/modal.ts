import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pedido } from '../../../models/pedido';
import { ProductProvider } from '../../../providers/product/product';
import { AngularFireList } from 'angularfire2/database';
import { Producto } from '../../../models/products';


@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  
  public form: FormGroup;
  pedido: AngularFireList<any>;
  orden: Pedido[] = new Array();
  
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public view: ViewController,
              private _FB: FormBuilder,
              private params: NavParams,
              private productService: ProductProvider,
              private toastr: ToastController) {
    this.form = _FB.group({
      'name0': ['', Validators.required],
      'price0': ['', Validators.required],
      'quantity0': ['', Validators.required],
      'note0': [''],
      'name1': ['', Validators.required],
      'price1': ['', Validators.required],
      'quantity1': ['', Validators.required],
      'note1': ['']
      });
  }

  realizarPedido(pedido) {
    console.log(pedido);
    var keys = Object.keys(pedido);
    var length = (keys.length)/4;
    var total:any = 0;
    for (var j=0; j < length ;j++) {
      for (var i=0; i < length ;i++) {
        if (i%length == 0) {
          var product = new Pedido;
          product.name = eval("pedido.name" + j);
          product.price = eval("pedido.price" + j);
          product.quantity = eval("pedido.quantity"+j);
          product.note = eval("pedido.note" + j);
          total += eval("pedido.quantity" + j) * eval("pedido.price" + j);;
          this.orden.push(product);
        }
      }
    }
    this.orden.push(total);
    console.log(this.orden)
    if (this.orden != undefined){
      this.productService.insertPedido(this.orden);
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
