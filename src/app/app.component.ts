import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<app-spinner></app-spinner>
  <app-header></app-header>
  <div class="container">
    <router-outlet></router-outlet>
  </div>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-graphql-data';
}
