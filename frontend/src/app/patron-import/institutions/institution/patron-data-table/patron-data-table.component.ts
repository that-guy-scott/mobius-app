import {Component, Input} from '@angular/core';
import {PatronImportService} from "../../../patron-import.service";

@Component({
  selector: 'app-patron-data-table',
  templateUrl: './patron-data-table.component.html',
  styleUrl: './patron-data-table.component.css'
})
export class PatronDataTableComponent {

  @Input()
  id: number = 0;

  constructor(public service: PatronImportService) {
  }

  // get patrons() {
  //   return this.service.getPatronsByInstitutionId(this.id);
  // }

}
