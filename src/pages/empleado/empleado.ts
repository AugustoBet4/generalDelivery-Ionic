import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Pedido } from '../../models/pedido';
import { AngularFireAuth } from 'angularfire2/auth';
import { OrdersProvider } from '../../providers/orders/orders';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-empleado',
  templateUrl: 'empleado.html',
})
export class EmpleadoPage {

  order: Pedido[];
  ordersList: Pedido[];
  subscription: any = '';
  shownGroup = null;

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
          //console.log(JSON.stringify(this.ordersList, null, 4));
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

}
