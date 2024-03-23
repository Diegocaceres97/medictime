import { MedicineService } from './../../../services/medicine.service';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Device } from '@capacitor/device';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonActionSheet,
  IonModal,
  IonButtons,
  IonButton,
  IonItem,
  IonInput,
  IonDatetime,
  IonToast, IonLabel } from '@ionic/angular/standalone';
import { Medicine } from 'src/app/shared/models/interfaces/medicine.interface';
import { ActionSheetController } from '@ionic/angular';
import { UserMedicine } from 'src/app/shared/models/classes/factory/userMedicine.factory';
import {
  deleteMedicine,
  editMedicine,
} from 'src/app/shared/utilities/medicine.functions';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-show-medicine',
  templateUrl: './show-medicine.component.html',
  styleUrls: ['./show-medicine.component.scss'],
  standalone: true,
  imports: [IonLabel,
    IonHeader,
    IonModal,
    IonButton,
    IonIcon,
    IonActionSheet,
    CommonModule,
    IonHeader,
    IonButtons,
    IonItem,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonDatetime,
    IonToast,
    FormsModule
  ],
})
export class ShowMedicineComponent implements OnInit {
  @Input() data!: Medicine[];
  isIphone: boolean = false;

  medicines: Medicine[] = [];
  name?: string;
  medicineHour?: string;
  medicineDay?: string;
  date!: Date;
  isOpen:boolean = false;
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
        console.log('"edit"');
        this.isOpen = true;
        break;

      default:
        console.warn('cancel');
        break;
    }
  }

  onWillDismiss(event:any){

  }

  confirm(){

  }
}
