import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/common/services/api/api.service';
import * as moment from 'moment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddPatientResponse, Patient } from 'src/app/common/interfaces/patient.interface';

@Component({
    selector: 'app-add-patient',
    templateUrl: './add-patient.component.html',
    styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {

    addPatientForm!: FormGroup;
    patientData!: Patient;
    

    constructor(
        public dialogRef: MatDialogRef<AddPatientComponent>,
        private apiService: ApiService,
        @Inject(MAT_DIALOG_DATA) public data: { id: string }
    ) {}

    ngOnInit(): void {
        this.createForm();
        if (this.data.id) {
            this.addPatientForm.controls['last_name'].setValidators([Validators.required]);
            this.addPatientForm.controls['last_name'].updateValueAndValidity();
        }
    }

    createForm(): void {
        this.addPatientForm = new FormGroup({
            mobile: new FormControl('', [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]),
            first_name: new FormControl('', [Validators.required]),
            last_name: new FormControl(''),
            zipcode: new FormControl(''),
            dob: new FormControl(''),
            gender: new FormControl(''),
            blood_group: new FormControl('')
        });
    }

    addPatient(): void {
        if (this.addPatientForm.invalid) {
            return; // Prevent submission if the form is invalid
        }

        const payload: any = {
            ...this.addPatientForm.value,
            dob: this.addPatientForm.value.dob ? moment(this.addPatientForm.value.dob).format('YYYY-MM-DD') : undefined
        };

        this.apiService.addPatient(payload).subscribe(
            (data: AddPatientResponse) => {
                if (data.status_code === '1') {
                    localStorage.setItem('patient', JSON.stringify(this.addPatientForm.value));
                    this.dialogRef.close();
                } else {
                    console.error('Error:', data.status_message); // Handle unsuccessful response
                }
            },
            (error) => {
                console.error('API Error:', error); // Log error for debugging
            }
        );
    }
}
