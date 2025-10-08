import { Match } from '@/types';

const API_BASE = '/admin/api';

export const api = {
  // Get all matches
  async getMatches(): Promise<Match[]> {
    const response = await fetch(`${API_BASE}/matches`);
    if (!response.ok) throw new Error('Failed to fetch matches');
    return response.json();
  },

  // Fetch new fixtures from external API
  async fetchFixtures(leagueId: number = 39): Promise<{ success: boolean; fetchedCount: number }> {
    const response = await fetch(`${API_BASE}/matches/fetch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leagueId }),
    });
    if (!response.ok) throw new Error('Failed to fetch fixtures');
    return response.json();
  },

  // Log match result
  async logResult(matchId: number, actualResult: string): Promise<{ success: boolean }> {
    const response = await fetch(`${API_BASE}/matches/${matchId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ actual_result: actualResult }),
    });
    if (!response.ok) throw new Error('Failed to log result');
    return response.json();
  },

  // Get analytics
  async getAnalytics(): Promise<any> {
    const response = await fetch(`${API_BASE}/analytics`);
    if (!response.ok) throw new Error('Failed to fetch analytics');
    return response.json();
  }
};