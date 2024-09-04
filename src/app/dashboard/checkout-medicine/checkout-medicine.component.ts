import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/common/services/api/api.service';
import { MatDialog } from '@angular/material/dialog';
import { viewMedicineResponse, Medicine } from 'src/app/common/interfaces/patient.interface';
import { PlaceOrderComponent } from '../place-order/place-order.component';

@Component({
  selector: 'app-checkout-medicine',
  templateUrl: './checkout-medicine.component.html',
  styleUrls: ['./checkout-medicine.component.css']
})
export class CheckoutMedicineComponent implements OnInit {
  id: string = '';
  medicinedata!: Medicine;
  cartItems: any[] = [];
  displayedColumns: string[] = ['medicine_name', 'quantity', 'price', 'action'];

  availableMedicines: any[] = [];
  unavailableMedicines: any[] = [];
  alternativeMedicines: any[] = [];
  router: any;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef  // Inject ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // Get patient id from query param
    this.route.queryParams.subscribe(params => {
      this.id = params['medicine_id'];
      this.loadMedicines();
    });

    // Load cart items from local storage
    this.loadCartItems();
  }

  loadMedicines(): void {
    // Get patient data
    this.apiService.viewMedicine({ medicine_id: this.id }).subscribe((data: viewMedicineResponse) => {
      if (data.status_code === '1') {
        this.medicinedata = data.data;
        this.cdr.detectChanges();  // Manually trigger change detection
      }
    });
  }

  loadCartItems(): void {
    // Retrieve cart items from local storage
    const cart = localStorage.getItem('cart');
    if (cart) {
      this.cartItems = JSON.parse(cart);
      this.cdr.detectChanges();  // Manually trigger change detection
    }
  }


  openDialog(): void {
    const medicines = this.cartItems.map(item => ({
      id: item.medicine_id,   // Get the medicine ID from the cart
      name: item.medicine_name // Get the medicine name from the cart
    }));
  
    if (medicines.length === 0) {
      console.error('No available medicines found in the cart.');
      return; // Prevent further execution if no medicines are found
    }
    this.dialog.open(PlaceOrderComponent, {
      data: { medicines: medicines },
    });
    // console.log("medicines Data From Dailog"+medicines)
  }
  
  
  removeItem(item: any): void {
    const updatedCart = this.cartItems.filter(cartItem => cartItem.medicine_id !== item.medicine_id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    this.cartItems = updatedCart; // Update the local cart items array
    this.cdr.detectChanges();  // Manually trigger change detection
  }

  checkout(): void {
    const medicineIds = this.cartItems.map(item => item.medicine_id);
    const fullAddress = '560008';

    this.apiService.checkAvailability(medicineIds, undefined, undefined, fullAddress)
      .subscribe(
        (response) => {
          if (response && response.status_code === '1' && response.data && response.data.availability) {
            const availability = response.data.availability;

            availability.forEach((medicine: any) => {
              if (medicine.in_stock === 'yes') {
                this.availableMedicines.push(medicine);
              } else {
                this.unavailableMedicines.push(medicine);
                if (medicine.alternatives && medicine.alternatives.length > 0) {
                  this.alternativeMedicines.push(...medicine.alternatives);
                }
              }
            });

            this.cdr.detectChanges();  // Manually trigger change detection

            if (this.unavailableMedicines.length > 0) {
              alert('Some medicines are not available. Alternatives are suggested.');
            } else {
              alert('All medicines are available. Proceeding to checkout.');
            }
          } else {
            console.error('Error in API Response:', response?.status_message);
          }
        },
        (error) => {
          console.error('API Error:', error.message);
          alert('An error occurred while processing your request. Please try again later.');
        }
      );
  }

  replaceWithAlternative(unavailableMedicine: any, alternativeMedicine: any): void {
    const index = this.cartItems.findIndex(item => item.medicine_id === unavailableMedicine.medicine_id);
    
    if (index !== -1) {
      this.cartItems[index] = {
        ...this.cartItems[index],  // Keep the other properties (like quantity)
        ...alternativeMedicine    // Replace properties with alternative medicine details
      };
      localStorage.setItem('cart', JSON.stringify(this.cartItems)); // Update local storage
      this.cdr.detectChanges();  // Trigger change detection to update the view
    }
  }
  
  Back(){
    this.router.navigate(['/']);  // Navigate to dashboard

  }
  
}
