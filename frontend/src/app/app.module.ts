import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RouterOutlet} from "@angular/router";
import {FooterComponent} from "./footer/footer.component";
import {MainNavComponent} from "./main-nav/main-nav.component";
import {InstitutionComponent} from './patron-import/institutions/institution/institution.component';
import {PageNotFoundComponent} from './error-pages/page-not-found/page-not-found.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FailedPatronDataTableComponent} from './patron-import/institutions/institution/failed-patron-data-table/failed-patron-data-table.component';
import {PtypePatronGroupsComponent} from "./patron-import/institutions/institution/ptype-patron-groups/ptype-patron-groups.component";
import {FailedJobsTableComponent} from "./patron-import/institutions/institution/failed-jobs-table/failed-jobs-table.component";
import {FilePatternsComponent} from './patron-import/institutions/institution/file-patterns/file-patterns.component';
import {PatronsTableComponent} from './patron-import/institutions/institution/patrons-table/patrons-table.component';
import {DataTablesModule} from "angular-datatables";
import {MetricsComponent} from './patron-import/institutions/institution/metrics/metrics.component';
import {JobsTableComponent} from './patron-import/institutions/institution/jobs-table/jobs-table.component';
import {HttpClientModule} from "@angular/common/http";
import {PageLoadingComponent} from './page-loading/page-loading.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {FileTrackerComponent} from './patron-import/institutions/institution/file-tracker/file-tracker.component';
import {FileTrackersComponent} from './patron-import/file-trackers/file-trackers.component';
import { PatronFileDropzoneComponent } from './patron-import/institutions/institution/patron-file-dropzone/patron-file-dropzone.component';
import {ClipboardModule} from "@angular/cdk/clipboard";

@NgModule({
  declarations: [
    AppComponent,
    InstitutionComponent,
    PageNotFoundComponent,
    FailedPatronDataTableComponent,
    PtypePatronGroupsComponent,
    FailedJobsTableComponent,
    FailedJobsTableComponent,
    FilePatternsComponent,
    PatronsTableComponent,
    MetricsComponent,
    JobsTableComponent,
    PageLoadingComponent,
    FileTrackerComponent,
    FileTrackersComponent,
    PatronFileDropzoneComponent
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
    DataTablesModule,
    DragDropModule,
    ClipboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
