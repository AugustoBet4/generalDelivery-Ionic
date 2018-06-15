import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Users } from '../../models/user';
import { UserProvider } from '../../providers/user/user';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  isOn: false;
  userList: Users[];
  public form: FormGroup;
  subscription: any = '';
  user: AngularFireList<any>;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public userService: UserProvider,
              public toastr: ToastController,
              public af: AngularFireAuth,
              private _FB: FormBuilder) {
    this.form = _FB.group({
      '$key': [],
      'name': ['', Validators.required],
      'direction': ['', Validators.required],
      'nit': ['', Validators.required],
      'phone': ['', Validators.required],
    });
  }

    ngOnInit() {
      if (this.af.auth.currentUser !== null){
        this.subscription = this.userService.getUsers()
        .snapshotChanges()
        .subscribe(item => {
        this.userList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.userList.push(x as Users);
        });
      });
      }
      else{
        this.af.auth.signOut();
        this.navCtrl.push(LoginPage);
      }
    }

  onSubmit(usuario: Users) {
    if (usuario !== undefined){
      this.userService.updateUser(usuario);
      let toaster = this.toastr.create({
        message: 'Operación Exitosa\n Usuario Modificado',
        duration: 3000,
        position: 'top',
        cssClass: 'toastcorrect'
      });
      toaster.present();
      this.isOn = false;
    }
  }

  resetForm(userForm?: NgForm) {
    if (userForm != null){
      userForm.reset();
    }
  }

  signOut (){
    this.af.auth.signOut();
    this.navCtrl.push(LoginPage);
  }

}
