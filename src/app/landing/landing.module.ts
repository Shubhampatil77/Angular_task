import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { CommonComponentsModule } from '../common/common.module';
import {MatInputModule} from '@angular/material/input';

@NgModule({
    declarations: [
        LandingComponent
    ],
    imports: [
        CommonModule,
        LandingRoutingModule,
        CommonComponentsModule,
        MatInputModule
    ]
})
export class LandingModule { }
