import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Producto } from '../../models/products';
import { AngularFireAuth } from 'angularfire2/auth';

/*
  Generated class for the ProductProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductProvider {

  productList: AngularFireList<any>;
  selectedProduct: Producto;

  constructor(public http: HttpClient,
              private firebase: AngularFireDatabase,
              private af: AngularFireAuth) {
    console.log('Hello ProductProvider Provider');
  }

  getProducts() {
    return this.productList = this.firebase.list('/products/');
  }

}
