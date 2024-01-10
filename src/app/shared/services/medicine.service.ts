import { Injectable } from '@angular/core';
import { Medicine } from '../models/interfaces/medicine.interface';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  constructor() {
  }


  getData(): Medicine[] {
    const data = JSON.parse(localStorage.getItem('medicina') || '[]');
    return data;
  }
}
