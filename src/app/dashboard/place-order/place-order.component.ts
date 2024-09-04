import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { placeorderPayload, placeorderResponse, viewMedicineResponse, Medicine } from 'src/app/common/interfaces/patient.interface';
import { ApiService } from 'src/app/common/services/api/api.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {

  placeorderForm!: FormGroup;
  medicinedata!: Medicine;
  cartItems: any[] = [];

  userData: any = {};
  filteredOptions!: Observable<string[]>;

  constructor(
    public dialogRef: MatDialogRef<PlaceOrderComponent>,
    private fb: FormBuilder,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) 
  
  {  
     console.log('Injected data:', data);  // Debugging: Log the injected data to see its structure

    // Initialize the form with a form array for items
    this.placeorderForm = this.fb.group({
      items: this.fb.array([]),
      mobile: ['', [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]],
      patient_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      delivery_type: ['', [Validators.required]],
      address: [''],
      state: [''],
      city: [''],	
      zipcode: ['', [Validators.required]],
      full_address: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    const data = localStorage.getItem('patient');
    if (data) { 
      this.userData = JSON.parse(data);
    }
    console.log('Cart items before fetching medicine details:', this.cartItems);

    if (this.data.medicines && this.data.medicines.length > 0) {
      console.log('Medicines retrieved:', this.data.medicines); 
  
      // Fetch the medicine details (name and other details) from API or a local mapping
      this.fetchMedicineDetails(this.data.medicines).then((medicines) => {
        this.cartItems = medicines.map((medicine: any) => ({
          medicine_id: medicine.id,  // Assuming medicine has 'id' field
          medicine_name: medicine.name, // Assuming medicine has 'name' field
          quantity: 1
        }));
        this.initializeForm(); 
      });
  
    } else {
      console.warn('No medicines found in injected data'); 
    }
  }
  
 // Function to fetch or map the medicine names from cart items
fetchMedicineDetails(medicineIds: any[]): Promise<any[]> {
  
  return new Promise((resolve) => {
    const medicines = medicineIds.map((item) => {
      const id = typeof item === 'string' ? item : item.id; 
      const name = typeof item === 'string' ? item : item.name; 

      const medicine = this.cartItems.find(cartItem => cartItem.medicine_id.id === id);
      // console.log(medicine);
      // console.log(medicine.medicine_name);

      
      // Return the ID and name, defaulting to 'Unknown Medicine' if not found
      return {
        id: id,
        name: name
      };
    });

    resolve(medicines);
  });
  
}

    

  // Method to initialize the form with the cart items
  initializeForm() {
    const cartItems = this.cartItems;
    cartItems.forEach((item: any) => this.addItem(item));
  }

  // Getter for accessing the items FormArray
  get items(): FormArray {
    return this.placeorderForm.get('items') as FormArray;
  }

  // Method to add an item to the FormArray
  addItem(item: any) {
    console.log('Adding item:', item); // Debugging: Log each item being added

    this.items.push(this.fb.group({
      medicine_id: [item.medicine_id || item.id || '', Validators.required], // Ensure medicine_id is correctly populated
      medicine_name: [item.medicine_name || '', Validators.required], // Add medicine name to the form group

      quantity: [item.quantity || 1, [Validators.required, Validators.min(1)]]
    }));
  }

  // Method to remove an item from the FormArray
  removeItem(index: number) {
    this.items.removeAt(index);
  }

  // Method to handle the form submission and API call
  addPatient(): void {
    // Serialize the items array to a JSON string
    const itemsJsonString = JSON.stringify(this.placeorderForm.value.items.map((item: any) => ({
      medicine_id: item.medicine_id,
      medicine_name:item.medicine_name,
      quantity: item.quantity
    })));

    // Construct the payload for the API request
    const payload: placeorderPayload = {
      apikey: 'wFIMP75eG1sQEh8vVAdXykgzF4mLhDw3', 
      mobile: this.placeorderForm.value.mobile,
      items: itemsJsonString, // Pass the JSON string to the API
      delivery_type: this.placeorderForm.value.delivery_type,
      address: this.placeorderForm.value.address,
      patient_name: this.placeorderForm.value.patient_name,
      last_name: this.placeorderForm.value.last_name,
      zipcode: this.placeorderForm.value.zipcode,
      state: this.placeorderForm.value.state,
      full_address: this.placeorderForm.value.full_address,
      city: this.placeorderForm.value.city
    };

    console.log('Payload to send:', payload); // Debugging line

    // Make the API call to place the order
    this.apiService.placeorder(payload).subscribe(
      (data: placeorderResponse) => {
        if (data.status_code === '1') {
          this.dialogRef.close();
        } else {
          alert(data.status_message); // Show the error message to the user
        }
      },
      (error) => {
        console.error('API Error:', error);
        alert('An error occurred while placing the order.');
      }
    );
  }
}