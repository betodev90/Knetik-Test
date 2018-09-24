import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { Device } from '../../models/device.model';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Router } from '@angular/router';

@Injectable()
export class DeviceService {
  device: Device;

  constructor(
    public http: HttpClient,
    public router: Router,
  ) { }

  loadDevices( page: number = 1 ) {
    let url = URL_SERVICES + '?page=' + page;
    return this.http.get( url );
  }

  filterByDevice( term: string ) {
    console.log('In Service: ' + term);
    let url = URL_SERVICES + '?filter=location:' + term;
    return this.http.get( url );
  }

  getDevice( id: string ) {
    let url = URL_SERVICES + '?filter=id:' + id;
    return this.http.get( url );
  }

}
