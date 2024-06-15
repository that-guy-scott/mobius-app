import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PatronImportService} from "../patron-import.service";
import {NgClass, NgForOf} from "@angular/common";
import {RouterLink, RouterOutlet} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-institutions',
    templateUrl: './institutions.component.html',
    standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    RouterOutlet,
    NgClass,
    FormsModule
  ],
    styleUrl: './institutions.component.css'
})
export class InstitutionsComponent {

    constructor(public service: PatronImportService) {
        this.service.loadInstitutions();
    }

}
