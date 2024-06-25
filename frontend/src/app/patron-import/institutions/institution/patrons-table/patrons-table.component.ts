import {Component, OnInit} from '@angular/core';
import {PatronImportService} from "../../../patron-import.service";
import {ADTSettings} from "angular-datatables/src/models/settings";
import {ProgressService} from "../../../../progress-bar/progress.service";

@Component({
  selector: 'app-patrons-table',
  templateUrl: './patrons-table.component.html',
  styleUrl: './patrons-table.component.css'
})
export class PatronsTableComponent implements OnInit {

  patrons: any;
  progress = 0;

  constructor(public service: PatronImportService, private progressService: ProgressService) {
  }

  ngOnInit() {

   this.progressService.progress$.subscribe((progress) => {
     this.progress = progress;
   });

    this.service.getPatronsByInstitutionId(this.service.currentInstitutionId).subscribe((json) => {
      this.patrons = json;
    });
  }

}
