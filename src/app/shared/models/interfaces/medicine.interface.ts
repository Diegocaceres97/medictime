import { MedicineAbstract } from '../classes/medicine.abstract';

export interface Medicine {
  id?: number;
  name?: string;
  perHour?: number;
  perDay?: number;
  date?: Date;
}
