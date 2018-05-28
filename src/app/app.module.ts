import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

//FIREBASE 
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FIREBASE_CREDENTIALS } from './firebase.credentials';
import { HttpModule } from '@angular/http';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';

//PAGINAS
import { MyApp } from './app.component';
import { ProductosPage } from '../pages/productos/productos';
import { AgregarProductosPage } from '../pages/agregar-productos/agregar-productos';

@NgModule({
  declarations: [
    MyApp,
    ProductosPage,
    AgregarProductosPage
  ],
  imports: [
    HttpModule,
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
    AgregarProductosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
