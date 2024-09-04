import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    isShowSpinner: boolean = false;

    constructor() { }
}
