import { Injectable } from '@angular/core';
import { Medicine } from '../models/interfaces/medicine.interface';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  private readonly medicine = 'medicina';

  constructor() {
  }


  getData(): Medicine[] {
    const data = JSON.parse(localStorage.getItem(this.medicine) || '[]');
    return data;
  }

  saveData(medicine: Medicine[]) {
    localStorage.setItem(this.medicine,JSON.stringify(medicine));
  }

  deleteAllMedicines() {
    localStorage.removeItem(this.medicine);
  }
}
