import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Users } from '../../models/user';
import { UserProvider } from '../../providers/user/user';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';


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
  actualUser: Users;


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
      this.actualUser = new Users;
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
          for(var i = 0; i <this.userList.length ;i++) {
            if(this.userList[i].$key === this.af.auth.currentUser.uid) {
            this.actualUser.$key = this.userList[i].$key;
            this.actualUser.direction = this.userList[i].direction;
            this.actualUser.mail = this.userList[i].mail;
            this.actualUser.name = this.userList[i].name;
            this.actualUser.nit = this.userList[i].nit;
            this.actualUser.phone = this.userList[i].phone;
          }
          }
          console.log(this.actualUser);
        });
      }
      else{
        this.af.auth.signOut();
        this.navCtrl.push(LoginPage);
      }
    }

  onSubmit() {
    if (this.actualUser !== undefined){
      this.userService.updateUser(this.actualUser);
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
    
    let elements = document.querySelectorAll(".tabbar");

    if (elements != null) {
        Object.keys(elements).map((key) => {
            elements[key].style.display = 'none';
        });
    }

    this.navCtrl.push(LoginPage).then(() => {
      const index = this.navCtrl.getActive().index;
      this.navCtrl.remove(0, index);
    });
  }

}
