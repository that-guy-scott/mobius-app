import {Component, OnInit} from '@angular/core';
import {PatronImportService} from "../../patron-import.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-institution',
  templateUrl: './institution.component.html',
  styleUrl: './institution.component.css'
})
export class InstitutionComponent implements OnInit {

  id: number | null;
  institution: any;


  // https://stackoverflow.com/questions/54110187/angular-6-routing-query-parameters-inside-named-secondary-router-outlet
  // const routes:Routes = [
  //   { path: '/:id', component: ProfileComponent, name: 'Details'}
  // ]
  // To get parameter in your component
  //
  // class ProfileComponent{
  // token: string;
  // constructor(params: RouteParams) {
  //   this.token = params.get('id');
  // }
// }





  constructor(public service: PatronImportService, public route: ActivatedRoute) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
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
