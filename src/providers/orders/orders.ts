import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Pedido } from '../../models/pedido';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class OrdersProvider {

  ordersList: AngularFireList<any>;
  selectedOrder: Pedido = new Pedido();

  constructor(public http: HttpClient,
              private firebase: AngularFireDatabase,
              private af: AngularFireAuth) {
  }

  getOrders() {
    return this.ordersList = this.firebase.list('pedidos/');
  }

}
