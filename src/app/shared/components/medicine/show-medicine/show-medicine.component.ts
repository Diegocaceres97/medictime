import { MedicineService } from './../../../services/medicine.service';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Device } from '@capacitor/device';
import { IonButton, IonIcon, IonActionSheet } from '@ionic/angular/standalone';
import { Medicine } from 'src/app/shared/models/interfaces/medicine.interface';

@Component({
  selector: 'app-show-medicine',
  templateUrl: './show-medicine.component.html',
  styleUrls: ['./show-medicine.component.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonActionSheet, CommonModule],
})
export class ShowMedicineComponent implements OnInit {
  @Input() data!: Medicine[];
  isIphone: boolean = false;

  medicines: Medicine[] = [];
  public actionSheetButtons = [
    {
      text: 'Eliminar',
      role: 'destructive',
      data: {
        action: 'delete',
      },
    },
    {
      text: 'Editar',
      data: {
        action: 'share',
      },
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];

  constructor(private medicineService: MedicineService) {}
  async ngOnInit(): Promise<void> {
    if (!this.data) {
      this.data = this.medicineService.getData();
    }

    await this.deviceInformation();
  }

  async deviceInformation() {
    const info = await Device.getInfo();
    console.log('epale sempai', info.platform === 'ios');
    this.isIphone = info.platform === 'ios';
  }
}
