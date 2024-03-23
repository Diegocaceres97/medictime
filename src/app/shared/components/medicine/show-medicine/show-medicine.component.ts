import { MedicineService } from './../../../services/medicine.service';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Device } from '@capacitor/device';
import { IonButton, IonIcon, IonActionSheet } from '@ionic/angular/standalone';
import { Medicine } from 'src/app/shared/models/interfaces/medicine.interface';
import { ActionSheetController } from '@ionic/angular';
import { UserMedicine } from 'src/app/shared/models/classes/factory/userMedicine.factory';
import { deleteMedicine, editMedicine } from 'src/app/shared/utilities/medicine.functions';
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
        action: 'edit',
      },
      role: 'edit',
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];

  medicineSelected: Medicine = {};

  constructor(
    private medicineService: MedicineService,
    private actionSheetCtrl: ActionSheetController
  ) {}
  async ngOnInit(): Promise<void> {
    if (!this.data) {
      this.data = this.medicineService.getData();
    }

    await this.deviceInformation();
  }

  async deviceInformation() {
    const info = await Device.getInfo();
    //console.log('epale sempai', info.platform === 'ios');
    this.isIphone = info.platform === 'ios';
  }

  async proof(item: Medicine) {
    this.medicineSelected = item;
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Acciones',
      buttons: this.actionSheetButtons,
    });

    actionSheet.onDidDismiss().then((result) => {
      // Maneja el resultado del action sheet aquí
      //console.log('Acción seleccionada:', result.data.action);
      this.logResult(result?.data?.action);
    });

    await actionSheet.present();
  }

  logResult(optionSelected: string) {
    const practiceFac = new UserMedicine();
    switch (optionSelected) {
      case 'delete':
        this.data = this.data.filter(
          (objeto) => objeto.id !== this.medicineSelected?.id
        );
        deleteMedicine(this.data, practiceFac);
        break;
      case 'edit':
        console.log('"shareeee"');
        break;

      default:
        console.warn('cancel');
        break;
    }
  }
}
