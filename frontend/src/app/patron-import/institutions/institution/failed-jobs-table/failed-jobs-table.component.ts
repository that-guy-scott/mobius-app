import {Component, Input, OnInit} from '@angular/core';
import {PatronImportService} from "../../../patron-import.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-failed-jobs-table',
  templateUrl: './failed-jobs-table.component.html',
  styleUrl: './failed-jobs-table.component.css'
})
export class FailedJobsTableComponent implements OnInit {

  id: number = 0;

  failedJobs: any;
  institutionName: string = "";

  constructor(public service: PatronImportService) {
    this.id = this.service.currentInstitutionId;
  }

  ngOnInit() {

    this.service.getFailedPatronJobsByInstitutionId(this.id).subscribe((json) => {
      this.failedJobs = json;
    });
  }

}
