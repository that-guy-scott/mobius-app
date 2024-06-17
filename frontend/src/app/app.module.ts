import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RouterOutlet} from "@angular/router";
import {FooterComponent} from "./footer/footer.component";
import {MainNavComponent} from "./main-nav/main-nav.component";
import {HttpClientModule} from "@angular/common/http";
import { InstitutionComponent } from './patron-import/institutions/institution/institution.component';
import { PageNotFoundComponent } from './error-pages/page-not-found/page-not-found.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PatronLoadChartComponent } from './patron-import/institutions/institution/patron-load-chart/patron-load-chart.component';
import { FailedPatronDataTableComponent } from './patron-import/institutions/institution/failed-patron-data-table/failed-patron-data-table.component';
import {PtypePatronGroupsComponent} from "./patron-import/institutions/institution/ptype-patron-groups/ptype-patron-groups.component";

@NgModule({
  declarations: [
    AppComponent,
    InstitutionComponent,
    PageNotFoundComponent,
    PatronLoadChartComponent,
    FailedPatronDataTableComponent,
    PtypePatronGroupsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FooterComponent,
    MainNavComponent,
    HttpClientModule,
    RouterOutlet,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
