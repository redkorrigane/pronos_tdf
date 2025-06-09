import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // ← ce chemin est RELATIF au .ts
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
