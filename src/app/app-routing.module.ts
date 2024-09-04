import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './common/services/auth/auth.guard';

const routes: Routes = [
    { path: '', redirectTo: 'landing', pathMatch: 'full' },
    { path: 'landing', loadChildren: () => import('./landing/landing.module').then(l => l.LandingModule ) },
    { path: 'login', loadChildren: () => import('./login/login.module').then(l => l.LoginModule ) },
    { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(d => d.DashboardModule ), canActivate: [AuthGuard] , },

        
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
