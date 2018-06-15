import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Users } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class UserProvider {

  userList: AngularFireList<any>;
  selectedUser: Users = new Users();


  constructor(public http: HttpClient,
              private firebase: AngularFireDatabase,
              private af: AngularFireAuth) {
  }
  getUsers() {
    return this.userList = this.firebase.list('users/');
  }

  updateUser(user: Users) {
    this.userList.update(user.$key, {
      name: user.name,
      direction: user.direction,
      nit: user.nit,
      telefono: user.phone     
    });
  }

  

}
