import {Component, OnInit} from '@angular/core';
import {PatronImportService} from "../../../patron-import.service";

@Component({
    selector: 'app-metrics',
    templateUrl: './metrics.component.html',
    styleUrl: './metrics.component.css'
})
export class MetricsComponent implements OnInit {

    metrics: any = {};

    constructor(public service: PatronImportService) {
    }

    ngOnInit() {
        this.service.getInstitutionMetricsByInstitutionId(this.service.currentInstitutionId).subscribe((data: any) => {
            this.metrics = data;
        });
    }



}
