import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarProductoPage } from './editar-producto';
import { FormsModule }   from '@angular/forms';

@NgModule({
  declarations: [
    EditarProductoPage,
  ],
  imports: [
    IonicPageModule.forChild(EditarProductoPage),
    FormsModule
  ],
})
export class EditarProductoPageModule {}
