/**
 * Types for Hành Trình Khám Phá Dân Số Việt Nam
 */

export type RegionId =
  | 'trung_du_mien_nui_phia_bac'
  | 'dong_bang_song_hong'
  | 'bac_trung_bo_duyen_hai_mien_trung'
  | 'tay_nguyen'
  | 'dong_nam_bo'
  | 'dong_bang_song_cuu_long';

export interface RegionData {
  id: RegionId;
  name: string;
  shortName: string;
  population: number; // in millions
  density: number; // people / km2
  area: number; // km2
  urbanRate: number; // percentage
  keyFeatures: string[];
  description: string;
  representativeProvinces: string[];
  color: string;
  highlightColor: string;
  emissiveColor: string;
  center3D: [number, number, number]; // [x, y, z] in Three.js coordinate space
  // 2D polygon outline on X-Y plane (extruded along Z)
  polygon: [number, number][];
}

export interface MapQuestion {
  id: string;
  question: string;
  targetRegionId: RegionId;
  hint: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

export interface MultipleChoiceQuestion {
  id: string;
  question: string;
  options: {
    key: string;
    text: string;
  }[];
  correctKey: string;
  explanation: string;
}

export interface TrueFalseStatement {
  id: string;
  statement: string;
  isCorrect: boolean; // true = Đúng, false = Sai
  explanation: string;
}

export interface TrueFalseQuestionGroup {
  id: string;
  context: string;
  statements: TrueFalseStatement[];
}

export type ActiveTab = 'learn' | 'challenge' | 'quiz';
