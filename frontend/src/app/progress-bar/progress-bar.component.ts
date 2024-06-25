import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css'
})
export class ProgressBarComponent implements OnChanges {

  @Input() progress: number = 0;

  constructor() {
  }

  ngOnChanges() {
    if (this.progress < 0) {
      this.progress = 0;
    } else if (this.progress > 100) {
      this.progress = 100;
    }
  }

  // ngOnInit(): void {
  //   this.animateProgressBar();
  // }

  // animateProgressBar(): void {
  //   if (this.progress < 100) {
  //     this.progress += 1;
  //     setTimeout(() => {
  //       this.animateProgressBar();
  //     }, 50);
  //   }
  // }

}
