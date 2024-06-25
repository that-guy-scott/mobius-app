import { Injectable } from '@angular/core';
import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {map, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private progressSubject = new Subject<number>();
  progress$: Observable<number> = this.progressSubject.asObservable();

  setProgress(progress: number): void {
    this.progressSubject.next(progress);
  }
}
