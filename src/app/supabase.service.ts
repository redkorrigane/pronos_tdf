import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient | null = null;

  constructor() {}

  // Nouvelle méthode init 100% fiable
  async init(): Promise<void> {
    console.info('⏳ Initialisation Supabase...');
    (window as any).__supabase_disable_locking = true;

    // Création du client
    this.supabase = createClient(
      'https://cupztmzaqmsvlvwpwtvv.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1cHp0bXphcW1zdmx2d3B3dHZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0MzIzODksImV4cCI6MjA2MTAwODM4OX0.w8Rxzr1z8TXR9lgkgSZAo2BwJUFK0fuQ9-Jbfde5htU',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
          detectSessionInUrl: false,
        },
      }
    );

    console.info('✅ Supabase client initialisé');
  }

  async getPronosticsAsString(): Promise<{ user_id: string, prevision: string[] }[] | null> {
    console.info('getPronosticsAsString');

    if (!this.supabase) {
      console.warn('⚠️ Supabase est NULL');
      return null;
    }

    console.info('etape 2');
    const { data, error } = await this.supabase.from('pronostics').select('*');
    console.log('📦 Données :', data);
    console.log('❌ Erreur :', error);

    if (error) {
      console.error('Erreur Supabase:', error);
      return null;
    }

    console.info('etape 4');

    return data.map(item => ({
      user_id: item.user_id,
      prevision: Array.isArray(item.prevision)
        ? item.prevision
        : JSON.parse(item.prevision)
    }));
  }

  async getClassementParParticipant(): Promise<{
    participants: string[] ;
    classement: string[][];
  }| null> {

    if (!this.supabase) {
      console.warn('⚠️ Supabase est NULL');
      return null;
    }
    const { data, error } = await this.supabase
      .from('pronostics')
      .select('user_id, position, prevision');
  
    if (error) {
      console.error('Erreur Supabase:', error);
      return { participants: [], classement: [] };
    }
  
    // On regroupe les prévisions par user_id
    const regroupé: { [user: string]: { [pos: number]: string } } = {};
  
    for (const row of data) {
      const user = row.user_id;
      const pos = row.position;
      const nom = row.prevision;
  
      if (!regroupé[user]) regroupé[user] = {};
      regroupé[user][pos] = nom;
    }
  
    const participants = Object.keys(regroupé);
    const maxPositions = Math.max(
      ...participants.map(p => Math.max(...Object.keys(regroupé[p]).map(Number)))
    );
  
    // Créer une structure [position][participant]
    const classement: string[][] = Array.from({ length: maxPositions }, () =>
      Array(participants.length).fill('-')
    );
  
    participants.forEach((user, j) => {
      for (let i = 0; i < maxPositions; i++) {
        classement[i][j] = regroupé[user][i + 1] || '-';
      }
    });
  
    return { participants, classement };
  }  

  async addPronostic(data: { user_id: string; prevision: string; position: number }) {

    if (!this.supabase) {
      console.warn('⚠️ Supabase est NULL');
      return null;
    }

    return this.supabase.from('pronostics').insert([data]);
  }
  
}
