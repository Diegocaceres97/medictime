import { MedicineAbstract } from '../classes/medicine.abstract';

export interface Medicine {
  id?: string;
  name?: string;
  perHour?: number;
  perDay?: number;
  date?: Date;
}
