import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { EmpleadoPage } from '../empleado/empleado';
import { BrandPage } from '../brand/brand';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  brandsPage = BrandPage;
  empleadosPage = EmpleadoPage;
  settingsPage = SettingsPage;


}
