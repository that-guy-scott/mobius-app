import {Component, OnInit} from '@angular/core';
import {PatronImportService} from "../../patron-import.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-institution',
  templateUrl: './institution.component.html',
  styleUrl: './institution.component.css'
})
export class InstitutionComponent implements OnInit {

  id: string | null;
  institution: any;

  constructor(public service: PatronImportService, public route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getInstitution();
  }

  getInstitution() {
    this.service.getInstitution(this.id).subscribe((json) => {
      this.institution = json;
    });
  }

}
