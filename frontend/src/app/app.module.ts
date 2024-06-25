import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RouterOutlet} from "@angular/router";
import {FooterComponent} from "./footer/footer.component";
import {MainNavComponent} from "./main-nav/main-nav.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {InstitutionComponent} from './patron-import/institutions/institution/institution.component';
import {PageNotFoundComponent} from './error-pages/page-not-found/page-not-found.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  PatronLoadChartComponent
} from './patron-import/institutions/institution/patron-load-chart/patron-load-chart.component';
import {
  FailedPatronDataTableComponent
} from './patron-import/institutions/institution/failed-patron-data-table/failed-patron-data-table.component';
import {
  PtypePatronGroupsComponent
} from "./patron-import/institutions/institution/ptype-patron-groups/ptype-patron-groups.component";
import {
  FailedJobsTableComponent
} from "./patron-import/institutions/institution/failed-jobs-table/failed-jobs-table.component";
import {ProgressBarComponent} from './progress-bar/progress-bar.component';
import {FilePatternsComponent} from './patron-import/institutions/institution/file-patterns/file-patterns.component';
import {PatronsTableComponent} from './patron-import/institutions/institution/patrons-table/patrons-table.component';
import {DataTablesModule} from "angular-datatables";
import {MetricsComponent} from './patron-import/institutions/institution/metrics/metrics.component';
import {JobsTableComponent} from './patron-import/institutions/institution/jobs-table/jobs-table.component';
import {ProgressService} from "./progress-bar/progress.service";
import {ProgressInterceptor} from "./progress-bar/progress.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    InstitutionComponent,
    PageNotFoundComponent,
    PatronLoadChartComponent,
    FailedPatronDataTableComponent,
    PtypePatronGroupsComponent,
    FailedJobsTableComponent,
    FailedJobsTableComponent,
    ProgressBarComponent,
    ProgressBarComponent,
    FilePatternsComponent,
    PatronsTableComponent,
    MetricsComponent,
    JobsTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FooterComponent,
    MainNavComponent,
    HttpClientModule,
    RouterOutlet,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule
  ],
  providers: [
    ProgressService,
    {provide: HTTP_INTERCEPTORS, useClass: ProgressInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
