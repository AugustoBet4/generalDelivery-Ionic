import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Notification } from '../../models/notification';
import { OrdersProvider } from '../../providers/orders/orders';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { Pedido } from '../../models/pedido';


@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  notifications: Notification[];
  orders: Pedido[];
  subscription: any = '';
  subscription2: any = '';
  
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public af: AngularFireAuth,
              public orderService: OrdersProvider) {
  }

  ngOnInit() {
    if (this.af.auth.currentUser !== null){
      this.subscription = this.orderService.getNotifications()
      .snapshotChanges()
      .subscribe(item => {
        this.notifications = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.notifications.push(x as Notification);
        });
      });

      this.subscription2 = this.orderService.getOrders()
      .snapshotChanges()
      .subscribe(item => {
        this.orders = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          if(x[0] == this.af.auth.currentUser.uid) {
            this.orders.push(x as Pedido);
          }
        });
      });
    }
    else{
      this.af.auth.signOut();
      this.navCtrl.push(LoginPage);
    }
  }

  isMine(n) {
    if(this.orders != undefined) {
      for (var i = 0 ; i < this.orders.length ; i++){
        if (this.notifications[n].orderkey == this.orders[i].$key) {
          return true;
        }else {
          return false;
        }
      }
    }
  }

}
