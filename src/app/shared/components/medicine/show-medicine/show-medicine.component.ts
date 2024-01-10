import { MedicineService } from './../../../services/medicine.service';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { Medicine } from 'src/app/shared/models/interfaces/medicine.interface';

@Component({
  selector: 'app-show-medicine',
  templateUrl: './show-medicine.component.html',
  styleUrls: ['./show-medicine.component.scss'],
  standalone: true,
  imports: [IonButton, IonIcon,CommonModule],
})
export class ShowMedicineComponent implements OnInit {
  @Input() data!: Medicine[];

  medicines: Medicine[] = [];
  constructor(private medicineService: MedicineService) {
  }
  ngOnInit(): void {
    if (!this.data) {
      this.data = this.medicineService.getData();
    }
  }
}
