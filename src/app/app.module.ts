import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

//FIREBASE 
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FIREBASE_CREDENTIALS } from './firebase.credentials';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';

//PAGINAS
import { MyApp } from './app.component';
import { ProductosPage } from '../pages/productos/productos';
import { AgregarProductosPage } from '../pages/agregar-productos/agregar-productos';
import { EditarProductoPage } from '../pages/editar-producto/editar-producto';

//SERVICIOS
import { ProductProvider } from '../providers/product/product';

@NgModule({
  declarations: [
    MyApp,
    ProductosPage,
    AgregarProductosPage,
    EditarProductoPage
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    //Inicializar Firebase con credenciales
    AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
    //Importar FirebaseDatebaseModule
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProductosPage,
    AgregarProductosPage,
    EditarProductoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProductProvider,
    AngularFireAuth
  ]
})
export class AppModule {}
