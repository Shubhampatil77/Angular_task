import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddPatientComponent } from './add-patient/add-patient.component';

import { ApiService } from '../common/services/api/api.service';
import { Medicine, SearchMedicinesResponse } from '../common/interfaces/patient.interface';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  displayColumns: string[] = ['medicinename', 'price', 'packing_size', 'mobile', 'action'];
 

    @ViewChild(MatSort) sort!: MatSort;
    medicines: Medicine[] = [];
    medicine_name: string = '';

    constructor(public dialog: MatDialog, private router: Router, public apiService: ApiService) { }

    ngOnInit(): void {
    }

    openDialog(medicine_id?: string) {
      this.dialog.open(AddPatientComponent, {
          data: {
              medicine_id
          },
      });
  }

    onSearch(): void {
        this.apiService.searchMedicines(this.medicine_name).subscribe({
          next: (data: SearchMedicinesResponse) => {
            if (data.status_code === "0") {
                console.log('api respone',data.data.result);
            } else {
              if (data.status_code === "1") {
                console.log('api respone',data);
            }   
              this.medicines = data.data.result; // Assuming the API returns an array of medicines
            }
          },
          error: (error) => {
            console.error('Error:', error);
            alert('Error: ' + error.error.status_message); // Displaying error message to user
          }
        });
      }


      redirect(medicine_id: string): void {
        this.router.navigate(['dashboard/checkout'], { queryParams: {medicine_id}})
        
    }

    
    addToCart(medicine: Medicine): void {
      const userId = localStorage.getItem('userId');
      
      // if (!userId) {
      //   console.error('User is not logged in.');
      //   alert('You must be logged in to add items to the cart!');
      //   return;
      // }
    
      try {
        // Get the current cart from localStorage or initialize a new cart
        const cart: any[] = JSON.parse(localStorage.getItem('cart') || '[]');
    
        // Check if the medicine already exists in the cart
        const existingItem = cart.find((item) => item.medicine_id === medicine.medicine_id);
    
        if (existingItem) {
          // If the item exists, increase the quantity
          existingItem.quantity += 1;
        } else {
          // If the item does not exist, add it to the cart with quantity 1
          cart.push({
            user_id: userId,
            medicine_id: medicine.medicine_id,
            medicine_name: medicine.medicine_name,
            price: medicine.price,
            quantity: 1
          });
        }
    
        // Save the updated cart back to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    
        console.log('Added to cart:', cart);
        alert('Medicine added to cart!');
      } catch (error) {
        console.error('Error accessing localStorage:', error);
      }
    }
    
    
    
    opencart(): void {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  
      this.router.navigate(['dashboard/checkout']);
    }
    

  }
