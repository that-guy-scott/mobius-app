import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppServiceService} from "../app-service.service";

@Injectable({
  providedIn: 'root'
})
export class PatronImportService {

  private _institutions: any;
  // rootPath: string = 'http://localhost:10000/api/patron-import';
  rootPath: string = 'http://192.168.11.203:10000/api/patron-import';

  currentInstitutionId: number = 0;
  currentJobId: number = 0;

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
    }).subscribe((json) => {
    });
  }

  getPatronsByInstitutionId(id: string | null) {
    return this.http.get(`${this.rootPath}/institution/${id}/patrons`);
  }

  getFailedPatronsByInstitutionId(id: number | null, job_id: number | null) {
    return this.http.get(`${this.rootPath}/institution/${id}/job/${job_id}/failed-patrons`);
  }

  getFailedPatronJobsByInstitutionId(id: number | null) {
    return this.http.get(`${this.rootPath}/institution/${id}/jobs`);
  }

  getInstitutionName(id: number) {
    for (let i = 0; i < this._institutions.length; i++) {
      if (this._institutions[i].id === id) {
        return this._institutions[i].name;
      }
    }
    return "";
  }

  getPatronByUsername(username: string) {
    return this.http.get(`${this.rootPath}/patron/by-username/${username}`);
  }

  getFolioPatronByUsername(username: string) {
    return this.http.get(`${this.rootPath}/folio/patron/by-username/${username}`);
  }

}
