import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { URL_SERVICES } from '../../config/config';
import { Device } from '../../models/device.model';

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
    let url = URL_SERVICES + '?filter=' + term;
    return this.http.get( url );
  }

  getDevice( id: string ) {
    let url = URL_SERVICES + '?filter=id:' + id;
    return this.http.get( url ).map( (resp: any) => resp.content);
  }
}
