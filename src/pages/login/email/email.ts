import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../../login/signup/signup';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from '@firebase/util';
import { FirebaseAuth } from '@firebase/auth-types';

import { ToastController } from 'ionic-angular';

import { EmpleadoPage } from '../../empleado/empleado';
@IonicPage()
@Component({
  selector: 'page-email',
  templateUrl: 'email.html',
})
export class EmailPage {

  email: any;
  password: any;

  state: string = '';
  error: any;
  user: Observable<firebase.User>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams, 
              public af: AngularFireAuth,
              public toastr: ToastController) {
  this.af.authState.subscribe( auth => {
    if(auth) {
      this.navCtrl.push(EmpleadoPage);
    }
  });
  }

  onSubmit(formData) {
    if (formData) {
      this.af.auth.signInWithEmailAndPassword(formData.value.email, formData.value.password).then(
        (success) => {
          let toaster = this.toastr.create({
            message: 'Ingreso Exitoso',
            duration: 3000,
            position: 'top',
            cssClass: 'toastcorrect'
          });
          toaster.present();
          this.navCtrl.push(EmpleadoPage);
        }).catch(
          (error) => {
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
  }

  goSignup() {
    this.navCtrl.push(SignupPage);
  }

  back() {
    this.navCtrl.pop();
  }

}
