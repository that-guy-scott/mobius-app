import {Component, OnInit} from '@angular/core';
import {PatronImportService} from "../../patron-import.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-institution',
  templateUrl: './institution.component.html',
  styleUrl: './institution.component.css'
})
export class InstitutionComponent implements OnInit {

  id: number | null;
  institution: any;

  private _activeTabPane: string = 'jobs';

  constructor(public service: PatronImportService, public route: ActivatedRoute) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.currentInstitutionId = this.id;
  }

  ngOnInit(): void {
    this.getInstitution();
  }

  getInstitution() {
    this.service.getInstitution(this.id).subscribe((json) => {
      this.institution = json;
    });
  }

  get activeTabPane(): string {
    return this._activeTabPane;
  }

  set activeTabPane(value: string) {
    this._activeTabPane = value;
  }

}
