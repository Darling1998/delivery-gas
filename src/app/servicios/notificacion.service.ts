import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

/*   initPush() {
    if (Capacitor.getPlatform() !== 'web') {
        this.registerPush();
    }
  }

  private registerPush() {
    PushNotifications.requestPermissions().then(permission => {
      if (permission.receive === 'granted') {
          PushNotifications.register();
      }
      else {
        
      }
    });
    PushNotifications.addListener('registration', (token) => {
        console.log(token);
    });
    PushNotifications.addListener('registrationError', (err)=> {
        console.log(err);
    }); 
    PushNotifications.addListener('pushNotificationReceived',(notifications) => {
          console.log(notifications);
      });

  }
   */
}
