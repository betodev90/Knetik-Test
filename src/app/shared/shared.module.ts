import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { SidebarComponent } from './sidebar/sidebar.component';
import { NopagefoundComponent } from '../nopagefound/nopagefound.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
    ],
    declarations: [
        NopagefoundComponent,
        HeaderComponent,
        SidebarComponent,
    ],
    exports: [
        NopagefoundComponent,
        HeaderComponent,
        SidebarComponent,
    ]
})

export class SharedModule { }
