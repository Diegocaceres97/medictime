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
} from '@ionic/angular/standalone';
import { AddComponent } from '../shared/components/medicine/add/add.component';
import { FormsModule } from '@angular/forms';
import { OverlayEventDetail } from '@ionic/core';
import { Medicine } from '../shared/models/interfaces/medicine.interface';
import { UserMedicine } from '../shared/models/classes/factory/userMedicine.factory';
import { createMedicine } from '../shared/utilities/medicine.functions';
import { AlertController } from '@ionic/angular';

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
    IonDatetime,
    AddComponent,
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
  data: Medicine = {
    id: 1,
    name: '',
    perHour: 1,
    perDay: 1,
    date: undefined,
  };

  constructor(private alertController: AlertController) {}

  @ViewChild(IonModal) modal!: IonModal;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  async confirm() {
    this.modal.dismiss(this.name, 'confirm');

    if(!this.name || parseInt(this.medicineDay as string) <= 0 || parseInt(this.medicineHour as string) <= 0 ) {
      console.error('por favor corrige los datos');
      const alert = await this.alertController.create({
        header: 'Campo faltante',
        message: 'Por favor revisa que campo hace falta llenar o corregir',
        buttons: ['Okay'],
      });

      await alert.present();
    return;
    }

    this.data = {
      id: 2,
      name: this.name!,
      perHour: parseInt(this.medicineHour!),
      perDay: parseInt(this.medicineDay!),
      date: this.date ?? new Date
    }
    const practiceFac = new UserMedicine();
    createMedicine(this.data,practiceFac);

    this.cleanAllData();
  }

  cleanAllData() {
    this.name='';
    this.medicineDay = '';
    this.medicineHour = '';
    this.date = new Date;
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  openModal() {}
}
