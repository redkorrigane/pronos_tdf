import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(private router: Router) {}

  viewMyProno() {
    this.router.navigate(['/monprono']);
  }

  viewResults() {
    this.router.navigate(['/results']);
  }
}
