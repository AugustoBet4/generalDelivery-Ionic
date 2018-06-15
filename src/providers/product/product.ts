import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Producto } from '../../models/products';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class ProductProvider {

  productList: AngularFireList<any>;
  selectedProduct: Producto = new Producto();

  constructor(public http: HttpClient,
              private firebase: AngularFireDatabase,
              private af: AngularFireAuth) {
  }

  getProducts() {
    return this.productList = this.firebase.list('users/' + this.af.auth.currentUser.uid + '/products/');
  }

  getProductByCompany($key: string) {
    return this.productList = this.firebase.list('users/' + $key + '/products/');
  }

  insertProducts(product:Producto) {
    this.productList.push({
      name: product.name,
      category: product.category,
      location: product.location,
      price: product.price
    });
  }

  insertPedido(pedido: any) {
    this.productList = this.firebase.list('pedidos/');
    this.productList.push(pedido);
  }

  updateProduct(product: Producto) {
    this.productList.update(product.$key, {
      name: product.name,
      category: product.category,
      location: product.location,
      price: product.price     
    });
  }

  deleteProduct($key: string) {
    this.productList.remove($key);
  }

}
