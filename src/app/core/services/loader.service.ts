import { Injectable } from '@angular/core';


import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NgxUiLoaderService, NgxUiLoaderConfig } from 'ngx-ui-loader';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    public static ngxUiLoaderConfig: NgxUiLoaderConfig = {
        fgsColor: '#5067eb'
    };
    @BlockUI() blockUI: NgBlockUI;

    constructor(readonly ngxUiLoaderService: NgxUiLoaderService) { }

    start() {
        this.ngxUiLoaderService.start();
        this.blockUI.stop();
    }

    stop() {
        this.ngxUiLoaderService.stop();
    }

    startChildLoader(loaderId) {
        this.ngxUiLoaderService.startLoader(loaderId);
    }

    stopChildLoader(loaderId) {
        this.ngxUiLoaderService.stopLoader(loaderId);
    }
}
