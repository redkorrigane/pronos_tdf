// src/app/services/supabase.service.ts
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://YOUR_PROJECT.supabase.co',
      'YOUR_PUBLIC_ANON_KEY'
    );
  }

  // Exemple : Ajouter un pronostic
  async addPronostic(data: { user_id: string; match_id: number; prediction: string }) {
    return this.supabase.from('pronostics').insert([data]);
  }

  // Exemple : Récupérer les pronostics
  async getPronostics() {
    return this.supabase.from('pronostics').select('*');
  }

  // Auth (ex : login email/password)
  async signIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password });
  }
}
