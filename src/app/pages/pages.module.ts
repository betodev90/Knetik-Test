import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from '../shared/shared.module';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graphs1Component } from './graphs1/graphs1.component';
import { DevicesComponent } from './devices/devices.component';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        Graphs1Component,
        DevicesComponent
    ],
    exports: [
        DashboardComponent,
    ],
    imports: [
        BrowserModule,
        CommonModule,
        SharedModule,
        PAGES_ROUTES
    ]
})

export class PagesModule { }