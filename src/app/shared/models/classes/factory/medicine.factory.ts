import { Medicine } from "../../interfaces/medicine.interface";
import { MedicineAbstract } from "../medicine.abstract";

export interface MedicineFactory {
  addMedicine(data: Medicine): MedicineAbstract;
  editMedicine(data: Medicine[]): MedicineAbstract;
  deleteMedicine():MedicineAbstract;
  deleteAllMedicine():MedicineAbstract;
}
