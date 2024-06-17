import {Component, OnInit} from '@angular/core';
import {PatronImportService} from "../../../patron-import.service";

@Component({
  selector: 'app-ptype-patron-groups',
  templateUrl: './ptype-patron-groups.component.html',
  styleUrl: './ptype-patron-groups.component.css'
})
export class PtypePatronGroupsComponent {

  constructor(private service: PatronImportService){
  }


}
