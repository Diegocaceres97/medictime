import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { Medicine } from 'src/app/shared/models/interfaces/medicine.interface';
import { getData } from 'src/app/shared/utilities/medicine.functions';

@Component({
  selector: 'app-show-medicine',
  templateUrl: './show-medicine.component.html',
  styleUrls: ['./show-medicine.component.scss'],
  standalone: true,
  imports: [IonButton, CommonModule]
})
export class ShowMedicineComponent {
  data: Medicine[] = [];

  constructor() {
    this.data = getData();
   }

}
