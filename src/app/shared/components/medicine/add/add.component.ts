import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { MedicineService } from 'src/app/shared/services/medicine.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, CommonModule],
})
export class AddComponent {

  @Input() iconName: string = 'heart';
  @Input() color: string = 'dark';
  @Input() backgroundColor: string = '#ffc409';
  @Output() clickButton = new EventEmitter<void>();
  data: any;

  constructor(private medicineService: MedicineService) {
    this.data = this.medicineService.getData();
  }

  onButtonClick() {
    this.clickButton.emit();
  }

}
