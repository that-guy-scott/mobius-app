import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppService} from "../app.service";
import {Observable} from "rxjs";
import {PatronGroup} from "./institutions/institution/ptype-patron-groups/patron-group";

@Injectable({
  providedIn: 'root'
})
export class PatronImportService {

  private _institutions: any;
  rootPath: string = 'http://localhost:10000/api/patron-import';
  // rootPath: string = 'http://192.168.11.203:10000/api/patron-import';
  // rootPath: string = 'http://192.168.11.211:10000/api/patron-import';

  currentInstitutionId: number = 0;
  currentJobId: number = 0;

  constructor(private app: AppService, private http: HttpClient) {
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
    this.http.post(`${this.rootPath}/institution/${institution.id}/enable`, {
      enabled: institution.enabled
    }).subscribe((json) => {
      this.app.createToastMessage(`${institution.name} has been ${institution.enabled ? 'enabled' : 'disabled'}`, institution.enabled ? 'success' : 'danger');
    });
  }

  getPatronsByInstitutionId(id: number | null) {
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

  getFolioPatronByESID(esid: string) {
    return this.http.get(`${this.rootPath}/folio/patron/by-esid/${esid}`);
  }

  getFilePatternsByInstitutionId(id: number) {
    return this.http.get(`${this.rootPath}/institution/${id}/file-patterns`);
  }

  getInstitutionMetricsByInstitutionId(id: number) {
    return this.http.get(`${this.rootPath}/institution/${id}/metrics`);
  }

  // getPatronGroupsByInstitutionId(id: number) {
  //   return this.http.get(`${this.rootPath}/institution/${id}/patron-groups`);
  // }

  getPatronGroupsByInstitutionId(id: number): Observable<PatronGroup[]> {
    return this.http.get<PatronGroup[]>(`${this.rootPath}/institution/${id}/patron-groups`);
  }

  getFolioPatronGroupsByInstitutionId(id: number): Observable<PatronGroup[]> {
    return this.http.get<PatronGroup[]>(`${this.rootPath}/folio/institution/${id}/patron-groups`);
  }

  setPatronGroupForm(patronGroupForm: any, id: number): Observable<PatronGroup[]> {
    return this.http.post<PatronGroup[]>(`${this.rootPath}/institution/${id}/patron-group`, patronGroupForm);
  }

  deletePatronGroupById(patronGroup: any, id: number): Observable<PatronGroup[]> {
    return this.http.post<PatronGroup[]>(`${this.rootPath}/institution/${id}/patron-group/delete`, patronGroup);
  }

  updatePatronGroupPriorities(patronGroups: PatronGroup[], id: number): void {
    this.http.post<PatronGroup[]>(`${this.rootPath}/institution/${id}/patron-groups/priorities`, patronGroups).subscribe((json) => {
    });
  }

  getFileTracker(id: number) {
    return this.http.get(`${this.rootPath}/institution/${id}/file-tracker`);
  }

  getFileTrackers() {
    return this.http.get(`${this.rootPath}/file-trackers`);
  }

  updateEmailSuccessByInstitutionId(currentInstitutionId: number, emailsuccess: any) {

    let json = {data: emailsuccess};

    this.http.post(`${this.rootPath}/institution/${currentInstitutionId}/email-success`, json).subscribe((json) => {
      this.app.createToastMessage('Email has been updated!', 'success');

    });

  }

  addFilePattern(newFilePattern: any, id: number) {
    console.log('newFilePattern' + newFilePattern);
    return this.http.post(`${this.rootPath}/institution/${id}/file-pattern`, newFilePattern);
  }

  deleteFilePatternById(filePatternId: any, id: number) {
    let json = {id: filePatternId};
    return this.http.post(`${this.rootPath}/institution/${id}/file-pattern/delete`, json);
  }
}
