// app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {}
