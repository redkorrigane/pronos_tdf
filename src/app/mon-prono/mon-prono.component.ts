import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mon-prono',
  standalone: true,
  imports: [FormsModule], 
  templateUrl: './mon-prono.component.html',
  styleUrl: './mon-prono.component.css'
})

export class MonPronoComponent {
  titre: string = '';
  lignes: string[] = Array(9).fill('');
  options: string[] = ['Option 1', 'Option 2', 'Option 3'];
}
