import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Modal } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { GooglePlus } from '@ionic-native/google-plus';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';

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
import { LoginPage } from '../pages/login/login';
import { EmailPage } from '../pages/login/email/email';
import { SignupPage } from '../pages/login/signup/signup';
import { BrandPage } from '../pages/brand/brand';
import { SettingsPage} from '../pages/settings/settings'

//SERVICIOS
import { ProductProvider } from '../providers/product/product';
import { UserProvider } from '../providers/user/user';
import { ModalPage } from '../pages/brand/modal/modal';
import { EmpleadoPage } from '../pages/empleado/empleado';
import { TabsPage } from '../pages/tabs/tabs';

@NgModule({
  declarations: [
    MyApp,
    ProductosPage,
    AgregarProductosPage,
    EditarProductoPage,
    LoginPage,
    EmailPage,
    SignupPage,
    BrandPage,
    ModalPage,
    EmpleadoPage,
    TabsPage,
    SettingsPage
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    //Inicializar Firebase con credenciales
    AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
    //Importar FirebaseDatebaseModule
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProductosPage,
    AgregarProductosPage,
    EditarProductoPage,
    LoginPage,
    EmailPage,
    SignupPage,
    BrandPage,
    ModalPage,
    EmpleadoPage,
    TabsPage,
    SettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProductProvider,
    AngularFireAuth,
    UserProvider,
    GooglePlus
  ]
})
export class AppModule {}
