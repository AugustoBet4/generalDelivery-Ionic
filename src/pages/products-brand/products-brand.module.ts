import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductsBrandPage } from './products-brand';

@NgModule({
  declarations: [
    ProductsBrandPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductsBrandPage),
  ],
})
export class ProductsBrandPageModule {}
