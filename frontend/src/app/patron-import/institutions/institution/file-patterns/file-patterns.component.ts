import {Component, OnInit} from '@angular/core';
import {PatronImportService} from "../../../patron-import.service";
import {AppService} from "../../../../app.service";

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

  newFilePattern: any = {
    pattern: '',
    name: ''
  }

  constructor(public app: AppService, public service: PatronImportService) {
    this.id = this.service.currentInstitutionId;
  }

  ngOnInit() {
    this.getFilePatterns();
  }

  getFilePatterns() {
    this.service.getFilePatternsByInstitutionId(this.service.currentInstitutionId).subscribe((json) => {
      this.filePatterns = json;
    });
  }

  addFilePattern(id: number) {

    // validate the form
    if(this.newFilePattern.pattern === '' || this.newFilePattern.name === '') {
      this.app.createToastMessage('Please fill out all fields!', 'danger');
      return;
    }

    this.service.addFilePattern(this.newFilePattern, id).subscribe((json) => {

      this.app.createToastMessage('File Pattern Added!', 'success');

      // clear out the form
      this.newFilePattern = {
        pattern: '',
        name: ''
      };

      // load the new file patterns
      this.getFilePatterns();

    });

  }

  deleteFilePattern(filePatternId: number) {

    this.service.deleteFilePatternById(filePatternId, this.service.currentInstitutionId).subscribe((json) => {
      this.getFilePatterns();
      this.app.createToastMessage('File Pattern Deleted!', 'danger');
    });

  }

}
