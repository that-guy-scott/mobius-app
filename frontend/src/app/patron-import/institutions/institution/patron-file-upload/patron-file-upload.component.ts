import {ChangeDetectorRef, Component, NgZone, OnDestroy} from '@angular/core';
import {PatronImportService} from '../../../patron-import.service';
import {Subscription} from 'rxjs';
import {AppService} from '../../../../app.service';
import {ViewChild, ElementRef, AfterViewChecked} from '@angular/core';


@Component({
  selector: 'app-patron-file-upload',
  templateUrl: './patron-file-upload.component.html',
  styleUrls: ['./patron-file-upload.component.css']
})
export class PatronFileUploadComponent implements OnDestroy, AfterViewChecked {

  id: number;
  private consoleSubscription: Subscription | null = null;
  consoleOutput: string[] = [];
  @ViewChild('console', { static: false }) consoleElement!: ElementRef;

  constructor(
    private app: AppService,
    public service: PatronImportService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {
    this.id = Number(this.service.currentInstitutionId);
  }

  trackByFn(index: number, item: string): number {
    return index;
  }

  startImport() {
    console.log('Starting console');
    this.consoleOutput = []; // Clear previous output

    this.app.createToastMessage('Patrons are being imported!', 'success');

    const url = `${this.service.rootPath}/institution/${this.id}/patron-files/process?institution_id=${encodeURIComponent(this.id)}`;
    this.consoleSubscription = this.service.getStream(url).subscribe({
      next: (data) => {
        console.log('Received data:', data);
        this.ngZone.run(() => {
          this.consoleOutput.push(data);
          // this.cdr.detectChanges(); // Might not be necessary
          setTimeout(() => this.scrollToBottom(), 0);
        });
      },
      error: (error) => {
        console.error('Error in console stream:', error);
      },
      complete: () => {
        console.log('Console stream completed');
        this.ngZone.run(() => {
          // this.cdr.detectChanges(); // Ensure final update if necessary
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.consoleSubscription) {
      this.consoleSubscription.unsubscribe();
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.consoleElement.nativeElement.scrollTop = this.consoleElement.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Could not scroll to bottom:', err);
    }
  }



}
