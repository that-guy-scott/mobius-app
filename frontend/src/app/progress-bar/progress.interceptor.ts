import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpEventType } from '@angular/common/http';
import { Observable, interval, of } from 'rxjs';
import { tap, switchMap, finalize } from 'rxjs/operators';
import { ProgressService } from './progress.service';

@Injectable()
export class ProgressInterceptor implements HttpInterceptor {

  constructor(private progressService: ProgressService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const progressInterval = interval(100);
    let progress = 0;

    const updateProgress = progressInterval.pipe(
      tap(() => {
        progress = Math.min(progress + 10, 80);
        this.progressService.setProgress(progress);
      })
    );

    return next.handle(req).pipe(
      switchMap(event => {
        if (event.type === HttpEventType.Response) {
          return updateProgress.pipe(
            switchMap(() => of(event))
          );
        } else {
          return of(event);
        }
      }),
      finalize(() => {
        const simulateParsingProgress = interval(50).pipe(
          tap(() => {
            progress = Math.min(progress + 2, 100);
            this.progressService.setProgress(progress);
          })
        );

        simulateParsingProgress.subscribe({
          complete: () => this.progressService.setProgress(100)
        });
      })
    );
  }
}
