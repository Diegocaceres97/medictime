import { MedicineFactory } from '../models/classes/factory/medicine.factory';
import { Medicine } from '../models/interfaces/medicine.interface';

export function createMedicine(data: Medicine, factory: MedicineFactory) {
  const createMedicine = factory.addMedicine(data);
  createMedicine.Medicine();
}
