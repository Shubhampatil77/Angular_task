import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CommonComponentsModule } from '../common/common.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CheckoutMedicineComponent } from './checkout-medicine/checkout-medicine.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
// import { CartComponent } from './cart/cart.component';





@NgModule({
    declarations: [
        DashboardComponent,
        AddPatientComponent,
        CheckoutMedicineComponent,
        PlaceOrderComponent,
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        CommonComponentsModule,
        MatIconModule,
        MatButtonModule,
        MatTableModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatNativeDateModule,
        MatSelectModule,
        MatDividerModule,
        MatListModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatAutocompleteModule,
        MatSidenavModule
    ]
})
export class DashboardModule { }
