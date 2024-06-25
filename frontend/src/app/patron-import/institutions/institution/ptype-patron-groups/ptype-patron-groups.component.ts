import {Component, OnInit} from '@angular/core';
import {PatronImportService} from "../../../patron-import.service";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-ptype-patron-groups',
  templateUrl: './ptype-patron-groups.component.html',
  styleUrl: './ptype-patron-groups.component.css'
})
export class PtypePatronGroupsComponent implements OnInit {

  patronGroups: any = [{}];
  patronGroupForm: FormGroup = new FormGroup({});

  constructor(private service: PatronImportService){
  }

  ngOnInit() {
   this.service.getPatronGroupsByInstitutionId(this.service.currentInstitutionId).subscribe((json) => {
     this.patronGroups = json;
   });
  }

  editPatronGroup(item: any) {

  }

  deletePatronGroup(item: any) {

  }

  onSubmit() {

  }
}
