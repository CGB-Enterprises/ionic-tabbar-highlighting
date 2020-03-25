import { Component } from '@angular/core';

import { Platform, AlertController, ActionSheetController, PopoverController, ModalController, MenuController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private alertController: AlertController,
    private modalController: ModalController,
    private menuController: MenuController,
    private actionSheetController: ActionSheetController,
    private popoverController: PopoverController,
    private router: Router,
    private navController: NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('hybrid')) {
        this.initializeHybridSpecific();
      }
    });
  }

  private backHandler = async () => {
    console.log('Back button pressed!');
    if (await this.modalController.getTop()) {
      this.modalController.dismiss();
    }
    else if (await this.menuController.isOpen()) {
      this.menuController.close();
    }
    else if (await this.alertController.getTop()) {
      this.alertController.dismiss();
    }
    else if (await this.actionSheetController.getTop()) {
      this.actionSheetController.dismiss();
    }
    else if (await this.popoverController.getTop()) {
      this.popoverController.dismiss();
    }
    else if (this.router.url.startsWith('/tabs/') && this.router.url !== '/tabs/tab1') {
      this.navController.navigateRoot('/tabs/tab1');
    }
    else if (this.router.url === '/tabs/tab1') {
      navigator['app'].exitApp();
    }
  }

  private initializeHybridSpecific() {
    if (this.platform.is('ios')) {
      this.statusBar.styleDefault();
    } else {
      this.statusBar.styleLightContent();
      console.log('Subscribing to back button event...');
      this.platform.backButton.subscribe(this.backHandler);
    }

    this.splashScreen.hide();
  }
}
