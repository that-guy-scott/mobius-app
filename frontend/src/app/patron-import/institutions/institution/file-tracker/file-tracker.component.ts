import {Component, OnInit} from '@angular/core';
import {PatronImportService} from "../../../patron-import.service";

@Component({
  selector: 'app-file-tracker',
  templateUrl: './file-tracker.component.html',
  styleUrl: './file-tracker.component.css'
})
export class FileTrackerComponent implements OnInit {

  fileTracker: any;

  constructor(public service: PatronImportService) {
  }

  ngOnInit(): void {
    this.service.getFileTracker(this.service.currentInstitutionId).subscribe(data => {
      this.fileTracker = data;
    });
  }


}
