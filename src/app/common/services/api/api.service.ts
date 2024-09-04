import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {  placeorderResponse, AddPatientPayload, AddPatientResponse, SearchMedicinesPayload, SearchMedicinesResponse, viewMedicinePayload, viewMedicineResponse,placeorderPayload } from '../../interfaces/patient.interface';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private baseUrl = environment.apiEndpoint;
    private apikey = environment.apikey;

    constructor(private httpClient: HttpClient) { }
// search medicine api
    searchMedicines(medicine_id: string): Observable<SearchMedicinesResponse> {
        const url = `${this.baseUrl}medicines/search`; 
        const payload:SearchMedicinesPayload = {
          searchstring :medicine_id,
          apikey:this.apikey
        };
        const headers = new HttpHeaders({
          'Content-Type': 'application/json'
        });
        return this.httpClient.post<SearchMedicinesResponse>(url, payload, { headers });
      }
// view medicine api
    viewMedicine(payload:viewMedicinePayload): Observable<viewMedicineResponse> {
      const url = `${this.baseUrl}medicines/view`;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      return this.httpClient.post<viewMedicineResponse>(url, payload, { headers });
  }

   // Add patient api
   addPatient(payload: AddPatientPayload): Observable<AddPatientResponse> {
    return this.httpClient.post<AddPatientResponse>(`${this.baseUrl}patients/add`, payload);
}
    

    // place medicines order
    placeorder(payload: placeorderPayload): Observable<placeorderResponse> {
      const url = `${this.baseUrl}orders/place_order`;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
        return this.httpClient.post<placeorderResponse>(url, payload,{ headers } );
    }

checkAvailability(medicineIds: string[], latitude?: number, longitude?: number, fullAddress?: string): Observable<any> {
  const url = `${this.baseUrl}orders/checkout`; // Use the correct API endpoint
  const body: any = {
      apikey: this.apikey,
      medicine_ids: JSON.stringify(medicineIds)
  };

  if (latitude && longitude) {
      body.latitude = latitude;
      body.longitude = longitude;
  } else if (fullAddress) {
      body.full_address = fullAddress;
  }

  const headers = new HttpHeaders({
      'Content-Type': 'application/json'
  });
  return this.httpClient.post<any>(url, body, { headers });
}


}
