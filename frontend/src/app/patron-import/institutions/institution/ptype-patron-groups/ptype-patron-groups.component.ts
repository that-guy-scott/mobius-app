import {Component, OnInit} from '@angular/core';
import {PatronImportService} from "../../../patron-import.service";
import {CdkDragDrop, CdkDragExit, moveItemInArray} from '@angular/cdk/drag-drop';
import {PatronGroup} from "./patron-group";
import {Observable} from "rxjs";
import {AppService} from "../../../../app.service";

@Component({
  selector: 'app-ptype-patron-groups',
  templateUrl: './ptype-patron-groups.component.html',
  styleUrl: './ptype-patron-groups.component.css'
})
export class PtypePatronGroupsComponent implements OnInit {

  patronGroups: PatronGroup[] = [{
    id: -1,
    institution_id: -1,
    ptype: '',
    foliogroup: '',
    priority: -1,
  }];

  folioPatronGroups: any = [{}];

  patronGroupForm: any = {
    ptype: '',
    folioPatronGroup: '',
  };


  selectedPatronGroup: any = {};

  constructor(public app: AppService, private service: PatronImportService) {
  }

  ngOnInit() {

    this.service.getPatronGroupsByInstitutionId(this.service.currentInstitutionId).subscribe((json) => {
      this.patronGroups = json;
    });

    this.service.getFolioPatronGroupsByInstitutionId(this.service.currentInstitutionId).subscribe((json) => {
      this.folioPatronGroups = json;
    });

  }


  savePatronGroup() {

    this.patronGroupForm.priority = this.getMaxPriority() + 1;

    this.service.setPatronGroupForm(this.patronGroupForm, this.service.currentInstitutionId).subscribe((json) => {
      this.patronGroups = json;
      this.app.createToastMessage(this.patronGroupForm.folioPatronGroup + ' Added!', 'success');
    });

  }

  clearPatronGroup() {
    this.patronGroupForm = {
      ptype: '',
      folioPatronGroup: 'none',
    };
  }

  setSelectedPatronGroup(patronGroup: any) {
    this.selectedPatronGroup = patronGroup;
  }

  deletePatronGroupConfirmed() {

    this.service.deletePatronGroupById(this.selectedPatronGroup, this.service.currentInstitutionId).subscribe((json) => {
      this.patronGroups = json;
      this.clearPatronGroup();
      this.app.createToastMessage(this.selectedPatronGroup.foliogroup + ' Deleted!', 'danger');
    });

  }

  private getMaxPriority(): number {

    let maxPriority = 0;

    this.patronGroups.forEach((patronGroup: any) => {
      if (patronGroup.priority > maxPriority) {
        maxPriority = patronGroup.priority;
      }
    });
    return maxPriority;

  }

  drop(event: CdkDragDrop<PatronGroup[]>) {
    moveItemInArray(this.patronGroups, event.previousIndex, event.currentIndex);
    this.updatePriorities();
    this.service.updatePatronGroupPriorities(this.patronGroups, this.service.currentInstitutionId);
  }


  updatePriorities() {
    this.patronGroups.forEach((patronGroup, index) => {
      patronGroup.priority = index + 1; // we start at 1 instead of 0
    });
  }

}

