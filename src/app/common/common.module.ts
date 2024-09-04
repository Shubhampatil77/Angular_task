import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



const components = [
    HeaderComponent,
    FooterComponent,
    
]

@NgModule({
    declarations: [
        ...components,
    ],
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        MatIconModule,
        MatButtonModule,
        MatSnackBarModule
    ],
    exports: [
        ...components
    ]
})
export class CommonComponentsModule { }
