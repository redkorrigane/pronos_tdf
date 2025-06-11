import { Component } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { CommonModule } from '@angular/common'; // <-- à importer
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-resultat',
  standalone: true,
  imports: [
    CommonModule,RouterModule 
  ],
  templateUrl: './resultat.component.html',
  styleUrl: './resultat.component.css'
})
export class ResultatComponent {
  participants: string[] = [];
  classements: string[][] = [];

  constructor(private pronoservice: SupabaseService,private router: Router) {}

  async ngOnInit() {
    console.info('🟡 AppComponent init');
    await this.pronoservice.init();
    const result = await this.pronoservice.getClassementParParticipant();
    if (!result) return;
    this.participants = result.participants;
    this.classements = result.classement;
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