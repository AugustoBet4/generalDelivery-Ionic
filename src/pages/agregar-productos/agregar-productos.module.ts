import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgregarProductosPage } from './agregar-productos';

@NgModule({
  declarations: [
    AgregarProductosPage,
  ],
  imports: [
    IonicPageModule.forChild(AgregarProductosPage),
  ],
})
export class AgregarProductosPageModule {}
