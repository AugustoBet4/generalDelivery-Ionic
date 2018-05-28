import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { NgForm } from '@angular/forms';

//PAGINAS
import { ProductosPage } from '../productos/productos';

//SERVICIOS
import { ToastController } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';

// PRODUCTO INTERFACE
import { Producto } from '../../models/products';

@IonicPage()
@Component({
  selector: 'page-agregar-productos',
  templateUrl: 'agregar-productos.html',
})
export class AgregarProductosPage implements OnInit {

  public form: FormGroup;
  product: AngularFireList<any>;

  constructor(public productService: ProductProvider,
              public toastr: ToastController,
              public navCtrl: NavController,
              private database: AngularFireDatabase,
              public navParams: NavParams,
              public af: AngularFireAuth,
              private _FB: FormBuilder) {

    this.form = _FB.group({
      'key': [],
      'name': ['', Validators.required],
      'category': ['', Validators.required],
      'location': ['', Validators.required],
      'price': ['', Validators.required],
      });
  }

  ngOnInit() {
    if (this.af.auth.currentUser !== null){
      this.productService.getProducts();
      this.resetForm();
    }
    else{
      this.af.auth.signOut();
    }
  }
  ngOnDestroy() {
    
  }

  agregarProducto(producto: Producto) {
    if (producto != undefined){
      this.productService.insertProducts(producto);
      let toaster = this.toastr.create({
        message: 'Operación Exitosa\n Producto Agregado',
        duration: 3000,
        position: 'top',
        cssClass: 'toastcorrect'
      });
      toaster.present();
      this.navCtrl.push(ProductosPage);
    }
  }
  resetForm(productForm?: NgForm) {
    if (productForm != null){
      productForm.reset();
    }
  }
}
