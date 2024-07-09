import {Component, OnInit} from '@angular/core';
import {PatronImportService} from "../patron-import.service";
import {Config} from "datatables.net";

@Component({
  selector: 'app-file-trackers',
  templateUrl: './file-trackers.component.html',
  styleUrl: './file-trackers.component.css'
})
export class FileTrackersComponent implements OnInit {

  fileTrackers: any;

  dtOptions: Config = {
    pageLength: 100,

  };

  constructor(public service: PatronImportService) {
  }

  ngOnInit(): void {
    this.service.getFileTrackers().subscribe(json => {
      this.fileTrackers = json;
    });

  }


}
