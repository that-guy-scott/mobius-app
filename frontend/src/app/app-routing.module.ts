import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InstitutionsComponent} from "./patron-import/institutions/institutions.component";
import {InstitutionComponent} from "./patron-import/institutions/institution/institution.component";
import {PageNotFoundComponent} from "./error-pages/page-not-found/page-not-found.component";
import {
  FailedJobsTableComponent
} from "./patron-import/institutions/institution/failed-jobs-table/failed-jobs-table.component";
import {
  FailedPatronDataTableComponent
} from "./patron-import/institutions/institution/failed-patron-data-table/failed-patron-data-table.component";
import {
  PtypePatronGroupsComponent
} from "./patron-import/institutions/institution/ptype-patron-groups/ptype-patron-groups.component";

const routes: Routes = [
  {
    path: '', component: InstitutionsComponent
  },
  {
    path: 'patron-import/institutions', component: InstitutionsComponent,
  },
  {
    path: 'patron-import/institution/:id', component: InstitutionComponent,
    children: [
      {path: 'jobs', component: FailedJobsTableComponent},
      {path: 'job/:job_id/failed-patrons', component: FailedPatronDataTableComponent},
      {path: 'patron-groups', component: PtypePatronGroupsComponent}
    ]
  },
  {
    path: '**', component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
