import { Observable, of } from 'rxjs';
import { MedicineFactory } from '../models/classes/factory/medicine.factory';
import { Medicine } from '../models/interfaces/medicine.interface';

export function createMedicine(data: Medicine, factory: MedicineFactory): void {
  const createMedicine = factory.addMedicine(data);
  createMedicine.Medicine();
}

export function editMedicine(data: Medicine[], factory: MedicineFactory){
  const editMedicine = factory.editMedicine(data);
  editMedicine.Medicine();
}

export function deleteMedicine(data: Medicine[], factory: MedicineFactory){
  const editMedicine = factory.deleteMedicine(data);
  editMedicine.Medicine();
}

export function generateRandomID(prefix: string = 'ID'): string {
  const randomPart = Math.random().toString(36).substr(2, 8); // Parte aleatoria
  return `${prefix}_${randomPart}`;
}
