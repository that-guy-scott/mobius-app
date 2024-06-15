import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppServiceService} from "../app-service.service";

@Injectable({
  providedIn: 'root'
})
export class PatronImportService {

  private _institutions: any;
  institution: any;
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

  getInstitution(id: string | null) {
    this.http.get(`${this.rootPath}/institution/${id}`).subscribe((json) => {
      this.institution = json;
    });
  }

  toggleInstitution(institution: any) {
    this.http.post(`${this.rootPath}/institution/${institution.id}/toggle`, {
      enabled: institution.enabled
    }).subscribe((json) => {
    });
  }

}
