import { Component } from '@angular/core';
import { CommonService } from './common/services/common/common.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(public commonService: CommonService) {}

    title = 'eVitalRx-Practical';
}
