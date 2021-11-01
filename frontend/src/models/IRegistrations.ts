import { StudentInterface } from "./IStudent";

//เปลี่ยนตามเฟย
export interface RegistrationsInterface {

    ID:     number,

    UserID:          number,
    User  :          StudentInterface,

    UngraduatedYear: number;
  
    Trimester:       number,

    TotalCredit:     number;

   

    EnrollDateTime: Date | null;
   }