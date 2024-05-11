import { Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { OnesignalService } from './shared/services/onesignal/onesignal.service';
import { Capacitor } from '@capacitor/core';
import {Platform} from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  private platform = inject(Platform);
  private onesignal = inject(OnesignalService);

  constructor() {
    this.platform.ready().then(()=> {
      if(Capacitor.getPlatform() != 'web'){
        this.onesignal.oneSignalInit();
        }
    });
  }
}
