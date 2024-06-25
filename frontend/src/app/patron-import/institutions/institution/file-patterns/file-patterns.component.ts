import {Component, OnInit} from '@angular/core';
import {PatronImportService} from "../../../patron-import.service";

@Component({
  selector: 'app-file-patterns',
  templateUrl: './file-patterns.component.html',
  styleUrl: './file-patterns.component.css'
})
export class FilePatternsComponent implements OnInit {

  id: number = 0;

  filePatterns: any = [{
    id: 0,
    name: '',
    pattern: ''
  }];

  constructor(public service: PatronImportService) {
    this.id = this.service.currentInstitutionId;
  }

  ngOnInit() {
    this.service.getFilePatternsByInstitutionId(this.service.currentInstitutionId).subscribe((json) => {
      this.filePatterns = json;
    });
  }


}
