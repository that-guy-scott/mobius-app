import {Component, Input, OnInit} from '@angular/core';
import {PatronImportService} from "../../../patron-import.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {ProgressService} from "../../../../progress-bar/progress.service";

@Component({
  selector: 'app-failed-patron-data-table',
  templateUrl: './failed-patron-data-table.component.html',
  styleUrl: './failed-patron-data-table.component.css'
})
export class FailedPatronDataTableComponent implements OnInit {

  id: number = 0;
  job_id: number = 0;

  failedPatrons: any;

  patron: any = {
    "enrollmentdate": "",
    "load_date": "",
    "patrongroup": "",
    "lastname": "",
    "barcode": "",
    "id": "",
    "firstname": "",
    "insert_date": "",
    "fingerprint": "",
    "middlename": "",
    "ready": "",
    "expirationdate": "",
    "active": "",
    "externalsystemid": "",
    "file_id": "",
    "mobilephone": "",
    "email": "",
    "job_id": "",
    "preferredcontacttypeid": "",
    "username": "",
    "institution_id": "",
    "dateofbirth": "",
    "update_date": "",
    "raw_data": "",
    "phone": "",
    "preferredfirstname": ""
  };


  folioPatron: any = [{
    "username": "",
    "id": "",
    "externalSystemId": "",
    "barcode": "",
    "active": true,
    "type": "",
    "patronGroup": "",
    "departments": [],
    "proxyFor": [],
    "personal": {
      "lastName": "",
      "firstName": "",
      "middleName": "",
      "email": "",
      "phone": "",
      "mobilePhone": "",
      "addresses": [
        {
          "addressLine1": "",
          "addressLine2": "",
          "city": "",
          "region": "",
          "addressTypeId": "",
          "primaryAddress": true
        }
      ],
      "preferredContactTypeId": ""
    },
    "expirationDate": "",
    "createdDate": "",
    "updatedDate": "",
    "metadata": {
      "createdDate": "",
      "createdByUserId": "",
      "updatedDate": "",
      "updatedByUserId": ""
    },
    "tags": {
      "tagList": []
    },
    "customFields": {}
  }];
  progress = 0;

  patronKeys: string[];

  constructor(public service: PatronImportService, public route: ActivatedRoute, private progressService: ProgressService) {
    this.id = this.service.currentInstitutionId;
    this.job_id = Number(this.route.snapshot.paramMap.get('job_id'));
    this.patronKeys = Object.keys(this.patron);
  }

  ngOnInit(): void {

    this.progressService.progress$.subscribe((progress) => {
      this.progress = progress;
    });

    this.service.getFailedPatronsByInstitutionId(this.id, this.job_id).subscribe((json) => {
      this.failedPatrons = json;
    });

  }

  testPatron(): void {
    this.patron = {
      "enrollmentdate": "2022-01-01",
      "load_date": "2022-01-01",
      "patrongroup": "Group A",
      "lastname": "Doe",
      "barcode": "123456789",
      "id": "1",
      "firstname": "John",
      "insert_date": "2022-01-01",
      "fingerprint": "abc123",
      "middlename": "A.",
      "ready": "Yes",
      "expirationdate": "2023-01-01",
      "active": "Yes",
      "externalsystemid": "ext123",
      "file_id": "file123",
      "mobilephone": "555-1234",
      "email": "john.doe@example.com",
      "job_id": "job123",
      "preferredcontacttypeid": "email",
      "username": "johndoe",
      "institution_id": "inst123",
      "dateofbirth": "2000-01-01",
      "update_date": "2022-01-01",
      "raw_data": "raw data here",
      "phone": "555-5678",
      "preferredfirstname": "Johnny"
    };
  }

  comparePatron(patron: any) {

    // get mobius patron
    this.service.getPatronByUsername(patron.username).subscribe((json) => {
      this.patron = json;
    });

    // get folio patron
    this.service.getFolioPatronByUsername(patron.username).subscribe((json) => {
      this.folioPatron = json;
    });

  }

}
