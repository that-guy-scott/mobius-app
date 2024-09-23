import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  standalone: true,
  imports: [
    RouterLink
  ],
  styleUrl: './main-nav.component.css'
})
export class MainNavComponent {

}
