import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Users } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class UserProvider {

  user: any;

  constructor(public http: HttpClient,
              private firebase: AngularFireDatabase,
              private af: AngularFireAuth) {
  }
  getUsers() {
    return this.user = this.firebase.list('users/');
  }

}
