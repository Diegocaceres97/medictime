import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
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
  IonToast
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
import { AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ShowMedicineComponent } from '../shared/components/medicine/show-medicine/show-medicine.component';
import { MedicineService } from '../shared/services/medicine.service';
import { Toast } from '@capacitor/toast';
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
export class HomePage {
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

  constructor(
    private alertController: AlertController,
    private medicalService: MedicineService
  ) {
    this.hasMedicine = this.medicalService.getData() ? true : false;
  }

  @ViewChild(IonModal) modal!: IonModal;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  async confirm() {
    this.modal.dismiss(this.name, 'confirm');

    if (
      !this.name ||
      (parseInt(this.medicineDay as string) <= 0 &&
        parseInt(this.medicineHour as string) <= 0) ||
      (!this.medicineHour && !this.medicineDay)
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
}
