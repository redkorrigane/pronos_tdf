import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../supabase.service';
import { CommonModule } from '@angular/common'; // <-- à importer

@Component({
  selector: 'app-resultat',
  standalone: true,
  imports: [
    CommonModule // <-- à ajouter ici
  ],
  templateUrl: './resultat.component.html',
  styleUrl: './resultat.component.css'
})
export class ResultatComponent {
  participants: string[] = [];
  classements: string[][] = [];

  constructor(private pronoservice: SupabaseService) {}

  async ngOnInit() {
    console.info('🟡 AppComponent init');
    await this.pronoservice.init();
    const result = await this.pronoservice.getClassementParParticipant();
    if (!result) return;
    this.participants = result.participants;
    this.classements = result.classement;
  }
}