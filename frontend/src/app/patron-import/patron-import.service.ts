import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppServiceService} from "../app-service.service";

@Injectable({
  providedIn: 'root'
})
export class PatronImportService {

  private _institutions: any;
  rootPath: string = 'http://localhost:10000/api/patron-import';


  constructor(private app: AppServiceService, private http: HttpClient) {
  }

  loadInstitutions() {
    this.http.get(`${this.rootPath}/institutions`).subscribe((json) => {
      this._institutions = json;
    });
  }

  getInstitutions(): any {
    return this._institutions;
  }

  getInstitution(id: number | null) {
    return this.http.get(`${this.rootPath}/institution/${id}`);
  }

  toggleInstitution(institution: any) {
    this.http.post(`${this.rootPath}/institution/${institution.id}/toggle`, {
      enabled: institution.enabled
    }).subscribe((json) => {});
  }

  getPatronsByInstitutionId(id: string | null) {
    return this.http.get(`${this.rootPath}/institution/${id}/patrons`);
  }

  getFailedPatronsByInstitutionId(id: number | null) {
    return this.http.get(`${this.rootPath}/institution/${id}/failed-patrons`);
  }

}
