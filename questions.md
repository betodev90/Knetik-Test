# Technical questions

## Answers to technical questions.md

1.) How long did you spend on the coding test? What would you add to your solution if you had more time? If you didn't spend much time on the coding test then use this as an opportunity to explain what you would add.

    I was able to dedicate about 6 hours of development to the task 
    and one hour to analyze the best way to present myself according to the requirement. 

    I would have liked to apply TDD unit tests and integration using Karma and Jasmin 
    but devote the time to the presentation and comply with the requirement. 
    I also thought about adding to graph of reports by date of the devices and a graph 
    of registry of filters.

    Also I would have added more elements that interact with each other to select the search parameters in `/devices`

2.) What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.

    I chose Angular because have more experience working with him and I agree with philosophy about 
    DEVELOP THROUGH ALL PLATFORMS. The latest version it is 6.1.8

    * Improve about Web Components

    `device-view.component.ts`
    
    `
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
    `
    * Improve Angular CLI 1.7
    * Library RxJS 6 
        // Angular 6 Observable
        `import { Observable } from 'rxjs';`
        Example:
        `device.service.ts`
        `import 'rxjs/add/operator/map';`

3.) How would you track down a performance issue in production? Have you ever had to do this?
    Well I usually when I 'm track down a performance issue in production, I see in services logs AWS that allows us to verify parameters as a connection, 
    timeout response fo server, the status of the database, 
    codes of response http (200, 404, 500, 204, so on on).  

    And yes I have to do all the test about performance whe a project its released in production. 
    One a time when I was working in a website about news we had a issue in performance when It gave a terrible happening in my country as was the earthquake in 2016 
    and the website had many simultaneous visits over 20000 requests. 

    The plan was applied cache, improve queries in databse, segmenting articles related to that event at that time 
    I didn't know AWS code suite how CodeCommit, CodeBuild, CodePipeline, 
    Elastik Beanstalk that make the start-up process quicker and verify logs.


4.) How would you improve the Knetik APIs that you just used?
    
    I propose the following:
    * Using Caching that is a common technique used to increase the responsiveness of APIs.
    * Change some things that I explain in the next question.

5.) Please describe yourself using JSON.

    I propose the following:
    
    Examples:
    
    1. Using representative names how keys in this example change `content` for `devices`
    GET - https://recruitment-test-api.devsandbox.knetikcloud.com/devices?filter=location:12
    {
        "devices": [
            {
                "id": "f2dfa892-f059-4a6e-abf3-dd93ed257764",
                "location": 12,
                "mac_address": "A4-D3-64-EC-AC-69",
                "connected": false,
                "parent_location": 55,
                "updated_at": "2017-08-20T05:47:46Z",
                "signal": -38
            },
            {
                "id": "cbba8b81-b2cf-4c72-8352-d128e9812d79",
                "location": 12,
                "mac_address": "F3-41-16-DD-8E-22",
                "connected": false,
                "parent_location": 25,
                "updated_at": "2017-12-14T07:12:35Z",
                "signal": -97
            },
            ...
        ],
        "first": true,
        "last": false,
        "total_pages": 4,
        "total_elements": 91,
        "sort": null,
        "number_of_elements": 25,
        "size": 25
    }

    2. If that response fields how `total_elements`, `number_of_elements`, `total_pages`. You could response the page number if added how `QueryParam` by example:
    GET - https://recruitment-test-api.devsandbox.knetikcloud.com/devices?filter=location:12&page=3
    {
        "devices": [
            {
                "id": "9b2e667e-5679-44ea-8e7a-125fe4e71ffc",
                "location": 12,
                "mac_address": "D1-3C-9C-2E-49-21",
                "connected": false,
                "parent_location": 89,
                "updated_at": "2018-01-08T21:53:21Z",
                "signal": -33
            },
            {
                "id": "0ca0db22-748a-4fb9-bb1e-d4bc5dbd8020",
                "location": 12,
                "mac_address": "B5-E4-26-E3-5D-AE",
                "connected": true,
                "parent_location": 40,
                "updated_at": "2018-04-13T16:58:41Z",
                "signal": -70
            },
            ...
        ],
        "first": false,
        "last": false,
        "page": 3,
        "total_pages": 4,
        "total_elements": 91,
        "sort": null,
        "number_of_elements": 25,
        "size": 25
    }

    3. About the numbers of the items like response can you added how `QueryParam` 
    a `limit` that will show only this number of elements, by example:

    GET - https://recruitment-test-api.devsandbox.knetikcloud.com/devices?filter=location:12&page=3&limit=2
    {
        "devices": [
            {
                "id": "9b2e667e-5679-44ea-8e7a-125fe4e71ffc",
                "location": 12,
                "mac_address": "D1-3C-9C-2E-49-21",
                "connected": false,
                "parent_location": 89,
                "updated_at": "2018-01-08T21:53:21Z",
                "signal": -33
            },
            {
                "id": "0ca0db22-748a-4fb9-bb1e-d4bc5dbd8020",
                "location": 12,
                "mac_address": "B5-E4-26-E3-5D-AE",
                "connected": true,
                "parent_location": 40,
                "updated_at": "2018-04-13T16:58:41Z",
                "signal": -70
            }
        ],
        "first": false,
        "last": false,
        "page": 3,
        "total_pages": 4,
        "total_elements": 91,
        "sort": null,
        "number_of_elements": 2,
        "size": 2
    }

    4.- In Knetik APIs now does not make the correct query and I propose that adding this functionality
    
    GET - https://recruitment-test-api.devsandbox.knetikcloud.com/devices?filter=location:12&connected=false
        
    {
        "devices": [
            {
                "id": "9b2e667e-5679-44ea-8e7a-125fe4e71ffc",
                "location": 12,
                "mac_address": "D1-3C-9C-2E-49-21",
                "connected": false,
                "parent_location": 89,
                "updated_at": "2018-01-08T21:53:21Z",
                "signal": -33
            },
            {
                "id": "0ca0db22-748a-4fb9-bb1e-d4bc5dbd8020",
                "location": 12,
                "mac_address": "B5-E4-26-E3-5D-AE",
                "connected": false,
                "parent_location": 40,
                "updated_at": "2018-04-13T16:58:41Z",
                "signal": -70
            }
        ],
        "first": true,
        "last": false,
        "page": 1,
        "total_pages": 1,
        "total_elements": 2,
        "sort": null,
        "number_of_elements": 2,
        "size": 2
    }

