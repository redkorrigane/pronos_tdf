import { Component } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- à importer

@Component({
  standalone: true,
  selector: 'app-mon-prono',
  imports: [FormsModule,CommonModule],
  templateUrl: './mon-prono.component.html',
  styleUrls: ['./mon-prono.component.css']
})
export class MonPronoComponent {
  participant = '';
  coureurs: string[] = ['', '', '', '', '']; // Top 5 par défaut
  message = '';

  constructor(private pronoservice: SupabaseService) {}
  
  async ngOnInit() {
    console.info('🟡 AppComponent init');
    await this.pronoservice.init();
  }
  async validerPronostic() {
    if (!this.participant || this.coureurs.some(n => !n.trim())) {
      this.message = 'Merci de remplir tous les champs.';
      return;
    }

    for (let i = 0; i < this.coureurs.length; i++) {
      const result = await this.pronoservice.addPronostic({
        user_id: this.participant,
        prevision: this.coureurs[i],
        position: i + 1,
      });
      if (!result) return;
      if (result.error) {
        this.message = `Erreur à la position ${i + 1} : ${result.error.message}`;
        return;
      }
    }

    this.message = '✅ Pronostic enregistré avec succès !';
    this.coureurs = ['', '', '', '', ''];
    this.participant = '';
  }

  trackByIndex(index: number, item: string): number {
    return index;
  }
}