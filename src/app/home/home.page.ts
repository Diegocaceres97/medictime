import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonModal,
  IonButtons,
  IonButton,
  IonItem,
  IonInput,
  IonDatetime,
  IonToast,
} from '@ionic/angular/standalone';
import { AddComponent } from '../shared/components/medicine/add/add.component';
import { FormsModule } from '@angular/forms';
import { OverlayEventDetail } from '@ionic/core';
import { Medicine } from '../shared/models/interfaces/medicine.interface';
import { UserMedicine } from '../shared/models/classes/factory/userMedicine.factory';
import {
  createMedicine,
  generateRandomID,
} from '../shared/utilities/medicine.functions';
import { CommonModule } from '@angular/common';
import { ShowMedicineComponent } from '../shared/components/medicine/show-medicine/show-medicine.component';
import { MedicineService } from '../shared/services/medicine.service';
import { Toast } from '@capacitor/toast';
import { OnesignalService } from '../shared/services/onesignal/onesignal.service';
import { Capacitor } from '@capacitor/core';
import { lastValueFrom } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    FormsModule,
    IonToolbar,
    IonTitle,
    IonContent,
    IonModal,
    IonButtons,
    IonButton,
    IonItem,
    IonInput,
    IonToast,
    IonDatetime,
    AddComponent,
    CommonModule,
    ShowMedicineComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage implements OnInit {
  message =
    'This modal example uses the modalController to present and dismiss modals.';
  name?: string;
  medicineHour?: string;
  medicineDay?: string;
  date!: Date;
  allData: Medicine[] = this.medicalService.getData();
  data: Medicine = {
    id: '1',
    name: '',
    perHour: 1,
    perDay: 1,
    date: undefined,
  };
  hasMedicine: boolean = false;
  private onesignal = inject(OnesignalService);

  constructor(private medicalService: MedicineService) {
    this.hasMedicine = this.medicalService.getData().length > 0 ? true : false;
  }

  @ViewChild(IonModal) modal!: IonModal;

  ngOnInit() {
    console.log('ng init')
    if(Capacitor.getPlatform() != 'web') this.oneSignal()
  }

  async oneSignal() {
    await this.onesignal.OneSignalIOSPermission();
    const randomNumber = (Math.random()).toString();

    const data = await this.getStorage('auth');

    if(data?.value){ return;}

    Preferences.set({key: 'auth', value: this.generateRandomString(10)});

    await lastValueFrom(
      this.onesignal.createOneSignalUser(randomNumber)
    );
  }

  generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }

  async oneSignalPermisions() {
    await this.onesignal.OneSignalIOSPermission();
  }

  getStorage(key: string){
    return Preferences.get({key: key});
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  async confirm() {
    this.modal.dismiss(this.name, 'confirm');

    if (
      !this.name ||
      parseInt(this.medicineDay as string) <= 0 ||
      parseInt(this.medicineHour as string) <= 0 ||
      !this.medicineHour ||
      !this.medicineDay
    ) {
      console.error('por favor corrige los datos');
      /* const alert = await this.alertController.create({
        header: 'Campo faltante o erróneo',
        message: 'Por favor revisa que campo hace falta llenar o corregir',
        buttons: ['Okay'],
      });

      await alert.present(); */
      const showHelloToast = async () => {
        await Toast.show({
          text: '¡Por favor revisa los datos y corrigelo!',
        });
      };

      await showHelloToast();
      return;
    }

    this.data = {
      id: generateRandomID('USR'),
      name: this.name!,
      perHour: parseInt(this.medicineHour!),
      perDay: parseInt(this.medicineDay!),
      date: this.date ?? new Date(),
    };
    const practiceFac = new UserMedicine();
    createMedicine(this.data, practiceFac);

    this.cleanAllData();
    this.hasMedicine = true;
    this.allData = this.medicalService.getData();
  }

  cleanAllData() {
    this.name = '';
    this.medicineDay = '';
    this.medicineHour = '';
    this.date = new Date();
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  deleteAll() {
    this.hasMedicine = false;
  }

  async sendNotificationToSpecificDevice() {
    try {

      const data = await this.getStorage('auth');

    if(data?.value){
      await lastValueFrom(
      this.onesignal.sendNotification('this is a test message','test message',{type: 'user1'}, data.value)
      );
    }

    }catch(e) {

      console.log(e)

    }
  }

  async sendNotificationAllUsers() {
    try {
      await lastValueFrom(
      this.onesignal.sendNotification('this is a test message for all users','test message for all users',{type: 'user1'})
      );


    }catch(e) {

      console.log(e)

    }
  }
}
