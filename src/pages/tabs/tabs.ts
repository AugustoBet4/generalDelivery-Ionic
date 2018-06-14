import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { EmpleadoPage } from '../empleado/empleado';
import { ProductosPage } from '../productos/productos';
import { BrandPage } from '../brand/brand';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  brandsPage = BrandPage
  //configPage = ConfiguracionPage;

  constructor (){
    
  }

}
