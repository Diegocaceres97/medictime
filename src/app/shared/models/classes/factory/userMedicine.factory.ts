import { Medicine } from "../../interfaces/medicine.interface";
import { MedicineAbstract } from "../medicine.abstract";
import { AddMedicine, EditMedicine, DeleteMedicine, DeleteAllMedicine } from "../medicine.class";
import { MedicineFactory } from "./medicine.factory";

export class UserMedicine implements MedicineFactory {
  addMedicine(data: Medicine): MedicineAbstract {
    return new AddMedicine(data);
  }
  editMedicine(): MedicineAbstract {
    return new EditMedicine();
  }
  deleteMedicine(): MedicineAbstract {
    return new DeleteMedicine();
  }
  deleteAllMedicine(): MedicineAbstract {
    return new DeleteAllMedicine();
  }

}
