import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { CheckoutMedicineComponent } from './checkout-medicine/checkout-medicine.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
// import { CartComponent } from './cart/cart.component';

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'checkout', component: CheckoutMedicineComponent },
    { path: 'placeorder', component: PlaceOrderComponent },
    // { path: 'cart', component: CartComponent },
    //   { path: '**', redirectTo: '/cart' }  Wildcard route for handling 404

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
