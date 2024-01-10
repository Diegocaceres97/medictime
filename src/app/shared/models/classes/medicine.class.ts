import { Medicine } from "../interfaces/medicine.interface";
import { MedicineAbstract } from "./medicine.abstract";

export class AddMedicine extends MedicineAbstract {

  medicines: Medicine[] = [];

  constructor(public data: Medicine){
    super();
    this.medicines = JSON.parse(localStorage.getItem('medicina') || '[]');
  }

   Medicine(): void {
      this.medicines.push(this.data);
      localStorage.setItem('medicina',JSON.stringify(this.medicines));
      console.log(this.medicines)
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
