import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Device } from '../../models/device.model';
import { DeviceService } from '../../services/service.index';

@Component({
  selector: 'app-device-view',
  templateUrl: './device-view.component.html',
  styles: []
})
export class DeviceViewComponent implements OnInit {
  device: Device = new Device('', 0, '', false, 0, '', 0);
  status_label: string;

  constructor(
    public activatedRoute: ActivatedRoute,
    public _deviceService: DeviceService,
    public router: Router
  ) {
    activatedRoute.params.subscribe( params => {
      let id = params['id'];
      this.loadDevice  ( id );
    });
  }

  ngOnInit() {
  }

  loadDevice( id: string ) {
    this._deviceService.getDevice( id ).subscribe( device => {
      this.device = device[0];
      if (this.device.connected) {
        this.status_label = 'On-Line';
      } else {
        this.status_label = 'Off-Line';
      }
    });
  }
}
