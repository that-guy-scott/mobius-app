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
import {FilePatternsComponent} from "./patron-import/institutions/institution/file-patterns/file-patterns.component";
import {PatronsTableComponent} from "./patron-import/institutions/institution/patrons-table/patrons-table.component";
import {MetricsComponent} from "./patron-import/institutions/institution/metrics/metrics.component";

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
      {path: 'metrics', component: MetricsComponent},
      {path: 'metrics', component: MetricsComponent},
      {path: 'jobs', component: FailedJobsTableComponent},
      {path: 'job/:job_id/failed-patrons', component: FailedPatronDataTableComponent},
      {path: 'patrons', component: PatronsTableComponent},
      {path: 'file-patterns', component: FilePatternsComponent},
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
