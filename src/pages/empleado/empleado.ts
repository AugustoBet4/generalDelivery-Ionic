import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Pedido } from '../../models/pedido';
import { AngularFireAuth } from 'angularfire2/auth';
import { OrdersProvider } from '../../providers/orders/orders';
import { LoginPage } from '../login/login';
import { Notification } from '../../models/notification';
import { isEmpty } from '@firebase/util';

@IonicPage()
@Component({
  selector: 'page-empleado',
  templateUrl: 'empleado.html',
})
export class EmpleadoPage {

  order: Pedido[];
  ordersList: Pedido[];
  notificationsList: Notification[];
  subscription: any = '';
  subscription2: any = '';
  shownGroup = null;
  notification: Notification;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public ordersService: OrdersProvider,
              public toastr: ToastController,
              public af: AngularFireAuth) {
  }

  ngOnInit() {
    if (this.af.auth.currentUser !== null){
      this.subscription = this.ordersService.getOrders()
      .snapshotChanges()
      .subscribe(item => {
        this.ordersList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x['$key'] = element.key;
          this.ordersList.push(x as Pedido);
        });
      });

      this.subscription2 = this.ordersService.getNotifications()
      .snapshotChanges()
      .subscribe(item => {
        this.notificationsList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x['$key'] = element.key;
          this.notificationsList.push(x as Notification);
        });
      });
    }
    else{
      this.af.auth.signOut();
      this.navCtrl.push(LoginPage);
    }
  }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
        this.shownGroup = null;
    } else {
        this.shownGroup = group;
    }
  }
  isGroupShown(group) {
      return this.shownGroup === group;
  }

  orderDelivered($orderkey) {
    this.notification = new Notification();
    this.notification.orderkey = $orderkey;
    this.notification.body = 'El pedido se entrego.';
    this.ordersService.setNotification(this.notification);
  }

  orderInComing($orderkey) {
    this.notification = new Notification();
    this.notification.orderkey = $orderkey;
    this.notification.body = 'El pedido se encuentra en camino.';
    this.ordersService.setNotification(this.notification);
  }

  alreadyDelivered(n) {
    if(!isEmpty(this.notificationsList) && this.notificationsList != undefined) {
      for(var i = 0; i < (this.notificationsList).length ;i++) {
        if((this.ordersList[n].$key === this.notificationsList[i].orderkey) && ((this.notificationsList[i].body.toString() === 'El pedido se entrego.')))
          return true;
      }
    }
  }

  alreadyInComing(n) {
    if(!isEmpty(this.notificationsList) && this.notificationsList != undefined) {
      for(var i = 0; i < (this.notificationsList).length ;i++) {
        if((this.ordersList[n].$key === this.notificationsList[i].orderkey) && ((this.notificationsList[i].body.toString() === 'El pedido se encuentra en camino.')))
          return true;
      }
    }
  }

  moreThanOne(orden) {
    if ( Object.keys(orden).length < 6) {
      return true;
    }
  }
}
