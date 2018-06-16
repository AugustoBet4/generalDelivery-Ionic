import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Pedido } from '../../../models/pedido';
import { ProductProvider } from '../../../providers/product/product';
import { AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';


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
              public af: AngularFireAuth,
              private toastr: ToastController) {
    const formGroup: FormGroup = new FormGroup({});
    for(var i = 0; i<=params.get('cantidad') ;i++) {
      var name1: string;
      name1 = 'name'+i;
      var price2: string;
      price2 = 'price'+i;
      var quantity2: string;
      quantity2 = 'quantity'+i;
      var note2: string;
      note2 = 'note'+i;
      
      var control: FormControl = new FormControl (name1, Validators.required);
      formGroup.addControl(name1, control);
      control = new FormControl (price2, Validators.required);
      formGroup.addControl(price2, control);
      control = new FormControl (quantity2, Validators.required);
      formGroup.addControl(quantity2, control);
      control= new FormControl (note2, Validators.required);
      formGroup.addControl(note2, control);
    }
    this.form = formGroup;
  }

  realizarPedido(pedido) {
    var keys = Object.keys(pedido);
    var lenght = (keys.length)/4;
    var total:any = 0;
    var product: Pedido;
    var currentUser: any;
    currentUser = this.af.auth.currentUser.uid;
    this.orden.push(currentUser);
    this.orden.push(this.params.get('key'));
    for (var j=0; j < lenght ;j++) {
      for (var i=0; i < length ;i++) {
        if (i%length == 0) {
          product = new Pedido;
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
