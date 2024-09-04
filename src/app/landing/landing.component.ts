import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit(): void {
        // Redirect to dashboard if already logged in
        if (localStorage.getItem('user')) {
            this.router.navigate(['/dashboard']);
        }
    }

}
