import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonModal, IonButtons, IonButton, IonItem, IonInput, IonDatetime } from '@ionic/angular/standalone';
import { AddComponent } from '../shared/components/medicine/add/add.component';
import { FormsModule } from '@angular/forms';
import { OverlayEventDetail } from '@ionic/core';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader,FormsModule, IonToolbar, IonTitle, IonContent, IonModal,IonButtons, IonButton,IonItem, IonInput,IonDatetime, AddComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class HomePage {
  message = 'This modal example uses the modalController to present and dismiss modals.';
  name?: string;
  medicineHour?: string;
  medicineDay?: string;

  constructor() {}

  @ViewChild(IonModal) modal!: IonModal;


  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  openModal(){}
}
