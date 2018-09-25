import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graphs1Component } from './graphs1/graphs1.component';
import { DevicesComponent } from './devices/devices.component';
import { DeviceViewComponent } from './device-view/device-view.component';

const pagesRoutes: Routes = [
    {    path: '',
         component: PagesComponent,
         children: [
            { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' }},
            { path: 'graphs1', component: Graphs1Component, data: { title: 'Graphs' } },
            { path: 'devices', component: DevicesComponent, data: { title: 'Devices' } },
            { path: 'devices/:id', component: DeviceViewComponent, data: { titulo: 'View Device' } },
            { path: '', redirectTo: '/devices', pathMatch: 'full'}
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
