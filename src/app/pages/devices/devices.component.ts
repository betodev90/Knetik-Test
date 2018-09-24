import { Component, OnInit } from '@angular/core';
import { Device } from '../../models/device.model';
import { DeviceService } from '../../services/device/device.service';

declare var swal: any;

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styles: []
})

export class DevicesComponent implements OnInit {
  devices: Device[] = [];
  size: number;
  loading: boolean;
  // Pagination
  page: number;
  first: boolean;
  last: boolean;
  total_page: number;
  total_elements: number;
  number_of_elements: number;

  constructor(
    public _deviceService: DeviceService
  ) { }

  ngOnInit() {
    this.loadDevices();
  }

  loadDevices() {
    this.loading = true;
    this._deviceService.loadDevices( this.page )
    .subscribe( (resp: any) => {
      this.total_page = resp.total_pages;
      this.size = resp.size;
      this.total_elements = resp.total_elements;
      this.devices = resp.content;
      if ( resp.first ) {
        this.page = 1;
      }
      this.loading = false;
    });
  }

  changeSince( value: number ) {
    let since = this.page + value;
    if ( since >= this.total_page ) {
      return;
    }
    if ( since < 0 ) {
      return;
    }
    this.page += value;
    this.loadDevices();
  }

  filterDeviceByLocation( term: string ) {
    if (term.length <= 0) {
      this.loadDevices();
      return;
    }
    this.loading = true;
    this._deviceService.filterByDevice( term )
    .subscribe( (resp: any) => {
      console.log(resp);
      this.devices = resp.content;
      this.loading = false;
    });
  }

}
