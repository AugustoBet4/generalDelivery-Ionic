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
          x["$key"] = element.key;
          console.log('x: '+x);
          this.ordersList.push(x as Pedido);
        });
      });
      console.log(this.ordersList);
    }
    else{
      this.af.auth.signOut();
      this.navCtrl.push(LoginPage);
    }
  }

}
