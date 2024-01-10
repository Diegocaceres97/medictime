import { Inject } from "@angular/core";
import { MedicineService } from "../../services/medicine.service";
import { Medicine } from "../interfaces/medicine.interface";
import { MedicineAbstract } from "./medicine.abstract";

export class AddMedicine extends MedicineAbstract {

  medicines: Medicine[] = [];
  proof = new MedicineService;

  constructor(public data: Medicine){
    super();
    this.medicines = JSON.parse(localStorage.getItem('medicina') || '[]');
  }

   Medicine(): void {
      this.medicines.push(this.data);
      //console.log(this.proof.medicineSubject.value)
      localStorage.setItem('medicina',JSON.stringify(this.medicines));
    }
}
export class EditMedicine extends MedicineAbstract {
   Medicine(): void { }
}
export class DeleteMedicine extends MedicineAbstract {
   Medicine(): void { }
}
export class DeleteAllMedicine extends MedicineAbstract {
   Medicine(): void { }
}
