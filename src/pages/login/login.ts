import { Component, OnInit, HostBinding } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { GooglePlus } from '@ionic-native/google-plus';

import { ProductosPage } from '../../pages/productos/productos';
import { EmailPage } from './email/email';
import { SignupPage } from './signup/signup';
import { BrandPage } from '../brand/brand';

import { ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user: Observable<firebase.User>;
  items: AngularFireList<any[]>;
  msgVal: string = '';
  users: AngularFireList<any>;

  error: any;

  userProfile: any = null;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public af: AngularFireAuth,
              public toastr: ToastController,
              private firebase: AngularFireDatabase,
              private googlePlus: GooglePlus) {
  }

  ngOnInit() {
    localStorage.clear();
    sessionStorage.clear();
    indexedDB.deleteDatabase('firebaseLocalStorageDb');
  }

  loginFB() {
    this.af.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(
      (success) => {
        // Creacion del usuario en firebase en users para el manejo de roles
        const ref = this.firebase.object('users/' + this.af.auth.currentUser.uid);
        ref.update({
            roles: 'customer',
            mail: this.af.auth.currentUser.email
          });
        this.navCtrl.push(TabsPage);
        let toaster = this.toastr.create({
          message: 'Ingreso Exitoso',
          duration: 3000,
          position: 'top',
          cssClass: 'toastcorrect'
        });
        toaster.present();
      }).catch(
        (error) => {
          console.log(error);
          let toaster = this.toastr.create({
            message: 'Ingreso Fallido',
            duration: 3000,
            position: 'top',
            cssClass: 'toastwarming'
          });
          toaster.present();
          this.error = error;
        })
  }
  loginEmail() {
    this.navCtrl.push(EmailPage);
  }

  signUp() {
    this.navCtrl.push(SignupPage);
  }
  
  // loginGoogle() {
  //   this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
  //     (success) => {
  //       // Creacion del usuario en firebase en users para el manejo de roles
  //       const ref = this.firebase.object('users/' + this.af.auth.currentUser.uid);
  //       ref.update({
  //           roles: 'customer',
  //           mail: this.af.auth.currentUser.email
  //         });
  //       this.navCtrl.push(ProductosPage);
  //       let toaster = this.toastr.create({
  //         message: 'Ingreso Exitoso',
  //         duration: 3000,
  //         position: 'top',
  //         cssClass: 'toastcorrect'
  //       });
  //       toaster.present();
  //     }).catch(
  //       (error) => {
  //         let toaster = this.toastr.create({
  //           message: 'Ingreso Fallido',
  //           duration: 3000,
  //           position: 'top',
  //           cssClass: 'toastwarming'
  //         });
  //         toaster.present();
  //         this.error = error;
  //       })
  // }

}
