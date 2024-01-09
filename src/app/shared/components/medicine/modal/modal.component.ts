import { Component } from '@angular/core';
import { IonHeader, IonButton,IonToolbar, IonButtons, IonTitle, IonContent, IonItem, IonInput } from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [FormsModule, IonHeader, IonButton,IonToolbar, IonButtons, IonTitle, IonContent, IonItem, IonInput]
})
export class ModalComponent{

  name?: string;

  constructor(private modalCtrl: ModalController) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }

}
