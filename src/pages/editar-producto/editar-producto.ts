import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, Toast } from 'ionic-angular';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subscription } from 'rxjs/Subscription';
import { isEmpty } from '@firebase/util';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

//SERVICIOS
import { ProductProvider } from '../../providers/product/product';
import { ToastController } from 'ionic-angular';

//PRODUCTO INTERFACE
import { Producto } from '../../models/products';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-editar-producto',
  templateUrl: 'editar-producto.html',
})
export class EditarProductoPage {
  
  productList: Producto[];
  isOn: false;
  subscription: any = '';
  public form: FormGroup;
  product: AngularFireList<any>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public productService: ProductProvider,
              public toastr: ToastController,
              public af: AngularFireAuth,
              private _FB: FormBuilder) {
    this.form = _FB.group({
      'product' : _FB.group({
        '$key': ['', Validators.required],
        'name': ['', Validators.required],
        'category': ['', Validators.required],
        'location': ['', Validators.required],
        'price': ['', Validators.required],
      }),
      
    });
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

  ngOnDestroy() {
    //this.productService.selectedProduct = new Producto();
  }

  onEdit(product: Producto) {
    console.log(this.productService.selectedProduct = Object.assign({},product));
    this.productService.selectedProduct = Object.assign({},product);
  }
  
  onDelete($key: string) {
    let toaster = this.toastr.create({
      message: 'Esta seguro\n Se eliminar el producto',
      position: 'top',
      cssClass: 'toastwarming',
      showCloseButton: true,
      closeButtonText: "Seguro?"
    });
    let closedByTimeout = false;
    let timeoutHandle = setTimeout(() => { closedByTimeout = true; toaster.dismiss(); }, 5000);
    toaster.onDidDismiss(() => {
      if(!closedByTimeout){
        this.productService.deleteProduct($key);
        let toaster = this.toastr.create({
          message: 'Operación Exitosa\n Producto Eliminado',
          duration: 3000,
          position: 'top',
          cssClass: 'toastcorrect'
      });
      toaster.present();
      }
    });
    toaster.present();
  }  

  onSubmit(producto: Producto) {
    if (producto !== undefined){
      this.productService.updateProduct(producto.product);
      let toaster = this.toastr.create({
        message: 'Operación Exitosa\n Producto Modificado',
        duration: 3000,
        position: 'top',
        cssClass: 'toastcorrect'
      });
      toaster.present();
      this.isOn = false;
    }
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
