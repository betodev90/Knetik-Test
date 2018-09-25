import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Device } from '../../models/device.model';
import { DeviceService } from '../../services/service.index';

@Component({
  selector: 'app-devices-location',
  templateUrl: './devices-location.component.html',
  styles: []
})
export class DevicesLocationComponent implements OnInit {
  devices: Device[] = [];
  loading: boolean;
  result: boolean;

  // Pagination
  page: number;
  size: number;
  first: boolean;
  last: boolean;
  total_page: number;
  total_elements: number;
  number_of_elements: number;
  // QueryParams
  path_filter: string;
  location_code: string;

  @ViewChild('input')
  myInputVariable: ElementRef;

  constructor(
    public _deviceService: DeviceService,
    public router: Router
  ) { }

  ngOnInit() {
    this.loadDevicesByLocation();
  }

  loadDevicesByLocation() {
    this.loading = true;
    let valuein = this.myInputVariable.nativeElement.value;
    if (valuein === '') {
      this.loading = false;
      return;
    } else {
      this.path_filter = 'location:' + valuein;
      this._deviceService.filterByDevice( this.path_filter )
      .subscribe((resp: any) => {
        this.result = true;
        this.location_code = valuein;
        this.devices = resp.content;
        this.loading = false;
        this.total_page = resp.total_pages;
        this.size = resp.size;
        this.total_elements = resp.total_elements;
        this.devices = resp.content;
        if (resp.first) {
          this.page = 1;
        }
      });
    }
  }
  changeSincePage( value: number ) {
    let inputValue = this.myInputVariable.nativeElement.value;
    if ( this.page > this.total_page ) {
      return;
    }
    if ( this.page < 0 ) {
      return;
    }
    if (this.first || this.page > 0) {
      this.page += value;
    }
    this.path_filter = 'location:' + inputValue + '&page=' + this.page;
    console.log(this.path_filter);
    this._deviceService.filterByDevice( this.path_filter )
      .subscribe((resp: any) => {
        console.log(resp);
        this.result = true;
        this.location_code = inputValue;
        this.devices = resp.content;
        this.loading = false;
        this.total_page = resp.total_pages;
        this.size = resp.number_of_elements;
        this.total_elements = resp.total_elements;
        this.devices = resp.content;
        if (resp.first) {
          this.page = 1;
        }
      });
  }
}
