import {Component, OnInit} from '@angular/core';
import Dropzone from "dropzone";
import {PatronImportService} from "../../../patron-import.service";
import {AppService} from "../../../../app.service";

@Component({
  selector: 'app-patron-file-dropzone',
  templateUrl: './patron-file-dropzone.component.html',
  styleUrl: './patron-file-dropzone.component.css'
})
export class PatronFileDropzoneComponent implements OnInit {

  id: number = -1;

  constructor(public app: AppService, public service: PatronImportService) {
    this.id = this.service.currentInstitutionId;
  }

  ngOnInit() {
    const dropzone = new Dropzone('#patron-file-dropzone', {
      url: `${this.service.rootPath}/institution/${this.id}/patron-file/upload`,
      dictDefaultMessage: "Click or drop patron file here to upload",
    });

    dropzone.on("success", (file: any, response: any) => {
      console.log("File successfully uploaded");
      this.onFileUploadSuccess(response);
    });


  }

  onFileUploadSuccess(response: any) {

    this.app.createToastMessage('File Pattern Added!', 'success');

    console.log("File upload response:", response);

  }

}
