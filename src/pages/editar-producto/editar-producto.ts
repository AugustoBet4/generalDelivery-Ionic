import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, Toast } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { element } from 'protractor';
import { Subscription } from 'rxjs/Subscription';
import { isEmpty } from '@firebase/util';

//SERVICIOS
import { ProductProvider } from '../../providers/product/product';
import { ToastController } from 'ionic-angular';

//PRODUCTO INTERFACE
import { Producto } from '../../models/products';
import { ProductosPage } from '../productos/productos';

@IonicPage()
@Component({
  selector: 'page-editar-producto',
  templateUrl: 'editar-producto.html',
})
export class EditarProductoPage {
  
  productList: Producto[];
  isOn: false;
  subscription: any = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public productService: ProductProvider,
              public toastr: ToastController,
              public af: AngularFireAuth,) {
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

  ngOnDestroy() {
    //this.productService.selectedProduct = new Producto();
  }

  onEdit(product: Producto) {
    this.productService.selectedProduct = Object.assign({},product);
  }
  
  onDelete($key: string) {
    if (confirm('Esta seguro de eliminar?')) {
      this.productService.deleteProduct($key);
      let toaster = this.toastr.create({
        message: 'Operación Exitosa\n Producto Eliminado',
        duration: 3000,
        position: 'top',
        cssClass: 'toastcorrect'
      });
      toaster.present();
    }
  }

  onSubmit(productForm: NgForm) {
    this.productService.updateProduct(productForm.value);
    let toaster = this.toastr.create({
      message: 'Operación Exitosa\n Producto Modificado',
      duration: 3000,
      position: 'top',
      cssClass: 'toastcorrect'
    });
    toaster.present();
    this.isOn = false;
    this.resetForm(productForm);
  }

  resetForm(productForm?: NgForm) {
    if (productForm != null){
      productForm.reset();
    }
  }

  empty(){
    if(!isEmpty(this.productList))
      return true;
    else
      return false;
  }

}
