import {Component, OnInit} from '@angular/core';
import {PatronImportService} from "../../../patron-import.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-failed-patron-data-table',
  templateUrl: './failed-patron-data-table.component.html',
  styleUrl: './failed-patron-data-table.component.css',
})
export class FailedPatronDataTableComponent implements OnInit {

  id: number = 0;
  job_id: number = 0;

  failedPatrons: any;

  patron: any = {
    "enrollmentdate": "",
    "load_date": "",
    "patrongroup": "",
    "barcode": "",
    "id": "",
    "firstname": "",
    "middlename": "",
    "lastname": "",
    "insert_date": "",
    "fingerprint": "",
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

  folioPatronsByUsername: any = [{
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

  folioPatronsByESID: any = [{
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

  constructor(public service: PatronImportService, public route: ActivatedRoute) {
    this.id = this.service.currentInstitutionId;
    this.job_id = Number(this.route.snapshot.paramMap.get('job_id'));
  }

  ngOnInit(): void {

    this.service.getFailedPatronsByInstitutionId(this.id, this.job_id).subscribe((json) => {
      this.failedPatrons = json;
    });

  }

  comparePatron(patron: any) {

    this.patron = {};
    this.folioPatronsByUsername = {};
    this.folioPatronsByESID = {};

    // // get mobius patron
    this.service.getPatronByUsername(patron.username).subscribe((json) => {
      this.patron = json;
    });

    // // get folio patron by username
    this.service.getFolioPatronByUsername(patron.username).subscribe((json) => {
      this.folioPatronsByUsername = json;
    });

    // // get folio patron by esid
    this.service.getFolioPatronByESID(patron.externalsystemid).subscribe((json) => {
      this.folioPatronsByESID = json;
    });

  }


}
