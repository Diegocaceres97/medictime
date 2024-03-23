import { Inject } from "@angular/core";
import { MedicineService } from "../../services/medicine.service";
import { Medicine } from "../interfaces/medicine.interface";
import { MedicineAbstract } from "./medicine.abstract";

export class AddMedicine extends MedicineAbstract {

  medicines: Medicine[] = [];
  medicineService = new MedicineService;

  constructor(public data: Medicine){
    super();
    this.medicines = this.medicineService.getData() || '[]';
  }

   Medicine(): void {
      this.medicines.push(this.data);
      //console.log(this.proof.medicineSubject.value)
      this.medicineService.saveData(this.medicines);
    }
}
export class EditMedicine extends MedicineAbstract {

  medicineService = new MedicineService;
/*   medicines: Medicine[] = []; */

  constructor(public data: Medicine[]) {super()}

   Medicine(): void {
   /*  this.medicineService.deleteAllMedicines();
    this.medicineService.saveData(this.data); */
   }
}
export class DeleteMedicine extends MedicineAbstract {
  medicineService = new MedicineService;
  medicines: Medicine[] = [];

  constructor(public data: Medicine[]) {super()}

   Medicine(): void {
    this.medicineService.deleteAllMedicines();
    this.medicineService.saveData(this.data);
   }
}
export class DeleteAllMedicine extends MedicineAbstract {
   Medicine(): void { }
}
