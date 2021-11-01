import { PaymentInterface } from "./IPayment";
import { PlaceInterface } from "./IPlace";
import { RegistrationsInterface } from "./IRegistrations"; 
import { StudentInterface } from "./IStudent";

//การทำให้ชื่อของ attribute ของ frontend กับ backend ตรงกัน
//
export interface BillInterface {
    
    ID:     number,

    //ต้องตรงกับ backend
    PaymentTypeID: number,
    PaymentType  : PaymentInterface,

    RegistrationID: number,
    Registration:   RegistrationsInterface,


    PlaceID:        number,
    Place:          PlaceInterface,

    TotalPrice:     number,
   

    BillTime:       Date | null;
   
   }