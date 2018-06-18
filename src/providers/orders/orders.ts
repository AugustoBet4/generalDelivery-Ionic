import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Pedido } from '../../models/pedido';
import { AngularFireAuth } from 'angularfire2/auth';
import { Notification } from '../../models/notification';

@Injectable()
export class OrdersProvider {

  ordersList: AngularFireList<any>;
  selectedOrder: Pedido = new Pedido();
  orderSelected: AngularFireList<any>;
  notificationList: AngularFireList<any>;

  constructor(public http: HttpClient,
              private firebase: AngularFireDatabase,
              private af: AngularFireAuth) {
  }

  getOrders() {
    return this.ordersList = this.firebase.list('pedidos/');
  }

  setNotification(notification: Notification) {
    this.orderSelected = this.firebase.list('notifications/');
    this.orderSelected.push({
      orderkey: notification.orderkey,
      body: notification.body
    });
  }

  getNotifications() {
    return this.notificationList = this.firebase.list('notifications/');
  }
  
}
