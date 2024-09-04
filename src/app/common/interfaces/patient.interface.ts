
export interface AddPatientPayload {
    apikey: string,
    mobile: number,
    first_name: string,
    last_name: string,
    zipcode: string,
    dob: string,
    gender: string,
    blood_group: string
}


export interface AddPatientResponse {
    data: data
    datetime: string,
    status_code: string,
    status_message: string
}


interface data {
    patient_id: string
}

export interface Patient {
    mobile: string,
    firstname: string,
    lastname: string,
    zipcode: string,
    patient_id: string
}
export interface Medicine {
     quantity:number,
    medicine_name: string,
    medicine_id :string,
    price:string,
    medicine_category: string,
    mrp:Number,
    content:string,
    manufacturer_name:string,
    id:string,
 
  }
  export interface  checkAvailability{
    medicineIds:string[],
    fullAddress:string,
    


  }
  export interface SearchMedicinesPayload{
    apikey: string,
    searchstring :string,
}

  export interface SearchMedicinesResponse {
    
    datetime: string,
    status_code: string,
    status_message: string,
    data: {
      did_you_mean_result: any[];
      result: Medicine[];
    }
  }

  export interface viewMedicinePayload {
   
    medicine_id: string,
 

}
  export interface viewMedicineResponse {

    datetime: string,
    status_code: string,
    status_message: string,
    data: Medicine

  }


export interface placeorderPayload {
  apikey: string;
  mobile: number;
  items: string;
  delivery_type: string;
  address: string;
  patient_name: string;
  last_name: string;
  zipcode: string;
  state: string;
  city: string;
  full_address:string;
}


export interface placeorderResponse {
    data: Placeorder
    datetime: string,
    status_code: string,
    status_message: string
}



interface Placeorder {
  order_id: string,
  total: number,
  thankyou_msg_first: string,
  pharmacy_name: string,
  thankyou_msg_second: string,
  
    
}

export interface CartItem {
  medicine_id: string;
  medicine_name: string;
  quantity: number;
}
