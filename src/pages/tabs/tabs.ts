import { Component } from '@angular/core';
import { BrandPage } from '../brand/brand';
import { SettingsPage } from '../settings/settings';
import { NotificationsPage } from '../notifications/notifications';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  brandsPage = BrandPage;
  notificationsPage = NotificationsPage;
  settingsPage = SettingsPage;

}
