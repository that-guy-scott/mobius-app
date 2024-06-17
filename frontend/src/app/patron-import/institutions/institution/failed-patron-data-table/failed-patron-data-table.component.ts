import {Component, Input, OnInit} from '@angular/core';
import {PatronImportService} from "../../../patron-import.service";

@Component({
  selector: 'app-failed-patron-data-table',
  templateUrl: './failed-patron-data-table.component.html',
  styleUrl: './failed-patron-data-table.component.css'
})
export class FailedPatronDataTableComponent implements OnInit {

  @Input()
  id: number = 0;

  failedPatrons: any;

  constructor(public service: PatronImportService) {
  }

  ngOnInit(): void {
    this.getFailedPatrons();
  }

  getFailedPatrons() {
    this.service.getFailedPatronsByInstitutionId(this.id).subscribe((json) => {
      this.failedPatrons = json;
    });
  }
}
