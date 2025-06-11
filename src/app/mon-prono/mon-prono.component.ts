import { Component } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-mon-prono',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './mon-prono.component.html',
  styleUrls: ['./mon-prono.component.css']
})
export class MonPronoComponent {
  [x: string]: any;
  participant = '';
  coureurs: string[] = ['', '', '', '', '','', '', '', '', '','', '', '', '', '','']; // prono par défaut
  message = '';

  constructor(private pronoservice: SupabaseService,private router: Router) {}
  
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
    this.coureurs = ['', '', '', '', '','', '', '', '', '','', '', '', '', '',''];
    this.participant = '';
  }

  trackByIndex(index: number, item: string): number {
    return index;
  }

  getLibellePosition (position: number): string{

    let label = 'Position ' + position;
switch (position){
    case 11:
    label='Maillot vert';
    break;
    case 12:
    label='Maillot à pois';
    break;
    case 13:
    label='Maillot blanc';
    break;
    case 14:
    label='1ère femme';
    break;
    case 15:
    label='2ème femme';
    break;
    case 16:
    label='3ème femme';
    break;
  }
    return label;
}
viewAccueil() {
  this.router.navigate(['']);
}
}