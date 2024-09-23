import {Component, OnInit, ViewChild} from '@angular/core';
import {PatronImportService} from "../../patron-import.service";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from 'rxjs/operators';
import {PageLoadingComponent} from "../../../page-loading/page-loading.component";

@Component({
  selector: 'app-institution',
  templateUrl: './institution.component.html',
  styleUrl: './institution.component.css'
})
export class InstitutionComponent implements OnInit {


  id: number;
  institution: any;
  fullPath: any;
  showCopied: boolean = false;

  constructor(public service: PatronImportService, public route: ActivatedRoute) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.currentInstitutionId = this.id;
  }

  ngOnInit(): void {
    this.getInstitution();
  }

  getInstitution() {
    this.service.getInstitution(this.id).pipe(
      switchMap((institutionJson) => {
        this.institution = institutionJson;
        return this.service.getFilePatternsByInstitutionId(this.id);
      })
    ).subscribe((filePatternJson) => {
      this.fullPath = filePatternJson;

      // linux
      this.fullPath = this.fullPath[0].path + '/patron-import/' + this.institution.abbreviation + '/import';

      // windows
      this.fullPath = this.fullPath.replace(/\//g, '\\'); // Replace all '/' with '\'
      this.fullPath = this.fullPath.replace(/\\mnt\\dropbox/g, 'X:'); // replace mnt/dropbox with X:
    });
  }

  onCopied(successful: boolean) {
    console.log(`Copying text was ${successful ? 'successful' : 'unsuccessful'}`);

    this.showCopied = true;
    setTimeout(() => {
      this.showCopied = false;
    }, 2000);

  }



}
