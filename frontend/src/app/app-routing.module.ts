import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InstitutionsComponent} from "./patron-import/institutions/institutions.component";
import {InstitutionComponent} from "./patron-import/institutions/institution/institution.component";
import {PageNotFoundComponent} from "./error-pages/page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: '', component: InstitutionsComponent
  },
  {
    path: 'patron-import/institutions', component: InstitutionsComponent,
  },
  {
    path: 'patron-import/institution',
    children: [
      {
        path: ':id', component: InstitutionComponent
      }
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
