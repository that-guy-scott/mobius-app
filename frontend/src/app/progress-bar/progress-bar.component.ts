import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css'
})
export class ProgressBarComponent implements OnInit {
  progress = 0;

  constructor() {
  }

  ngOnInit(): void {
    this.animateProgressBar();
  }

  animateProgressBar(): void {
    if (this.progress < 100) {
      this.progress += 1;
      setTimeout(() => {
        this.animateProgressBar();
      }, 50);
    }
  }
}
