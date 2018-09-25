import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Device } from '../../models/device.model';
import { DeviceService } from '../../services/service.index';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styles: []
})

export class DevicesComponent implements OnInit {
  devices: Device[] = [];
  loading: boolean;
  // Pagination
  page: number;
  size: number;
  first: boolean;
  last: boolean;
  total_page: number;
  total_elements: number;
  number_of_elements: number;
  // Options filters
  public fiter_types = [
    ['location', 'Location'],
    ['parent_location', 'Parent Location'],
    ['connected', 'Connected']
  ];
  filter_selected: string;
  path_filter: string;
  is_connected: boolean;

  @ViewChild('input')
  myInputVariable: ElementRef;

  constructor(
    public _deviceService: DeviceService,
    public router: Router
  ) { }

  ngOnInit() {
    this.loadDevices();
    this.filter_selected = 'location';
  }

  loadDevices() {
    this.loading = true;
    this._deviceService.loadDevices( this.page )
    .subscribe( (resp: any) => {
      this.total_page = resp.total_pages;
      this.size = resp.number_of_elements;
      this.total_elements = resp.total_elements;
      this.devices = resp.content;
      if ( resp.first ) {
        this.page = 1;
      }
      this.loading = false;
    });
  }

  changeSince( value: number ) {
    let inputValue = this.myInputVariable.nativeElement.value;
    let term: string;
    if ( this.page > this.total_page ) {
      return;
    }
    if ( this.page < 0 ) {
      return;
    }
    if (this.first || this.page > 0) {
      this.page += value;
    }
    if (inputValue === '') {
      this.loadDevices();
    } else {
      if (this.filter_selected === 'connected') {
        term = this.filter_selected + ':' + this.is_connected + '&page=' + this.page;
      } else {
        term = this.filter_selected + ':' + this.myInputVariable.nativeElement.value + '&page=' + this.page;
      }
      this._deviceService.filterByDevice( term )
      .subscribe( (resp: any) => {
        console.log(resp);
        this.devices = resp.content;
        this.loading = false;

        this.total_page = resp.total_pages;
        this.size = resp.number_of_elements;
        this.total_elements = resp.total_elements;
        this.devices = resp.content;
      });
    }
  }

  filterDevice( term: string ) {
    if (this.filter_selected.length <= 0) {
      this.loadDevices();
      return;
    }
    if (term.length <= 0) {
      this.loadDevices();
      return;
    }
    if (this.filter_selected === 'connected') {
      let inputValue = this.myInputVariable.nativeElement.value;
      if ( inputValue !== '' && (inputValue === 'on-line' || inputValue === 'off-line')){
        console.log(inputValue);
        if (inputValue === 'on-line') {
          this.is_connected = true;
        } else {
          this.is_connected = false;
        }
        term = this.filter_selected + ':' + this.is_connected;
      }
    } else {
      term = this.filter_selected + ':' + term;
    }
    this.loading = true;
    this._deviceService.filterByDevice( term )
    .subscribe( (resp: any) => {
      this.devices = resp.content;
      this.loading = false;

      this.total_page = resp.total_pages;
      this.size = resp.size;
      this.total_elements = resp.total_elements;
      this.devices = resp.content;
    });
  }

  ChangingValue( value: string ) {
    this.filter_selected = value;
    this.myInputVariable.nativeElement.value = '';
    this.page = 1;
    this.loadDevices();
  }
}
