export interface Match {
  id: number;
  home_team: string;
  away_team: string;
  league: string;
  match_date: string;
  api_prediction: 'HOME_WIN' | 'DRAW' | 'AWAY_WIN';
  api_confidence: number;
  actual_result: string | null;
  is_correct: boolean | null;
}

export interface Analytics {
  total_matches: number;
  validated_matches: number;
  correct_predictions: number;
  accuracy_percentage: number;
  recent_trend: number[];
}