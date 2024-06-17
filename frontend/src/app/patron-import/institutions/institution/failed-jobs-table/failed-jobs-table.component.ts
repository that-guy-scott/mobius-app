import {Component, Input, OnInit} from '@angular/core';
import {PatronImportService} from "../../../patron-import.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-failed-jobs-table',
  templateUrl: './failed-jobs-table.component.html',
  styleUrl: './failed-jobs-table.component.css'
})
export class FailedJobsTableComponent implements OnInit {

  @Input()
  id: number = 0;

  failedJobs: any;

  constructor(public service: PatronImportService) {
  }

  ngOnInit() {
    this.service.getFailedPatronJobsByInstitutionId(this.id).subscribe((json) => {
      this.failedJobs = json;
    });
  }

}
