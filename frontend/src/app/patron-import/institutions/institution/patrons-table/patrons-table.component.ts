import {Component, OnInit} from '@angular/core';
import {PatronImportService} from "../../../patron-import.service";

@Component({
  selector: 'app-patrons-table',
  templateUrl: './patrons-table.component.html',
  styleUrl: './patrons-table.component.css'
})
export class PatronsTableComponent implements OnInit {

  patrons: any;

  constructor(public service: PatronImportService) {
  }

  ngOnInit() {

    this.service.getPatronsByInstitutionId(this.service.currentInstitutionId).subscribe((json) => {
      this.patrons = json;
    });
  }

}
